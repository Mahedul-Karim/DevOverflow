"use client";

import { Button } from "@/components/ui/button";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  pageNumber: number;
  isNext: boolean;
}

const Pagination: React.FC<Props> = ({ pageNumber, isNext }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePagination = (to: string) => {
    const nextPageNumber = to === "prev" ? pageNumber - 1 : pageNumber + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl);
  };

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Button
        disabled={pageNumber === 1}
        onClick={handlePagination.bind(null, "prev")}
        className="border-light-700 dark:border-dark-400 bg-light-800 dark:bg-dark-300 flex min-h-[36px] items-center justify-center gap-2 border"
      >
        <p className="text-[14px] font-medium leading-[18.2px] text-dark-200 dark:text-light-800">
          Prev
        </p>
      </Button>
      <div className="bg-primary-500 flex items-center justify-center rounded-md px-3.5 py-2">
        <p className="text-[14px] font-semibold leading-[18.2px] text-light-900">
          {pageNumber}
        </p>
      </div>
      <Button
        disabled={!isNext}
        onClick={handlePagination.bind(null, "next")}
        className="border-light-700 dark:border-dark-400 bg-light-800 dark:bg-dark-300 flex min-h-[36px] items-center justify-center gap-2 border"
      >
        <p className="text-[14px] font-medium leading-[18.2px] text-dark-200 dark:text-light-800">
          Next
        </p>
      </Button>
    </div>
  );
};

export default Pagination;
