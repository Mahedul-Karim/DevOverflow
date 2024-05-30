import Filter from "@/components/layout/filter/Filter";
import HomeFilters from "@/components/home/HomeFilters";
import Search from "@/components/layout/search/Search";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/components/util/data";
import Link from "next/link";
import React from "react";
import Card from "@/components/questions/Card";
import NoResult from "@/components/common/NoResult";
import { getQuestions } from "@/lib/actions/questions";

const HomePage = async () => {
  const result = await getQuestions({});

  const questions = result?.questions;

  

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
          All Questions
        </h1>
        <Link href={"/ask-question"} className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Qustion
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Search
          route="/"
          iconPosition="left"
          placeholder="Search for questions"
          extraClass="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          extraClass="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
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
            title="There's no question to show"
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

export default HomePage;
