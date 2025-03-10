"use client";

import { useSession } from "next-auth/react";

import DashBoardCards from "../_components/DashBoardCards";

function Page() {
  const session = useSession();
  console.log(session);
  return (
    <div>
      <h2 className="p-4 text-center text-2xl">
        {" "}
        Your Ingredient Shopping List{" "}
      </h2>
      <div className="grid h-full grid-cols-4 gap-8">
        <DashBoardCards />

        <div className="col-span-2 border"></div>
        <div className="border">upcoming ingredients </div>
        <div className="border">Activity</div>
      </div>
    </div>
  );
}

export default Page;
