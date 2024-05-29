import { BADGE_CRITERIA } from "./components/util/data";
import { Document } from "mongoose";

interface ITag extends Document {
  name:string;
  description:string;
  questions:Schema.Types.ObjectId[];
  followers:Schema.Types.ObjectId[];
  createdAt:Date;
}

interface IUser extends Document {
  clerkId:string;
  name:string;
  username:string;
  email:string;
  password?:string;
  bio?:string;
  picture:string;
  pictureId?:string;
  location?:string;
  portfolioWebsite?:string;
  reputation?:number;
  saved:Schema.Types.ObjectId[];
  joinedAt:Date;
}

interface IQuestion extends Document {
  title: string;
  content: string;
  tags: Schema.Types.ObjectId[];
  views: number;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  answers: Schema.Types.ObjectId[];
  createdAt: Date;
}

interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}
interface Job {
  id?: string;
  employer_name?: string;
  employer_logo?: string | undefined;
  employer_website?: string;
  job_employment_type?: string;
  job_title?: string;
  job_description?: string;
  job_apply_link?: string;
  job_city?: string;
  job_state?: string;
  job_country?: string;
}
interface Country {
  name: {
    common: string;
  };
}
interface ParamsProps {
  params: { id: string };
}
interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}
interface URLProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}
interface BadgeCounts {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}

interface TagsType {
  _id: string | number;
  name: string;
}

type TimeStampFunction = (data:Date)=>string;

type NumberFunction = (num:number)=>string;

interface Author {
  _id: string | number;
  name: string;
  picture: string;
}

export type BadgeCriteriaType = keyof typeof BADGE_CRITERIA;
