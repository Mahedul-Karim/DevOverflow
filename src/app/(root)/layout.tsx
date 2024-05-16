import NavBar from "@/components/common/nav/NavBar";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <main className="bg-light-850 dark:bg-dark-100 relative">
      <NavBar />
      <div className="flex">
        <aside></aside>
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-6 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full"></div>
          {children}
        </section>
        <aside></aside>
      </div>
    </main>
  );
};

export default Layout;
