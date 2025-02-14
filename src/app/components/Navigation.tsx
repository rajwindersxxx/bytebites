import Link from 'next/link';
import React from 'react';

export default function Navigation() {
  return (
    <ul className="flex gap-4 ">
      <li>
        <Link
          href="/"
          className="hover:scale-110 hover:bg-accent rounded-md py-2 px-4 transition-all block active:bg-primary active:scale-105"
        >
          home
        </Link>
      </li>
      <li>
        <Link
          href="/generateRecipe"
          className="hover:scale-110 hover:bg-accent rounded-md py-2 px-4 transition-all block active:bg-primary active:scale-105"
        >
          Generate
        </Link>
      </li>
      <li>
        <Link
          href="/explore"
          className="hover:scale-110 hover:bg-accent rounded-md py-2 px-4 transition-all block active:bg-primary active:scale-105"
        >
          Explore
        </Link>
      </li>
      <li>
        <Link
          href="/planner"
          className="hover:scale-110 hover:bg-accent rounded-md py-2 px-4 transition-all block active:bg-primary active:scale-105"
        >
          Planner
        </Link>
      </li>
      <li>
        <Link
          href="/shopping"
          className="hover:scale-110 hover:bg-accent rounded-md py-2 px-4 transition-all block active:bg-primary active:scale-105"
        >
          Shopping
        </Link>
      </li>
      <li>
        <Link
          href="/saved"
          className="hover:scale-110 hover:bg-accent rounded-md py-2 px-4 transition-all block active:bg-primary active:scale-105"
        >
          Saved
        </Link>
      </li>
    </ul>
  );
}
