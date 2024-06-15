import Filter from "@/components/layout/filter/Filter";
import { AnswerFilters } from "@/components/util/data";
import { getAnswers } from "@/lib/actions/answers";
import { getTimeStamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ParseHTML from "./ParseHTML";
import Voting from "@/components/layout/Voting";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: number;
}

const AllAnswers: React.FC<Props> = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}) => {
  const result = await getAnswers({ questionId });

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        {/* <Filter filters={AnswerFilters} /> */}
      </div>
      <div>
        {result.answers.map((answer) => (
          <article
            key={answer._id}
            className="border-light-800 dark:border-dark-300 border-b py-10"
          >
            <div className="flex items-center justify-between">
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  href={`/profile/${answer.author.clerkId}`}
                  className="flex flex-1 items-start gap-1 sm:items-center"
                >
                  <Image
                    src={answer.author.picture}
                    width={18}
                    height={18}
                    alt="profile"
                    className="rounded-full object-cover max-sm:mt-0.5"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="text-[14px] font-semibold leading-[18.2px] text-dark-300 dark:text-light-700">
                      {answer.author.name}
                    </p>
                    <p className="text-[12px] font-normal leading-[15.6px] text-light-400 dark:text-light-500 mt-0.5 ml-0.5 line-clamp-1">
                      {getTimeStamp(answer.createdAt)}
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end">
                  <Voting
                    type="answer"
                    itemId={JSON.stringify(answer._id)}
                    userId={userId && JSON.stringify(userId)}
                    upvotes={answer.upvotes.length}
                    hasupVoted={answer.upvotes.includes(userId)}
                    downvotes={answer.downvotes.length}
                    hasdownVoted={answer.downvotes.includes(userId)}
                  />
                </div>
              </div>
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllAnswers;
