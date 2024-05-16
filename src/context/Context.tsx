"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ContextType {
  mode: string;
  setMode: (mode: string) => void;
}

interface Props {
  children: React.ReactNode;
}

const Context = createContext<ContextType | undefined>(undefined);

const ContextProvider: React.FC<Props> = ({ children }) => {
  const [mode, setMode] = useState("light");

  const handleModeChange = () => {
    if (mode === "light") {
      setMode("dark");
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  };

  // useEffect(() => {
  //   handleModeChange();
  // }, [mode]);

  return (
    <Context.Provider value={{ mode, setMode }}>{children}</Context.Provider>
  );
};

export const useCtx = () => {
  return useContext(Context);
};

export default ContextProvider;
