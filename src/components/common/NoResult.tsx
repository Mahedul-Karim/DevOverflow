import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";


interface Props{
  title:string;
  description:string;
  link:string;
  linkTitle:string;
}

const NoResult:React.FC<Props> = ({title,description,link,linkTitle}) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image
        src="/assets/images/light-illustration.png"
        alt="No results"
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />
      <Image
        src="/assets/images/dark-illustration.png"
        alt="No results"
        width={270}
        height={200}
        className="hidden object-contain dark:block"
      />
      <h2 className="text-[24px] font-bold leading-[31.2px] text-dark-200 dark:text-light-900 mt-8">{title}</h2>
      <p className="text-[14px] font-normal leading-[19.6px] text-dark-500 dark:text-light-700 my-3.5 max-w-md text-center">
        {description}
      </p>
      <Link href={link}>
        <Button className="text-[16px] font-medium leading-[22.4px] mt-5 min-h-[46px] rounded-lg bg-primary-500 px-4 py-3 text-light-900 ">{linkTitle}</Button>
      </Link>
    </div>
  );
};

export default NoResult;
