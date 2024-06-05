"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "../db";
import Answer from "../models/answer";
import Question from "../models/question";
import User from "../models/user";
import { AnswerVoteParams } from "./action.types";

export const createAnswer = async (params: any) => {
  try {
    connectDB();

    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({ content, author, question });

    await Question.findByIdAndUpdate(
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

    await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
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

     await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });


    revalidatePath(path as string)

  } catch (err) {
    console.log(err);
    throw err;
  }
};