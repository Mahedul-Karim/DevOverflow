"use client";
import React, { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import GlobalSearchFilters from "./GlobalSearchFilters";
import { globalSearch } from "@/lib/actions/global";

const SearchModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const [result, setResult] = useState([]);

  const global = searchParams.get("global");
  const type = searchParams.get("type");

  useEffect(() => {
    const fetchResult = async () => {
      setResult([]);

      try {
        setIsLoading(true);

        const res = await globalSearch({
          query:global,
          type
        });

        setResult(JSON.parse(res as string))

      } catch (err) {
        console.log(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    };

    if(global){
      fetchResult()
    }

  }, [global,type]);

  const renderLink = (type: string, id: string) => {
    
    switch(type){
      case 'question':
        return `/question/${id}`
      case 'answer':
        return `/question/${id}`
      case 'user':
        return  `/profile/${id}`
      case 'tag':
        return `/tags/${id}`
      default:
        return '/'
    }

  };

  return (
    <div className="absolute top-full z-10 mt-3 w-full bg-light-800 py-5 shadow-sm dark:bg-dark-400 rounded-xl">
      <GlobalSearchFilters />
      <div className="my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50" />
      <div className="space-y-5">
        <p className="text-[16px] font-semibold leading-[20.8px] text-dark-400 dark:text-light-500 px-5">
          Top Match
        </p>
        {isLoading ? (
          <div className="flex items-center justify-center flex-col gap-5">
            <ReloadIcon className="mt-2 h-10 w-10 text-primary-500 animate-spin" />
            <p className="text-dark-200 dark:text-light-800 text-[14px] font-normal leading-[19.6px]">
              Browsing the entire database
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {result.length > 0 ? (
              result.map((item: any, index: number) => (
                <Link
                  href={renderLink(item.type,item.id)}
                  key={item._id}
                  className="flex w-full items-start gap-3 px-5 py-2.5 hover:bg-light-700/50 dark:bg-dark-500/50"
                >
                  <Image
                    src="/assets/icons/tag.svg"
                    alt="tags"
                    width={18}
                    height={18}
                    className="invert dark:invert-0 mt-1 object-contain"
                  />
                  <div className="flex flex-col">
                    <p className="text-[14px] font-medium leading-[18.2px] text-dark-200 dark:text-light-800 line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-light-400 dark:text-light-500 text-[12px]  leading-[15.6px] mt-1 font-bold capitalize">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex items-center justify-center flex-col px-5">
                <p className="text-dark-200 dark:text-light-800 text-[14px] font-normal leading-[19.6px] px-5 py-2.5">
                  Oops , no results found!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
