import { Author, TagsType } from "@/types";
import Link from "next/link";
import React from "react";
import Tags from "../common/Tags";
import Metric from "../common/Metric";
import { formatNumber, getTimeStamp } from "@/lib/utils";

interface Props {
  _id: string | number;
  title: string;
  tags: Array<TagsType>;
  author: Author;
  upvotes: number;
  views: number;
  answers: number | Array<object>;
  createdAt: Date;
}

const Card: React.FC<Props> = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}) => {
  return (
    <div className="bg-light-900 dark:dark-gradient shadow-light-100 dark:shadow-dark-100 rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="text-[10px] font-normal leading-[13px] text-dark-400 dark:text-light-700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:text-[24px] sm:font-semibold sm:leading-[31.2px] text-[18px] font-semibold leading-[25.2px] text-dark-200 dark:text-light-900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Tags key={tag._id} name={tag.name} _id={tag._id} />
        ))}
      </div>
      <div className="flex items-center justify-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.name}
          title={`- asked ${getTimeStamp(createdAt)}`}
          extraStyles="text-[14px] font-medium leading-[18.2px] text-dark-400 dark:text-light-700"
          href={`/profile/${author._id}`}
          isAuthor
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="Upvotes"
          value={formatNumber(upvotes)}
          title=" Votes"
          extraStyles="text-[12px] font-medium leading-[15.6px] text-dark-400 dark:text-light-800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="Answers"
          value={formatNumber(5)}
          title=" Answers"
          extraStyles="text-[12px] font-medium leading-[15.6px] text-dark-400 dark:text-light-800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatNumber(views)}
          title=" Views"
          extraStyles="text-[12px] font-medium leading-[15.6px] text-dark-400 dark:text-light-800"
        />
      </div>
    </div>
  );
};

export default Card;
