import Questions from "@/components/forms/Questions";
import ProfileForm from "@/components/profile/edit/ProfileForm";
import { getQuestionsById } from "@/lib/actions/questions";
import { getUser } from "@/lib/actions/user";
import { URLProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Page: React.FC<URLProps> = async ({ params, searchParams }) => {
  const { userId } = auth();

  const user = await getUser({ userId });

  return (
    <>
      <h1 className="text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
        Edit Profile
      </h1>
      <div className="mt-9">
        <ProfileForm clerkId={userId as string} user={JSON.stringify(user)} />
      </div>
    </>
  );
};

export default Page;
