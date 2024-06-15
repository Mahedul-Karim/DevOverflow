"use client";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface Filters {
  name: string;
  value: string;
}

interface Props {
  filters: Array<Filters>;
  extraClass?: string;
  containerClasses?: string;
}

const Filter: React.FC<Props> = ({ filters, extraClass, containerClasses }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const filterQuery = searchParams.get("filter");

  const updateUrl = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value,
    });

    router.push(newUrl, {
      scroll: false,
    });
  };

  return (
    <div className={`relative ${containerClasses}`}>
      <Select onValueChange={updateUrl} defaultValue={filterQuery || undefined}>
        <SelectTrigger
          className={`${extraClass} text-[14px] font-normal leading-[19.6px] border-light-800 dark:border-dark-300 bg-light-800 dark:bg-dark-300 text-dark-500 dark:text-light-700 border px-5 py-2.5`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Theme" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filters.map((filter) => (
              <SelectItem key={filter.value} value={filter.value}>
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
