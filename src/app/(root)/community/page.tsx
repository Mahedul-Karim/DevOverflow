import Card from "@/components/community/Card";
import Filter from "@/components/layout/filter/Filter";
import Search from "@/components/layout/search/Search";
import { UserFilters } from "@/components/util/data";
import { getAllUser } from "@/lib/actions/user";
import Link from "next/link";
import React from "react";

const CommunityPage = async () => {
  const results = await getAllUser({});

  return (
    <>
      <h1 className="text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
        All Users
      </h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Search
          route="/community"
          iconPosition="left"
          placeholder="Search for amazing minds"
          extraClass="flex-1"
        />
        <Filter
          filters={UserFilters}
          extraClass="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {results.users.length > 0 ? (
          results.users.map((user) => <Card key={user._id} user={user} />)
        ) : (
          <div className="text-[16px] font-normal leading-[22.4px] text-dark-200 dark:text-light-800 mx-auto max-w-4xl text-center">
            <p>No users yet!</p>
            <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
              Join to be the first
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default CommunityPage;
