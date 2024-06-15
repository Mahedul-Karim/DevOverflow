import { Author, TagsType } from "@/types";
import Link from "next/link";
import React from "react";
import Metric from "@/components/common/Metric";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import ActionButton from "@/components/questions/ActionButton";

interface Props {
  _id: string | number;
  author: Author;
  upvotes: Array<string>;
  createdAt: Date;
  clerkId?: string;
  question:any;
}

const AnswerCard: React.FC<Props> = ({
  _id,
  author,
  upvotes,
  createdAt,
  clerkId,
  question
}) => {

  const isAuthor = clerkId && clerkId === author.clerkId;

  return (
    <div className="bg-light-900 dark:bg-dark-400 shadow-light-100 dark:shadow-dark-100 rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="text-[10px] font-normal leading-[13px] text-dark-400 dark:text-light-700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:text-[24px] sm:font-semibold sm:leading-[31.2px] text-[18px] font-semibold leading-[25.2px] text-dark-200 dark:text-light-900 line-clamp-1 flex-1">
              {question.title}
            </h3>
          </Link>
        </div>
        <SignedIn>
          {isAuthor && <ActionButton type="answer" itemId={JSON.stringify(_id)}/>}
        </SignedIn>
      </div>

      <div className="flex items-center justify-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.name}
          title={`- asked ${getTimeStamp(createdAt)}`}
          extraStyles="text-[14px] font-medium leading-[18.2px] text-dark-400 dark:text-light-700"
          href={`/profile/${author.clerkId}`}
          isAuthor
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="Upvotes"
          value={formatNumber(upvotes.length)}
          title=" Votes"
          extraStyles="text-[12px] font-medium leading-[15.6px] text-dark-400 dark:text-light-800"
        />
      </div>
    </div>
  );
};

export default AnswerCard;
