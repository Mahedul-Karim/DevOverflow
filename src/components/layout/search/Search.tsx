"use client";
import { formUrlQuery, removeKeyFromQuery } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const debounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });

        router.push(newUrl, {
          scroll: false,
        });
      }else{
        if(pathname === route){
          const newUrl = removeKeyFromQuery({
            params:searchParams.toString(),
            keys:['q']
          });
          router.push(newUrl, {
            scroll: false,
          });
        }
      }
    }, 300);

    return () => clearTimeout(debounceFn);
  }, [search, route, pathname, router, searchParams, query]);

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
        value={search}
        className="text-[16px] font-normal leading-[22.4px] focus-visible:ring-0 focus-visible:ring-transparent bg-light-800 dark:bg-dark-400 border-none shadow-none outline-none dark:text-light-800"
        onChange={(e) => setSearch(e.target.value)}
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
