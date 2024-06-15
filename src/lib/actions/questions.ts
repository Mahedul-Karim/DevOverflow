"use server";

import Question from "../models/question";
import { revalidatePath } from "next/cache";
import { connectDB } from "../db";
import Tag from "../models/tag";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
} from "./action.types";
import User from "../models/user";
import Answer from "../models/answer";
import Interaction from "../models/interaction";
import { FilterQuery } from "mongoose";

export const getQuestions = async (params: GetQuestionsParams) => {
  try {
    connectDB();

    const { searchQuery, filter, page = 1, pageSize = 20 } = params;

    const query: FilterQuery<typeof Question> = {};

    const skipPageAmount = (page - 1) * pageSize;

    if (searchQuery) {
      query.$or = [
        {
          title: {
            $regex: new RegExp(searchQuery, "i"),
          },
        },
        {
          content: {
            $regex: new RegExp(searchQuery, "i"),
          },
        },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case "newest":
        sortOptions = {
          createdAt: -1,
        };
        break;
      case "frequent":
        sortOptions = {
          views: -1,
        };
        break;
      case "unanswered":
        query.answers = {
          $size: 0,
        };
        break;
      default:
        break;
    }

    const questions = await Question.find(query)
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      })
      .skip(skipPageAmount)
      .limit(pageSize)
      .sort(sortOptions);

    const totalQuestions = await Question.countDocuments(query);

    const isNext = totalQuestions > skipPageAmount + questions.length;

    return { questions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createQuestion = async (params: CreateQuestionParams) => {
  try {
    connectDB();

    const { title, content, tags, author, path } = params;

    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: {
            $regex: new RegExp(`^${tag}$`, "i"),
          },
        },
        {
          $setOnInsert: {
            name: tag,
          },
          $push: {
            questions: question._id,
          },
        },
        {
          upsert: true,
          new: true,
        }
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: {
        tags: {
          $each: tagDocuments,
        },
      },
    });

    await Interaction.create({
      user: author,
      action: "ask_question",
      question: question._id,
      tags: tagDocuments,
    });

    await User.findByIdAndUpdate(author, {
      $inc: {
        reputation: 5,
      },
    });

    revalidatePath(path as string);
  } catch (err) {
    console.log(err);
  }
};

export const getQuestionsById = async (params: GetQuestionByIdParams) => {
  try {
    connectDB();

    const { questionId } = params;

    const question = await Question.findById(questionId)
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

    return question;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const upvoteQuestion = async (params: QuestionVoteParams) => {
  try {
    connectDB();

    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = {
        $pull: {
          upvotes: userId,
        },
      };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: {
          downvotes: userId,
        },
        $push: {
          upvotes: userId,
        },
      };
    } else {
      updateQuery = {
        $addToSet: {
          upvotes: userId,
        },
      };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    await User.findByIdAndUpdate(userId, {
      $inc: {
        reputation: hasupVoted ? -1 : 1,
      },
    });

    await User.findByIdAndUpdate(question.author,{
      $inc:{
        reputation:hasupVoted ? -10 : 10
      }
    })

    revalidatePath(path as string);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const downvoteQuestion = async (params: QuestionVoteParams) => {
  try {
    connectDB();

    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasdownVoted) {
      updateQuery = {
        $pull: {
          downvotes: userId,
        },
      };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: {
          upvotes: userId,
        },
        $push: {
          downvotes: userId,
        },
      };
    } else {
      updateQuery = {
        $addToSet: {
          downvotes: userId,
        },
      };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    await User.findByIdAndUpdate(userId, {
      $inc: {
        reputation: hasdownVoted ? 2 : -2,
      },
    });

    await User.findByIdAndUpdate(question.author, {
      $inc: {
        reputation: hasdownVoted ? 10 : -10,
      },
    });

    revalidatePath(path as string);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteQuestion = async (params: DeleteQuestionParams) => {
  try {
    connectDB();

    const { questionId, path } = params;

    await Question.deleteOne({ _id: questionId });
    await Answer.deleteMany({ question: questionId });
    await Interaction.deleteMany({ question: questionId });
    await Tag.updateMany(
      { questions: questionId },
      {
        $pull: {
          questions: questionId,
        },
      }
    );

    revalidatePath(path as string);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const editQuestion = async (params: EditQuestionParams) => {
  try {
    connectDB();

    const { questionId, path, title, content } = params;

    const question = await Question.findById(questionId).populate({
      path: "tags",
      model: Tag,
    });

    question.title = title;
    question.content = content;

    await question.save();

    revalidatePath(path as string);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getHotQuestions = async () => {
  try {
    connectDB();

    const questions = await Question.find({})
      .sort({ views: -1, upvotes: -1 })
      .limit(5);

    return questions;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
