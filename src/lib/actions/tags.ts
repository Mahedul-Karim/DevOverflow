"use server";

import { FilterQuery } from "mongoose";
import { connectDB } from "../db";
import Tag from "../models/tag";
import User from "../models/user";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./action.types";
import { ITag } from "@/types";
import Question from "../models/question";

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

    const { searchQuery, filter } = params;

    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [
        {
          name: {
            $regex: new RegExp(searchQuery, "i"),
          },
        },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case "popular":
        sortOptions = {
          questions: -1,
        };
        break;
      case "recent":
        sortOptions = {
          createdAt: -1,
        };
        break;
      case "name":
        sortOptions = {
          name: 1,
        };
        break;
      case "old":
        sortOptions = {
          createdAt: 1,
        };
        break;
      default:
        break;
    }

    const tags = await Tag.find(query).sort(sortOptions);

    return { tags };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getQuestionsByTagId = async (
  params: GetQuestionsByTagIdParams
) => {
  try {
    connectDB();

    const { tagId, page = 1, pageSize = 10, searchQuery } = params;

    const tagsFilter: FilterQuery<ITag> = {
      _id: tagId,
    };

    const query = searchQuery
      ? {
          title: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};

    const tags = await Tag.findOne(tagsFilter).populate({
      path: "questions",
      match: query,
      options: {
        sort: {
          createdAt: -1,
        },
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

    const questions = tags.questions;

    return { tagTitle: tags.name, questions };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getPopularTags = async () => {
  try {
    connectDB();

    const popularTags = await Tag.aggregate([
      {
        $project: {
          name: 1,
          numberOfQuestions: {
            $size: "$questions",
          },
        },
      },
      {
        $sort: {
          numberOfQuestions: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    return popularTags;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
