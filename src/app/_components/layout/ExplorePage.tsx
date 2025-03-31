"use client";
import { useRef } from "react";
import Input from "../ui/Input";
import SearchFilters from "../ui/SearchFilters";
import RecipeList from "../features/recipe/RecipeList";
import { useRecipeFilter } from "@/app/context/RecipeFilterContext";

export default function ExplorePage() {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const { setSearchRecipeInput } = useRecipeFilter();
  return (
    <div className="h-[calc(100vh-3rem)] overflow-y-scroll p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearchRecipeInput(searchRef.current?.value || "");
        }}
      >
        <Input
          placeHolder="Search a recipe"
          className="w-full p-2"
          ref={searchRef}
        />
      </form>
      <SearchFilters />
      <div className="mx-auto grid grid-cols-responsiveGrid place-items-center gap-2">
        <RecipeList />
      </div>
      <div className="text-center">
        <button className="mt-8 text-center text-2xl underline transition-all hover:scale-105 active:text-primary">
          Show more
        </button>
      </div>
    </div>
  );
}
