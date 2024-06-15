"use client";

import React, { useState } from "react";
import { GlobalSearchFilters as filters } from "@/components/util/data";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

const GlobalSearchFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParams = searchParams.get("type");

  const [active, setActive] = useState(typeParams || "");


  const handleTypeClick=(type:string)=>{
    if (active === type) {
      setActive('');
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: null,
      });

      router.push(newUrl, {
        scroll: false,
      });
    } else {
      setActive(type)
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: type.toLowerCase(),
      });

      router.push(newUrl, {
        scroll: false,
      });
    }
  }

  return (
    <div className="flex items-center gap-5 px-5">
      <p className="text-dark-400 dark:text-light-900 text-[14px] font-medium leading-[18.2px]">
        Type:{" "}
      </p>
      <div className="flex gap-3">
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={`border-light-700 dark:border-dark-400 text-[12px] font-medium leading-[15.6px] dark:text-light-800 rounded-2xl px-5 py-2 capitalize dark:hover:text-primary-500 ${
              active === filter.value
                ? "bg-primary-500 text-light-900"
                : "bg-light-700 text-dark-400 hover:text-primary-500 dark:bg-dark-500"
            }`}
            onClick={handleTypeClick.bind(null,filter.value)}
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GlobalSearchFilters;
