"use client";
import { useState } from "react";
import RandomRecipes from "../features/recipe/RandomRecipes";
import { uniqueId } from "lodash";

export default function ExplorePage() {
  const [array, setArray] = useState<number[]>([1]);
  return (
    <>
      <div className="mx-auto grid grid-cols-responsiveGrid place-items-center gap-4">
        {array?.map((item) => (
          <RandomRecipes key={uniqueId()} groupId={item} />
        ))}
      </div>
      <div className="text-center">
        <button
          className="mt-8 text-center text-2xl underline transition-all hover:scale-105 active:text-primary"
          onClick={() => setArray([...array, array.length + 1])}
        >
          Show more
        </button>
      </div>
    </>
  );
}
