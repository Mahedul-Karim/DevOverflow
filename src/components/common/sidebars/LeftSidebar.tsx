"use client";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/components/util/data";
import { SignedOut, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LeftSidebar = () => {
  const pathname = usePathname();

  const { userId } = useAuth();

  return (
    <aside className="bg-light-900 dark:bg-dark-200 border-light-700 dark:border-dark-400 border-r border-solid flex h-[calc(100vh_-_104px)] flex-col justify-between overflow-y-auto p-6 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px] custom-scrollbar">
      <section className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;

          if(item.route === '/profile'){
            if(userId){
              item.route = `${item.route}/${userId}`
            }else{
              return null;
            }
          }

          return (
            <Link
              href={item.route}
              key={item.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark-300 dark:text-light-900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert dark:invert-0"}`}
              />
              <p
                className={`${
                  isActive
                    ? "text-[18px] font-bold leading-[140%]"
                    : "text-[18px] font-medium leading-[25.2px]"
                } max-lg:hidden`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </section>
      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="bg-light-800 dark:bg-dark-400 text-[14px] font-medium leading-[13px] min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none flex items-center justify-center gap-4">
              <Image
                src={"/assets/icons/account.svg"}
                alt="login"
                width={20}
                height={20}
                className="invert dark:invert-0"
              />
              <span className="primary-text-gradient max-lg:hidden">
                Log In
              </span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="bg-light-700 dark:bg-dark-300 text-[14px] font-medium leading-[13px] min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none border-light-700 dark:border-dark-400 border border-solid text-dark-400 dark:text-light-900 flex items-center justify-center gap-4">
            <Image
                src={"/assets/icons/sign-up.svg"}
                alt="sign-up"
                width={20}
                height={20}
                className="invert dark:invert-0"
              />
              <span className="max-lg:hidden">
                Sign Up
              </span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </aside>
  );
};

export default LeftSidebar;
