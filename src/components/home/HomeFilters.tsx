"use client";
import React from "react";
import { HomePageFilters } from "../util/data";
import { Button } from "../ui/button";

const HomeFilters = () => {
  const active = "newest";

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((filter) => (
        <Button
          key={filter.value}
          className={`text-[14px] font-medium leading-[18.2px] rounded-lg px-6 py-3 capitalize shadow-none ${
            active === filter.value
              ? "bg-primary-100 text-primary-500"
              : "bg-light-800 text-light-500"
          }`}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
