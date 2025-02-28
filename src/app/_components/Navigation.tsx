import Link from "next/link";
import React from "react";
export default async function Navigation() {
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

    </ul>
  );
}
