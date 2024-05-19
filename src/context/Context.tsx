"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ContextType {
  mode: string;
  setMode: (mode: string) => void;
}

interface Props {
  children: React.ReactNode;
}

const Context = createContext<ContextType>({
  mode: "",
  setMode: () => {},
});

const ContextProvider: React.FC<Props> = ({ children }) => {
  const [mode, setMode] = useState("light");

  

  const theme =
   typeof window !== "undefined" && localStorage.getItem("theme") !== null
      ?localStorage.getItem("theme")
      : null;

  const handleModeChange = () => {
    if (
      theme === "light" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme:light)").matches)
    ) {
      setMode("light");
      document.documentElement.classList.remove("dark");
      
    } else {
      setMode("dark");
      document.documentElement.classList.add("dark");
    }
  };

  useEffect(() => {
    handleModeChange();
  }, [mode]);

  return (
    <Context.Provider value={{ mode, setMode }}>{children}</Context.Provider>
  );
};

export const useCtx = () => {
  return useContext(Context);
};

export default ContextProvider;
