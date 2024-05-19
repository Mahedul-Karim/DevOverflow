import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

const Search = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="bg-light-800 dark:bg-dark-400 relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="Search..."
          value=""
          className="text-[16px] font-normal leading-[22.4px] focus-visible:ring-0 focus-visible:ring-transparent bg-light-800 dark:bg-dark-400 border-none shadow-none outline-none dark:text-light-800"
        />
      </div>
    </div>
  );
};

export default Search;
