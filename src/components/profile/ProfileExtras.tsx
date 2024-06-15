import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  imgUrl: string;
  title: string;
  href?: string;
}

const ProfileExtras: React.FC<Props> = ({ imgUrl, title, href }) => {
  return <div className="flex items-center justify-center gap-1">
    <Image src={imgUrl} alt="icon" width={20} height={20} />
    {href ? (
        <Link href={href} target="_blank" className="text-blue-500 text-[16px] font-medium leading-[22.4px]">
            {title}
        </Link>
    ): (
        <p className="text-[16px] font-medium leading-[22.4px] text-dark-400 dark:text-light-700">
            {title}
        </p>
    )}
  </div>;
};

export default ProfileExtras;
