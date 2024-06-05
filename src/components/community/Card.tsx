import { getTags } from "@/lib/actions/tags";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import Tags from "../common/Tags";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
}

const Card: React.FC<Props> = async ({ user }) => {
  const tags = await getTags({ userId: user._id });

  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="shadow-light-100 dark:shadow-none w-full max-xs:min-w-full xs:w-[260px]"
    >
      <article className="bg-light-900 dark:bg-dark-200 border-light-800 dark:border-dark-300 flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          src={user.picture}
          alt="user profile picture"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="mt-4 text-center">
          <h3 className="text-[20px] font-bold leading-[26px] text-dark-200 dark:text-light-900 line-clamp-1">
            {user.name}
          </h3>
          <p className="text-[14px] font-normal leading-[19.6px] text-dark-500 dark:text-light-500 mt-2">
            @{user.username}
          </p>
        </div>
        <div className="mt-5">
          {tags.length > 0 ? (
            <div className="flex items-center gap-2">
              {tags.map((tag) => (
                <Tags key={tag._id} _id={tag._id} name={tag.name} />
              ))}
            </div>
          ) : (
            <Badge>No tags yet</Badge>
          )}
        </div>
      </article>
    </Link>
  );
};

export default Card;
