import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  imgUrl: string;
  alt: string;
  value: number | string;
  title: string;
  extraStyles?: string;
  href?: string;
  isAuthor?: boolean;
}

const Metric: React.FC<Props> = ({
  imgUrl,
  alt,
  value,
  title,
  extraStyles,
  href,
  isAuthor = false,
}) => {
  const metricContent = (
    <>
      <Image
        src={imgUrl}
        width={16}
        height={16}
        alt={alt}
        className={`object-contain ${href ? "rounded-full" : ""}`}
      />
      <p className={`${extraStyles} flex items-center gap-1`}>
        {value}
        <span
          className={`text-[12px] font-normal leading-[15.6px] line-clamp-1 ${
            isAuthor ? "max-sm:hidden" : ""
          }`}
        >
          {title}
        </span>
      </p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center justify-center gap-1">
        {metricContent}
      </Link>
    );
  }

  return (
    <div className="flex items-center justify-center flex-wrap gap-1">
      {metricContent}
    </div>
  );
};

export default Metric;
