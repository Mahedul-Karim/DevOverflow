"use client";
import { formUrlQuery, removeKeyFromQuery } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import SearchModal from "./SearchModal";

const Search = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        //@ts-ignore
        !searchContainerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };
    setIsOpen(false);
    setSearch("");
    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [pathname]);

  useEffect(() => {
    const debounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });

        router.push(newUrl, {
          scroll: false,
        });
      } else {
        const newUrl = removeKeyFromQuery({
          params: searchParams.toString(),
          keys: ["global", "type"],
        });
        router.push(newUrl, {
          scroll: false,
        });
      }
    }, 300);

    return () => clearTimeout(debounceFn);
  }, [search, pathname, router, searchParams, query]);

  return (
    <div
      className="relative w-full max-w-[600px] max-lg:hidden"
      ref={searchContainerRef}
    >
      <div className="bg-light-800 dark:bg-dark-400 relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);

            if (!isOpen) {
              setIsOpen(true);
            }

            if (e.target.value === "" && isOpen) {
              setIsOpen(false);
            }
          }}
          className="text-[16px] font-normal leading-[22.4px] focus-visible:ring-0 focus-visible:ring-transparent bg-light-800 dark:bg-dark-400 border-none shadow-none outline-none dark:text-light-800"
        />
      </div>
      {isOpen && <SearchModal />}
    </div>
  );
};

export default Search;
