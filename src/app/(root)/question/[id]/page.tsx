import { getQuestionsById } from "@/lib/actions/questions";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import Metric from "@/components/common/Metric";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import ParseHTML from "@/components/questions/details/ParseHTML";
import Tags from "@/components/common/Tags";
import AnswersForm from "@/components/forms/Answers";
import { auth } from "@clerk/nextjs/server";
import { getUser } from "@/lib/actions/user";
import AllAnswers from "@/components/questions/details/AllAnswers";
import Voting from "@/components/layout/Voting";

interface Props {
  params: {
    id: string;
  };
}

const QuestionDetailsPage: React.FC<Props> = async ({ params }) => {
  const question = await getQuestionsById({ questionId: params.id });

  const { userId } = auth();

  let user;

  if (userId) {
    user = await getUser({ userId });
  }

  return (
    <>
      <div className="flex justify-start items-center w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${question.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={question.author.picture}
              alt="profile"
              width={30}
              height={30}
              className="rounded-full"
            />
            <p className="text-[16px] font-semibold leading-[20.8px] text-dark-300 dark:text-light-700">
              {question.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Voting
              type="question"
              itemId={JSON.stringify(question._id)}
              userId={JSON.stringify(user._id)}
              upvotes={question.upvotes.length}
              hasupVoted={question.upvotes.includes(user._id)}
              downvotes={question.downvotes.length}
              hasdownVoted={question.downvotes.includes(user._id)}
              hasSaved={user?.saved.includes(question._id)}
            />
          </div>
        </div>
        <h2 className="text-[24px] font-semibold leading-[31.2px] text-dark-200 dark:text-light-900 mt-3.5 w-full text-left">
          {question.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimeStamp(question.createdAt)}`}
          title=" Asked"
          extraStyles="text-[12px] font-medium leading-[15.6px] text-dark-400 dark:text-light-800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="Answers"
          value={formatNumber(question.answers.length)}
          title=" Answers"
          extraStyles="text-[12px] font-medium leading-[15.6px] text-dark-400 dark:text-light-800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatNumber(question.views)}
          title=" Views"
          extraStyles="text-[12px] font-medium leading-[15.6px] text-dark-400 dark:text-light-800"
        />
      </div>
      <ParseHTML data={question.content} />
      <div className="mt-8 flex flex-wrap gap-2">
        {question.tags.map((tag: any) => (
          <Tags key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <AllAnswers
        questionId={question._id}
        userId={user._id}
        totalAnswers={question.answers.length}
      />

      <AnswersForm
        question={question.content}
        questionId={JSON.stringify(question._id)}
        authorId={JSON.stringify(user._id)}
      />
    </>
  );
};

export default QuestionDetailsPage;
