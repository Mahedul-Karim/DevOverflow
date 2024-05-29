import Questions from "@/components/forms/Questions";
import { getUser } from "@/lib/actions/user";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const AskQuestionPage =async () => {
  const { userId } = auth();

  // if (!userId) {
  //   redirect("/sign-in");
  // }
  
  const user = await getUser({ userId });

  return (
    <div>
      <h1 className="text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
        Ask a question
      </h1>
      <div className="mt-9">
        <Questions userId={"dfvsfdfd"}/>
      </div>
    </div>
  );
};

export default AskQuestionPage;
