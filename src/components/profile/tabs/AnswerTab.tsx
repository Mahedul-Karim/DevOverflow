import { getUserAnswers } from "@/lib/actions/user";
import React from "react";
import AnswerCard from "./AnswerCard";

interface Props {
  searchParams: {
    [key: string]: string | undefined;
  };
  userId: string;
  clerkId?: string | null;
}

const AnswerTab: React.FC<Props> = async ({
  searchParams,
  userId,
  clerkId,
}) => {
  const result = await getUserAnswers({
    userId,
    page: 1,
  });

  return (
    <>
      {result.answers.length > 0 ? (
        result.answers.map((answer) => (
          <AnswerCard
            key={answer._id}
            clerkId={clerkId as string}
            _id={answer._id}
            question={answer.question}
            author={answer.author}
            upvotes={answer.upvotes}
            createdAt={answer.createdAt}
          />
        ))
      ) : (
        <p className="sm:text-[24px] sm:font-semibold sm:leading-[31.2px] text-[18px] font-semibold leading-[25.2px] text-dark-200 dark:text-light-900 line-clamp-1 flex-1">User has not answered any question!</p>
      )}
    </>
  );
};

export default AnswerTab;
