import Image from "next/image";
import React from "react";

interface Props {
  imgUrl: string;
  value: number;
  title: string;
}

const BadgeCard: React.FC<Props> = ({ imgUrl, value, title }) => {
  return (
    <div className="border-light-800 dark:border-dark-300 bg-light-900 dark:bg-dark-300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
      <Image src={imgUrl} alt={title} width={40} height={50} />
      <div>
        <p className="text-[16px] font-semibold leading-[20.8px] text-dark-200 dark:text-light-900">
          {value}
        </p>
        <p className="text-[14px] font-medium leading-[18.2px] text-dark-400 dark:text-light-700">
          {title}
        </p>
      </div>
    </div>
  );
};

export default BadgeCard;
