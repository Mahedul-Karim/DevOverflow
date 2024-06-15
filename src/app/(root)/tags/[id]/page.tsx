import NoResult from "@/components/common/NoResult";
import Filter from "@/components/layout/filter/Filter";
import Search from "@/components/layout/search/Search";
import Card from "@/components/questions/Card";
import { getQuestionsByTagId } from "@/lib/actions/tags";
import { URLProps } from "@/types";
import React from "react";



const TagsDetailsPage: React.FC<URLProps> = async ({ params, searchParams }) => {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q,
  });

  return <>
  <h1 className="text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
    {result.tagTitle}
  </h1>

  <div className="mt-11 w-full">
    <Search
      route={`/tags/${params.id}`}
      iconPosition="left"
      placeholder="Search for questions"
      extraClass="flex-1"
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
};

export default TagsDetailsPage;
