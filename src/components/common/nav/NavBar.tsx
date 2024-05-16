import React from "react";
import NavIcon from "./NavIcon";
import Search from "./Search";
import Buttons from "./Buttons";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between bg-light-900 dark:bg-dark-200  z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <NavIcon />
      <Search />
      <Buttons />
    </nav>
  );
};

export default NavBar;
