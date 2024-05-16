import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <main className="flex items-center justify-center min-h-screen w-full">
      {children}
    </main>
  );
};

export default Layout;
