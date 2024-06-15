import Questions from "@/components/forms/Questions";
import { getQuestionsById } from "@/lib/actions/questions";
import { getUser } from "@/lib/actions/user";
import { URLProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Page: React.FC<URLProps> = async ({ params, searchParams }) => {
  const { userId } = auth();

  const user = await getUser({ userId });
  const result = await getQuestionsById({ questionId: params.id });

  return (
    <>
      <h1 className="text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
        Edit Question
      </h1>
      <div className="mt-9">
        <Questions
          type="edit"
          userId={user._id}
          questionDetails={JSON.stringify(result)}
        />
      </div>
    </>
  );
};

export default Page;
