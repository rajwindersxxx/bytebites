"use client";
import { useState } from "react";
import RandomRecipes from "../_components/RandomRecipes";
export default function ExplorePage() {
  const [array, setArray] = useState([45647567]);
  return (
    <>
      <div className="grid grid-cols-responsiveGrid gap-4 mx-auto place-items-center">
        {array.map((item) => (
          <RandomRecipes key={item}/>
        ))}
      </div>
      <div className="text-center">
        <button
          className="text-center text-2xl mt-8 underline hover:scale-105 transition-all active:text-primary"
          onClick={() => setArray([...array, Math.random()])}
        >
          Show more
        </button>
      </div>
    </>
  );
}
