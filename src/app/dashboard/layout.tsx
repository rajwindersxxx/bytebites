import React from "react";
import UserNavLinks from "../_components/UserNavLinks";
import { auth } from "../_lib/Auth";
import { Metadata } from "next";

interface props {
  children: React.ReactNode;
}
export const metaData: Metadata = {
  title: 'dashBoard'
}
async function layout({ children }: props) {
  const session = await auth()
  if (!session) return <div className="text-4xl absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">You need to login first</div>
  return (
    <div className="container m-auto my-4 grid h-[81vh] grid-cols-[auto_1fr] gap-4 border p-4 dark:border-gray-400">
      <div className="flex flex-col border-r pr-4">
        <h1 className="px-4 py-8 text-center text-2xl">DASHBOARD</h1>
        <UserNavLinks />
      </div>
      <div className="h-full overflow-y-scroll">{children}</div>
    </div>
  );
}

export default layout;
