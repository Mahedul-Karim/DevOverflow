"use server";

import { connectDB } from "../db";
import Interaction from "../models/interaction";
import Question from "../models/question";
import { ViewQuestionParams } from "./action.types";

export const viewQuestion = async (params: ViewQuestionParams) => {
  try {
    connectDB();

    const { questionId, userId } = params;

    await Question.findByIdAndUpdate(questionId, {
      $inc: {
        views: 1,
      },
    });

    const existingInteraction = await Interaction.findOne({
        user:userId,
        action:"view",
        question:questionId
    });

    if(existingInteraction){
        console.log('User already view the post');
        return;
    }

    await Interaction.create({
        user:userId,
        action:"view",
        question:questionId
    })

  } catch (err) {
    console.log(err);
    throw err;
  }
};
