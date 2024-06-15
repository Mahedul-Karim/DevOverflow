"use server";

import { connectDB } from "../db";
import Answer from "../models/answer";
import Question from "../models/question";
import Tag from "../models/tag";
import User from "../models/user";
import { SearchParams } from "./action.types";

export const globalSearch = async (params: SearchParams) => {
  try {
    connectDB();

    const { query, type } = params;

    const regexQuery = {
      $regex: query,
      $options: "i",
    };

    let results: any[] = [];

    const modelsAndTypes = [
      {
        model: Question,
        searchField: "title",
        type: "question",
      },
      {
        model: User,
        searchField: "name",
        type: "user",
      },
      {
        model: Answer,
        searchField: "content",
        type: "answer",
      },
      {
        model: Tag,
        searchField: "name",
        type: "tag",
      },
    ];

    const searchAbleType = ["question", "user", "answer", "tag"];

    const typeLowercase = type?.toLowerCase();

    if (!typeLowercase || !searchAbleType.includes(typeLowercase)) {
      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model
          .find({
            [searchField]: regexQuery,
          })
          .limit(2);

        results.push(
          ...queryResults.map((item) => ({
            title:
              typeLowercase === "answer"
                ? `Answer containing ${query}`
                : item[searchField],
            type,
            id:
              type === "user"
                ? item.clerkId
                : type === "answer"
                ? item.question
                : item._id,
          }))
        );
      }
    } else {
      const modelInfo = modelsAndTypes.find(
        (item) => item.type === typeLowercase
      )!;

      if (!modelInfo) {
        return [];
      }
      //@ts-ignore
      const queryResult = await modelInfo.model
        .find({
          [modelInfo.searchField]: regexQuery,
        })
        .limit(8);

      results = queryResult.map((item) => ({
        title:
          typeLowercase === "answer"
            ? `Answer containing ${query}`
            : item[modelInfo.searchField],
        type,
        id:
          type === "user"
            ? item.clerkId
            : type === "answer"
            ? item.question
            : item._id,
      }));
    }

    return JSON.stringify(results);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
