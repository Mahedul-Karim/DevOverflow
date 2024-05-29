"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "../db";
import Question from "../models/question";
import Tag from "../models/tag";
import { CreateQuestionParams, GetQuestionsParams } from "./action.types";

export const getQuestions = async (params: GetQuestionsParams) => {
  try {
    connectDB();

    const questions = await Question.find()
      .populate("tags")
      .populate("author")
      .sort({ createdAt: -1 });

    return { questions };
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

    revalidatePath(path as string)

  } catch (err) {
    console.log(err);
  }
};
