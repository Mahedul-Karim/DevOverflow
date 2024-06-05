"use client";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answers";
import { downvoteQuestion, upvoteQuestion } from "@/lib/actions/questions";
import { saveQuestion } from "@/lib/actions/user";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface Props {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasupVoted: boolean;
  downvotes: number;
  hasdownVoted: boolean;
  hasSaved?: boolean;
}

const Voting: React.FC<Props> = ({
  type,
  itemId,
  userId,
  upvotes,
  hasupVoted,
  downvotes,
  hasdownVoted,
  hasSaved,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleSave = async () => {
    await saveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path: pathname,
    });
  };

  const handleVoting = async (votingType: string) => {
    if (!userId) return;

    if (votingType === "upvote") {
      if (type === "question") {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      }
      if (type === "answer") {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      }
    }

    if (votingType === "downvote") {
      if (type === "question") {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      }
      if (type === "answer") {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      }
    }
  };

  return (
    <div className="flex gap-5">
      <div className="flex items-center justify-center gap-2.5">
        <div className="flex items-center justify-center gap-1.5">
          <Image
            src={
              hasupVoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
            onClick={handleVoting.bind(null, "upvote")}
          />
          <div className="flex items-center justify-center bg-light-700 dark:bg-dark-400 min-w-[18px] rounded-sm p-1">
            <p className="text-[10px] font-medium leading-[13px] text-dark-400 dark:text-light-900">
              {formatNumber(upvotes)}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <Image
            src={
              hasdownVoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            width={18}
            height={18}
            alt="downvote"
            className="cursor-pointer"
            onClick={handleVoting.bind(null, "downvote")}
          />
          <div className="flex items-center justify-center bg-light-700 dark:bg-dark-400 min-w-[18px] rounded-sm p-1">
            <p className="text-[10px] font-medium leading-[13px] text-dark-400 dark:text-light-900">
              {formatNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>

      {type === "question" && (
        <Image
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          width={18}
          height={18}
          alt="upvote"
          className="cursor-pointer"
          onClick={handleSave}
        />
      )}
    </div>
  );
};

export default Voting;
