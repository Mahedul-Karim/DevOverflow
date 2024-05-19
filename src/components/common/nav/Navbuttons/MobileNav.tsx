import React from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import NavContent from "../NavContent";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          width={35}
          height={35}
          alt="Menu"
          className="invert dark:invert-0 sm:hidden"
        />
      </SheetTrigger>
      <SheetContent className="bg-light-900 dark:bg-dark-200 overflow-auto" side={"left"}>
        <Link href={"/"} className="flex items-center gap-1">
          <Image
            src={"/assets/images/site-logo.svg"}
            width={23}
            height={23}
            alt="DevFlow"
          />
          <p className="text-[24px] font-bold leading-[31.2px] font-spaceGrotesk text-dark-100 dark:text-light-900 ">
            Dev <span className="text-primary-500">Overflow</span>
          </p>
        </Link>
        <div>
          <SheetClose asChild>
            <NavContent />
          </SheetClose>

          <SignedOut>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button className="bg-light-800 dark:bg-dark-400 text-[14px] font-medium leading-[13px] min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button className="bg-light-700 dark:bg-dark-300 text-[14px] font-medium leading-[13px] min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none border-light-700 dark:border-dark-400 border border-solid text-dark-400 dark:text-light-900">
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
