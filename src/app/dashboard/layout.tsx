import React from "react";
import UserNavLinks from "../_components/UserNavLinks";

interface props {
  children: React.ReactNode;
}
async function layout({ children }: props) {
  return (
    <div className="container m-auto my-4 grid  grid-cols-[auto_1fr] gap-4 border dark:border-gray-400 p-4 h-[81vh]">
      <div className="flex flex-col pr-4 border-r" >
      <h1 className="text-2xl text-center py-8 px-4">DASHBOARD</h1>
        <UserNavLinks />
      </div>
      <div className="h-full overflow-y-scroll">{children}</div>
    </div>
  );
}

export default layout;
