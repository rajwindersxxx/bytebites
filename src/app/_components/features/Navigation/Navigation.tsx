"use client";
import { useRecipeData } from "@/app/context/RecipeDataContext";
import Link from "next/link";
import { useEffect } from "react";
export default function Navigation() {
  const { generatedRecipe } = useRecipeData();
  useEffect(() => {
    if (generatedRecipe) {
      console.log("Generated Recipe in Nav:", generatedRecipe);
      // Process your generatedRecipe here
    }
  }, [generatedRecipe]);
  return (
    <ul className="flex gap-4 justify-self-center">
      <li>
        {generatedRecipe && (
          <Link
            href="/generateRecipe/generatedRecipe"
            className="block rounded-md px-4 py-2 transition-all hover:scale-110 hover:bg-accent active:scale-105 active:bg-primary dark:hover:text-gray-900"
          >
            View Last A.I recipe
          </Link>
        )}
      </li>
    </ul>
  );
}
