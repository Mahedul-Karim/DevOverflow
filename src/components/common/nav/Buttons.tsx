import React from "react";
import ThemeSwitch from "./Navbuttons/ThemeSwitch";
import User from "./Navbuttons/User";

const Buttons = () => {
  return (
    <div className="flex items-center justify-between gap-5">
      <ThemeSwitch />
      <User />
    </div>
  );
};

export default Buttons;
