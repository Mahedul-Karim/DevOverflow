"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "../db";
import Answer from "../models/answer";
import Question from "../models/question";
import User from "../models/user";
import { AnswerVoteParams, DeleteAnswerParams } from "./action.types";
import Interaction from "../models/interaction";

export const createAnswer = async (params: any) => {
  try {
    connectDB();

    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({ content, author, question });

    const questionObject = await Question.findByIdAndUpdate(
      question,
      {
        $push: {
          answers: newAnswer._id,
        },
      },
      {
        new: true,
      }
    );

    await Interaction.create({
      user: author,
      action: "answer",
      question,
      answer: newAnswer._id,
      tags: questionObject.tags,
    });

    await User.findByIdAndUpdate(author, {
      $inc: {
        reputation: 10,
      },
    });

    revalidatePath(path as string);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getAnswers = async (params: any) => {
  try {
    connectDB();

    const { questionId } = params;

    const answers = await Answer.find({ question: questionId })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      })
      .sort({ createdAt: -1 });

    return { answers };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const upvoteAnswer = async (params: AnswerVoteParams) => {
  try {
    connectDB();

    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

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

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    await User.findByIdAndUpdate(userId, {
      $inc: {
        reputation: hasupVoted ? -2 : 2,
      },
    });

    await User.findByIdAndUpdate(answer.author, {
      $inc: {
        reputation: hasupVoted ? -10 : 10,
      },
    });

    revalidatePath(path as string);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const downvoteAnswer = async (params: AnswerVoteParams) => {
  try {
    connectDB();

    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

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

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    await User.findByIdAndUpdate(userId, {
      $inc: {
        reputation: hasdownVoted ? 2 : -2,
      },
    });

    await User.findByIdAndUpdate(answer.author, {
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

export const deleteAnswer = async (params: DeleteAnswerParams) => {
  try {
    connectDB();

    const { answerId, path } = params;

    const answer = await Answer.findById(answerId);

    await Answer.deleteOne({ _id: answerId });

    await Question.updateMany(
      { _id: answer.question },
      {
        $pull: {
          answers: answerId,
        },
      }
    );

    await Interaction.deleteMany({ answer: answerId });

    revalidatePath(path as string);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
