import NoResult from "@/components/common/NoResult";
import Card from "@/components/community/Card";
import Filter from "@/components/layout/filter/Filter";
import Search from "@/components/layout/search/Search";
import { TagFilters } from "@/components/util/data";
import { getAllTags } from "@/lib/actions/tags";
import { SearchParamsProps } from "@/types";
import Link from "next/link";
import React from "react";

const TagsPage:React.FC<SearchParamsProps> = async ({ searchParams }) => {
  const results = await getAllTags({
    searchQuery: searchParams?.q,
    filter:searchParams?.filter
  });

  return (
    <>
      <h1 className="text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
        All Tags
      </h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Search
          route="/tags"
          iconPosition="left"
          placeholder="Search for tags"
          extraClass="flex-1"
        />
        <Filter
          filters={TagFilters}
          extraClass="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {results.tags.length > 0 ? (
          results.tags.map((tag) => (
            <Link
              href={`/tags/${tag._id}`}
              key={tag._id}
              className="shadow-light-100 dark:shadow-none"
            >
              <article className="bg-light-900 dark:bg-dark-200 border-light-800 dark:border-dark-300 flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
                <div className="bg-light-800 dark:bg-dark-400 w-fit rounded-sm px-5 py-1.5">
                  <p className="text-[16px] font-semibold leading-[20.8px] text-dark-300 dark:text-light-900">{tag.name}</p>
                </div>
                <p className="text-[12px] font-medium leading-[15.6px] text-dark-400 dark:text-light-500 mt-3.5">
                  <span className="text-[14px] font-semibold leading-[18.2px] primary-text-gradient mr-2.5">{tag.questions.length}+</span> Questions
                </p>
              </article>
            </Link>
          ))
        ) : (
          <NoResult
            title="No Tags Found"
            description="It looks like there are no tags found"
            link="/ask-question"
            linkTitle="Ask a question"
          />
        )}
      </section>
    </>
  );
};

export default TagsPage;
