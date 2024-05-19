import React from "react";
import ThemeSwitch from "./Navbuttons/ThemeSwitch";
import User from "./Navbuttons/User";
import MobileNav from "./Navbuttons/MobileNav";

const Buttons = () => {
  return (
    <div className="flex items-center justify-between gap-5">
      <ThemeSwitch />
      <User />
      <MobileNav />
    </div>
  );
};

export default Buttons;
