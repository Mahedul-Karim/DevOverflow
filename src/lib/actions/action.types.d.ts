import { IUser } from "@/types";
import { Schema } from "mongoose";

interface GetQuestionsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

interface CreateQuestionParams {
  title: string;
  content: string;
  tags: Array<string>;
  author: Schema.Types.ObjectId | IUser;
  path?: string;
}

interface AnswerVoteParams {
  answerId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}
interface DeleteAnswerParams {
  answerId: string;
  path: string;
}
interface SearchParams {
  query?: string | null;
  type?: string | null;
}
interface RecommendedParams {
  userId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}
interface ViewQuestionParams {
  questionId: string;
  userId: string | undefined;
}
interface JobFilterParams {
  query: string;
  page: string;
}

interface GetQuestionByIdParams {
  questionId: string;
}
interface QuestionVoteParams {
  questionId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}
interface DeleteQuestionParams {
  questionId: string;
  path: string;
}
interface EditQuestionParams {
  questionId: string;
  title: string;
  content: string;
  path: string;
}
interface GetAllTagsParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}
interface GetQuestionsByTagIdParams {
  tagId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}
interface GetTopInteractedTagsParams {
  userId: string;
  limit?: number;
}
interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}
interface GetUserByIdParams {
  userId: string;
}
interface GetAllUsersParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string; // Add searchQuery parameter
}
interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}
interface ToggleSaveQuestionParams {
  userId: string;
  questionId: string;
  path: string;
}
interface GetSavedQuestionsParams {
  clerkId: string;
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}
interface GetUserStatsParams {
  userId: string;
  page?: number;
  pageSize?: number;
}
interface DeleteUserParams {
  clerkId: string;
}
