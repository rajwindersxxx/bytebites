import React from "react";
import { SecondaryButton } from "../../ui/Buttons";
import Link from "next/link";
interface props {
  review: string;
}
export default function RecipePreview({ review }: props) {
  return (
    <div className="border-1 dark:border-1 dark:bg-primary/25 relative grid min-h-96 overflow-hidden rounded-md border-natural-terracotta bg-natural-beige dark:border-accent">
      <div className="grid w-[800px] grid-rows-[auto_1fr_auto] justify-stretch">
        <div className="flex h-8 items-center justify-between bg-accent px-2 dark:bg-accent">
          <p className="text-cream dark uppercase">Recipe Preview</p>
          <button className="h-4 w-4 rounded-full bg-red-950/50"></button>
        </div>
        <div className="text-beige justify-self-start p-4 text-start text-black dark:text-gray-300">
          {/* need to sanatize first */}
          <p dangerouslySetInnerHTML={{ __html: review }} />
        </div>
        <Link href="generateRecipe/generatedRecipe" className="p-4">
          <SecondaryButton>View recipe</SecondaryButton>
        </Link>
      </div>
    </div>
  );
}
