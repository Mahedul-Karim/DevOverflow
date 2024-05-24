'use client'
import Image from "next/image";
import React from "react";

interface Props {
  route: string;
  iconPosition: string;
  imgSrc?: string;
  placeholder: string;
  extraClass?: string;
}

const Search: React.FC<Props> = ({
  route,
  iconPosition,
  imgSrc = "/assets/icons/search.svg",
  placeholder,
  extraClass,
}) => {
  return (
    <div
      className={`bg-light-800 dark:bg-dark-400 flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${extraClass}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="Search icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
      <input
          type="text"
          placeholder={placeholder}
          value=""
          className="text-[16px] font-normal leading-[22.4px] focus-visible:ring-0 focus-visible:ring-transparent bg-light-800 dark:bg-dark-400 border-none shadow-none outline-none dark:text-light-800"
        />
        {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="Search icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default Search;
