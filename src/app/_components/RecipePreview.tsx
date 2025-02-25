import React from "react";
import { SecondaryButton } from "./Buttons";
import Link from "next/link";
interface props {
  review: string;
}
export default function RecipePreview({ review }: props) {
  return (
    <div className="relative grid min-h-96 overflow-hidden rounded-md border-2 border-natural-terracotta bg-natural-beige">
      <div className="grid w-[800px] grid-rows-[auto_1fr_auto] justify-stretch ">
        <div className="flex h-8 items-center justify-between bg-natural-terracotta/75 px-2">
          <p className="text-cream uppercase">Recipe Preview</p>
          <button className="h-4 w-4 rounded-full bg-red-950/50"></button>
        </div>
        <div className="text-beige justify-self-start p-4 text-start text-black ">
          <p dangerouslySetInnerHTML={{ __html: review }} />
        </div>
        <Link href="generateRecipe/generatedRecipe" className="p-4">
          <SecondaryButton>View recipe</SecondaryButton>
        </Link>
      </div>
    </div>
  );
}
