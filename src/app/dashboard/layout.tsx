import React from "react";
import UserNavigation from "../_components/UserNavigation";

interface props {
  children: React.ReactNode;
}
function layout({ children }: props) {
  return (
    <div className="container m-auto my-4 grid h-full grid-cols-[auto_1fr] gap-4 border p-4 ">
      <div className="flex flex-col pr-4 border-r">
      <h1 className="text-2xl text-center py-8 px-4">DASHBOARD</h1>
        <UserNavigation />
      </div>
      <div>{children}</div>
    </div>
  );
}

export default layout;
