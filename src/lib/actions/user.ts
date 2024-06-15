"use server";

import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import { connectDB } from "../db";
import User from "../models/user";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./action.types";
import Question from "../models/question";
import Tag from "../models/tag";
import Answer from "../models/answer";
import { BadgeCriteriaType } from "@/types";
import { assignBadges } from "../utils";

export const getUser = async function (params: any) {
  try {
    connectDB();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createUser = async function (userData: CreateUserParams) {
  try {
    connectDB();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUser = async function (params: UpdateUserParams) {
  try {
    connectDB();

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path as string);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteUser = async (params: DeleteUserParams) => {
  try {
    connectDB();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    const userQuestionIds = await Question.find({ author: user._id }).distinct(
      "_id"
    );

    await Question.deleteMany({ author: user._id });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getAllUser = async (params: GetAllUsersParams) => {
  try {
    connectDB();

    const { page = 1, pageSize = 20, filter, searchQuery } = params;

    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [
        {
          name: {
            $regex: new RegExp(searchQuery, "i"),
          },
        },
        {
          username: {
            $regex: new RegExp(searchQuery, "i"),
          },
        },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case "new_users":
        sortOptions = {
          joinedAt: -1,
        };
        break;
      case "old_users":
        sortOptions = {
          joinedAt: 1,
        };
        break;
      case "top_contributors":
        sortOptions = {
          reputation: 1,
        };
        break;
      default:
        break;
    }

    const users = await User.find(query).sort(sortOptions);

    return { users };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const saveQuestion = async (params: ToggleSaveQuestionParams) => {
  try {
    connectDB();

    const { userId, questionId, path } = params;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const isAlreadySaved = user.saved.includes(questionId);

    if (isAlreadySaved) {
      await User.findByIdAndUpdate(
        userId,
        {
          $pull: {
            saved: questionId,
          },
        },
        {
          new: true,
        }
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: {
            saved: questionId,
          },
        },
        {
          new: true,
        }
      );
    }

    revalidatePath(path as string);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getSavedQuestions = async (params: GetSavedQuestionsParams) => {
  try {
    connectDB();

    const { clerkId, page = 1, pageSize = 10, filter, searchQuery } = params;

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    let sortOptions = {};

    switch (filter) {
      case "most_recent":
        sortOptions = {
          createdAt: -1,
        };
        break;
      case "oldest":
        sortOptions = {
          createdAt: 1,
        };
        break;
      case "most_voted":
        sortOptions = {
          upvotes: -1,
        };
        break;
      case "most_viewed":
        sortOptions = {
          views: -1,
        };
        break;
      case "most_answered":
        sortOptions = {
          answers: 1,
        };
        break;
      default:
        break;
    }

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: sortOptions,
      },
      model: Question,
      populate: [
        {
          path: "tags",
          model: Tag,
          select: "_id name",
        },
        {
          path: "author",
          model: User,
          select: "_id clerkId name picture",
        },
      ],
    });

    const questions = user.saved;

    return { questions };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getUserInfo = async (params: GetUserByIdParams) => {
  try {
    connectDB();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });
   

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    const [questionUpvotes] = await Question.aggregate([
      {
        $match: {
          author: user._id,
        },
      },
      {
        $project: {
          _id: 0,
          upvotes: {
            $size: "$upvotes",
          },
        },
      },
      {
        $group: {
          _id: null,
          totalUpvotes: {
            $sum: "$upvotes",
          },
        },
      },
    ]);

    const [answerUpvotes] = await Answer.aggregate([
      {
        $match: {
          author: user._id,
        },
      },
      {
        $project: {
          _id: 0,
          upvotes: {
            $size: "$upvotes",
          },
        },
      },
      {
        $group: {
          _id: null,
          totalUpvotes: {
            $sum: "$upvotes",
          },
        },
      },
    ]);

    const [questionViews] = await Answer.aggregate([
      {
        $match: {
          author: user._id,
        },
      },
      {
        $group: {
          _id: null,
          totalViews: {
            $sum: "$views",
          },
        },
      },
    ]);

    const criteria=[
      {
        type:"QUESTION_COUNT" as BadgeCriteriaType,
        count:totalQuestions
      },
      {
        type:"ANSWER_COUNT" as BadgeCriteriaType,
        count:totalAnswers
      },
      {
        type:"QUESTION_UPVOTES" as BadgeCriteriaType,
        count:questionUpvotes?.totalUpvotes || 0
      },
      {
        type:"ANSWER_COUNT" as BadgeCriteriaType,
        count:answerUpvotes?.totalUpvotes || 0
      },
      {
        type:"TOTAL_VIEWS" as BadgeCriteriaType,
        count:questionViews?.totalViews || 0
      },
    ]

    const badgeCounts = assignBadges({ criteria })

    return { user, totalQuestions, totalAnswers,badgeCounts };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getUserQuestions = async (params: GetUserStatsParams) => {
  try {
    connectDB();

    const { userId, page = 1, pageSize = 10 } = params;

    const totalQuestions = await Question.countDocuments({ author: userId });

    const questions = await Question.find({ author: userId })
      .sort({ createdAt: -1, views: -1, upvotes: -1 })
      .populate({
        path: "tags",
        model: Tag,
        select: "_id name",
      })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });

    return { totalQuestions, questions };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getUserAnswers = async (params: GetUserStatsParams) => {
  try {
    connectDB();

    const { userId, page = 1, pageSize = 10 } = params;

    const totalAnswers = await Answer.countDocuments({ author: userId });

    const answers = await Answer.find({ author: userId })
      .sort({ upvotes: -1 })
      .populate({
        path: "question",
        model: Question,
        select: "_id title",
      })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });

    return { totalAnswers, answers };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
