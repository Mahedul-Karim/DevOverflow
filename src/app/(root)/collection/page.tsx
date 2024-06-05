import NoResult from "@/components/common/NoResult";
import Filter from "@/components/layout/filter/Filter";
import Search from "@/components/layout/search/Search";
import Card from "@/components/questions/Card";
import { QuestionFilters } from "@/components/util/data";
import { getSavedQuestions } from "@/lib/actions/user";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const CollectionPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
    return;
  }

  const result = await getSavedQuestions({
    clerkId: userId,
  });

  return (
    <>
      <h1 className="text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
        Saved Questions
      </h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Search
          route="/"
          iconPosition="left"
          placeholder="Search for questions"
          extraClass="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          extraClass="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question:any) => (
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
            />
          ))
        ) : (
          <NoResult
            title="There's no question saved to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
      discussion, our query could be the next big thing others learn from. Get
      involved!"
            link="/ask-question"
            linkTitle="Ask a Qustion"
          />
        )}
      </div>
    </>
  );
};

export default CollectionPage;
