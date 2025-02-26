import Link from "next/link";
import React from "react";
import { auth } from "../_config/Auth";

export default async function Navigation() {
  const session = await auth();
  console.log(session)
  return (
    <ul className="flex gap-4">
      <li>
        <Link
          href="/"
          className="block rounded-md px-4 py-2 transition-all hover:scale-110 hover:bg-accent active:scale-105 active:bg-primary"
        >
          home
        </Link>
      </li>
      <li>
        <Link
          href="/generateRecipe"
          className="block rounded-md px-4 py-2 transition-all hover:scale-110 hover:bg-accent active:scale-105 active:bg-primary"
        >
          Generate
        </Link>
      </li>
      <li>
        <Link
          href="/explore"
          className="block rounded-md px-4 py-2 transition-all hover:scale-110 hover:bg-accent active:scale-105 active:bg-primary"
        >
          Explore
        </Link>
      </li>
      {session?.user && (
        <>
          <li>
            <Link
              href="/planner"
              className="block rounded-md px-4 py-2 transition-all hover:scale-110 hover:bg-accent active:scale-105 active:bg-primary"
            >
              Planner
            </Link>
          </li>
          <li>
            <Link
              href="/shopping"
              className="block rounded-md px-4 py-2 transition-all hover:scale-110 hover:bg-accent active:scale-105 active:bg-primary"
            >
              Shopping
            </Link>
          </li>
          <li>
            <Link
              href="/saved"
              className="block rounded-md px-4 py-2 transition-all hover:scale-110 hover:bg-accent active:scale-105 active:bg-primary"
            >
              Saved
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
