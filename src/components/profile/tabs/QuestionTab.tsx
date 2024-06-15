import Card from "@/components/questions/Card";
import { getUserQuestions } from "@/lib/actions/user";
import React from "react";

interface Props {
  searchParams: {
    [key: string]: string | undefined;
  };
  userId: string;
  clerkId?: string | null;
}

const QuestionTab: React.FC<Props> = async ({
  searchParams,
  userId,
  clerkId,
}) => {
  const result = await getUserQuestions({
    userId,
    page: 1,
  });

  return (
    <>
      {result.questions.length > 0 ? (
        result.questions.map((question) => (
          <Card
            key={question._id}
            _id={question._id}
            title={question.title}
            tags={question.tags}
            author={question.author}
            upvotes={question.upvotes}
            views={question.views}
            answers={question.answers}
            createdAt={question.createdAt}
            clerkId={clerkId as string}
          />
        ))
      ) : (
        <p className="sm:text-[24px] sm:font-semibold sm:leading-[31.2px] text-[18px] font-semibold leading-[25.2px] text-dark-200 dark:text-light-900 line-clamp-1 flex-1">User has not created any question</p>
      )}
    </>
  );
};

export default QuestionTab;
