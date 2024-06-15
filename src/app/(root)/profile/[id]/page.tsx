import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/lib/actions/user";
import { URLProps } from "@/types";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getJoinedDate } from "@/lib/utils";
import ProfileExtras from "@/components/profile/ProfileExtras";
import Stats from "@/components/profile/Stats";
import QuestionTab from "@/components/profile/tabs/QuestionTab";
import AnswerTab from "../../../../components/profile/tabs/AnswerTab";

const Page: React.FC<URLProps> = async ({ params, searchParams }) => {
  const userInfo = await getUserInfo({ userId: params.id });

  const { userId: clerkId } = auth();

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={userInfo?.user?.picture}
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-full object-cover"
          />
          <div className="mt-3">
            <h2 className="text-[24px] font-bold leading-[31.2px] text-dark-100 dark:text-light-900">
              {userInfo?.user.name}
            </h2>
            <p className="text-[16px] font-normal leading-[22.4px] text-dark-200 dark:text-light-800">
              @{userInfo?.user?.username}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {userInfo?.user?.portfolioWebsite && (
                <ProfileExtras
                  imgUrl="/assets/icons/link.svg"
                  href={userInfo?.user?.portfolioWebsite}
                  title="Portfolio"
                />
              )}
              {userInfo?.user?.location && (
                <ProfileExtras
                  imgUrl="/assets/icons/location.svg"
                  title={userInfo?.user?.location}
                />
              )}
              <ProfileExtras
                imgUrl="/assets/icons/calendar.svg"
                title={getJoinedDate(userInfo?.user?.joinedAt)}
              />
            </div>
            {userInfo?.user?.bio && (
              <p className="text-[16px] font-normal leading-[22.4px] text-dark-400 dark:text-light-800">
                {userInfo?.user?.bio}
              </p>
            )}
          </div>
        </div>
        <SignedIn>
          {clerkId === userInfo?.user?.clerkId && (
            <Link href="/profile/edit">
              <Button className="text-[16px] font-medium leading-[22.4px] bg-light-800 dark:bg-dark-400 text-dark-300 dark:text-light-900 min-h-[46px] min-w-[175px] px-4 py-3">
                Edit Profile
              </Button>
            </Link>
          )}
        </SignedIn>
      </div>
      <Stats
        totalAnswers={userInfo?.totalAnswers}
        totalQuestions={userInfo?.totalQuestions}
        badgeCounts={userInfo?.badgeCounts}
      />
      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="bg-light-800 dark:bg-dark-400 min-h-[42px] p-1">
            <TabsTrigger
              value="top-posts"
              className="min-h-full dark:bg-dark-400 bg-light-800 dark:text-light-500  data-[state=active]:bg-primary-100 dark:data-[state=active]:bg-primary-100 data-[state=active]:text-primary-500 dark:data-[state=active]:text-primary-500 rounded-md"
            >
              Top Posts
            </TabsTrigger>
            <TabsTrigger
              value="answers"
              className="min-h-full dark:bg-dark-400 bg-light-800 dark:text-light-500 data-[state=active]:bg-primary-100 dark:data-[state=active]:bg-primary-100 data-[state=active]:text-primary-500 dark:data-[state=active]:text-primary-500 rounded-md"
            >
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">
            <QuestionTab
              searchParams={searchParams}
              userId={userInfo.user._id}
              clerkId={clerkId as string}
            />
          </TabsContent>
          <TabsContent value="answers">
            <AnswerTab 
            searchParams={searchParams}
            userId={userInfo.user._id}
            clerkId={clerkId as string}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
