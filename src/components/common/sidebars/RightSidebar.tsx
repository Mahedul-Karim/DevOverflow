import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tags from "../Tags";

const RightSidebar = () => {
  const questions = [
    {
      _id: 1,
      title: "Text Question1",
    },
    {
      _id: 2,
      title: "Text Question2",
    },
    {
      _id: 3,
      title: "Text Question3",
    },
    {
      _id: 4,
      title: "Text Question4",
    },
    {
      _id: 5,
      title: "Text Question5",
    },
  ];

  const tags = [
    {
      _id: 1,
      name: "Name",
      totalQustions: 5,
    },
    {
      _id: 2,
      name: "Name",
      totalQustions: 5,
    },
    {
      _id: 3,
      name: "Name",
      totalQustions: 5,
    },
    {
      _id: 4,
      name: "Name",
      totalQustions: 5,
    },
    {
      _id: 5,
      name: "Name",
      totalQustions: 5,
    },
  ];

  return (
    <aside className="bg-light-900 dark:bg-dark-200 border-light-700 dark:border-dark-400 border-l border-solid flex h-[calc(100vh_-_104px)] flex-col overflow-y-auto p-6 shadow-light-300 dark:shadow-none max-xl:hidden lg:w-[350px] custom-scrollbar">
      <section>
        <h3 className="text-[20px] font-bold leading-[26px] text-dark-200 dark:text-light-900">
          Top Qustions
        </h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {questions.map((question) => (
            <Link
              href={`/questions/${question._id}`}
              key={question._id}
              className="flex items-center justify-between gap-7 cursor-pointer"
            >
              <p className="text-[14px] font-medium leading-[18.2px] text-dark-500 dark:text-light-700">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="invert dark:invert-0"
              />
            </Link>
          ))}
        </div>
      </section>
      <section className="mt-16">
        <h3 className="text-[20px] font-bold leading-[26px] text-dark-200 dark:text-light-900">
          Top Qustions
        </h3>
        <div className="mt-7 flex flex-col gap-4">
          {tags.map((tag) => (
            <Tags
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQustions={tag.totalQustions}
              showCount
            />
          ))}
        </div>
      </section>
    </aside>
  );
};

export default RightSidebar;
