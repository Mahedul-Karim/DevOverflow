"use server";

import { connectDB } from "../db";
import Tag from "../models/tag";
import User from "../models/user";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./action.types";

export const getTags = async (params: GetTopInteractedTagsParams) => {
  try {
    connectDB();

    const { userId, limit = 3 } = params;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return [
      { _id: "334334", name: "Tag1" },
      { _id: "334335", name: "Tag2" },
      { _id: "334336", name: "Tag3" },
    ];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getAllTags = async (params: GetAllTagsParams) => {
  try {
    connectDB();

    const tags = await Tag.find({});

    return { tags };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
