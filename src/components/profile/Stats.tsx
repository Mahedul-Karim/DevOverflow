import { formatNumber } from "@/lib/utils";
import React from "react";
import BadgeCard from "./BadgeCard";
import { BadgeCounts } from "@/types";

interface Props {
  totalQuestions: number;
  totalAnswers: number;
  badgeCounts:BadgeCounts
}

const Stats: React.FC<Props> = ({ totalQuestions, totalAnswers,badgeCounts }) => {
  return (
    <div className="mt-10">
      <h3 className="text-[20px] font-semibold leading-[24.8px] text-dark-200 dark:text-light-900">
        Stats
      </h3>
      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div className="border-light-800 dark:border-dark-300 bg-light-900 dark:bg-dark-300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <div>
            <p className="text-[16px] font-semibold leading-[20.8px] text-dark-200 dark:text-light-900">
              {formatNumber(totalQuestions)}
            </p>
            <p className="text-[14px] font-medium leading-[18.2px] text-dark-400 dark:text-light-700">
              Questions
            </p>
          </div>
          <div>
            <p className="text-[16px] font-semibold leading-[20.8px] text-dark-200 dark:text-light-900">
              {formatNumber(totalAnswers)}
            </p>
            <p className="text-[14px] font-medium leading-[18.2px] text-dark-400 dark:text-light-700">
              Answers
            </p>
          </div>
        </div>

        <BadgeCard
          imgUrl="/assets/icons/gold-medal.svg"
          value={badgeCounts.GOLD}
          title="Gold Badges"
        />
        <BadgeCard
          imgUrl="/assets/icons/silver-medal.svg"
          value={badgeCounts.SILVER}
          title="Silver Badges"
        />
        <BadgeCard
          imgUrl="/assets/icons/bronze-medal.svg"
          value={badgeCounts.BRONZE}
          title="Bronze Badges"
        />
      </div>
    </div>
  );
};

export default Stats;
