"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "../db";
import User from "../models/user";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "./action.types";
import Question from "../models/question";

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

    const userQuestionIds = await Question.find({ author: user._id });

    await Question.deleteMany({ author: user._id });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
