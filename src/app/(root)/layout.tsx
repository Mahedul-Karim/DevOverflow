import NavBar from "@/components/common/nav/NavBar";
import LeftSidebar from "@/components/common/sidebars/LeftSidebar";
import RightSidebar from "@/components/common/sidebars/RightSidebar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <main className="bg-light-850 dark:bg-dark-100 relative">
      <NavBar />
      <div className="flex">
        <LeftSidebar />
        <section className="flex flex-1 flex-col px-6 pb-6 pt-6 max-md:pb-14 sm:px-14 custom-scrollbar h-[calc(100vh_-_104px)] overflow-auto">
          <div className="mx-auto w-full max-w-5xl">
            {children}
          </div>
        </section>
        <RightSidebar />
      </div>
      <Toaster />
    </main>
  );
};

export default Layout;
