'use client'
import { getSessionStorage } from "@/app/_helper/clientheper";
import { RecipeObject } from "@/app/types/RecipeTypes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
export default function Navigation() {
  const [generatedRecipe, setGeneratedRecipe] = useState<null | RecipeObject>(null);
  useEffect(() => {
    const data = getSessionStorage<RecipeObject>('generatedRecipe');
    setGeneratedRecipe(data);
    console.log(data)
  }, [])
  return (
    <ul className="flex gap-4 justify-self-center">
      <li>
        {generatedRecipe && <Link
          href="/generateRecipe/generatedRecipe"
          className="block rounded-md px-4 py-2 transition-all hover:scale-110 hover:bg-accent active:scale-105 active:bg-primary dark:hover:text-gray-900"
        >
          View Last A.I recipe
        </Link>}
      </li>
    </ul>
  );
}
