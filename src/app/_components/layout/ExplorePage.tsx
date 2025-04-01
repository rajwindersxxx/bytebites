"use client";
import Input from "../ui/Input";
import SearchFilters from "../ui/SearchFilters";
import RecipeList from "../features/recipe/RecipeList";
import { useRecipeFilter } from "@/app/context/RecipeFilterContext";
import useSearchRecipe from "@/app/_hooks/useSearchRecipe";
import MiniSpinner from "../ui/MiniSpinner";
import { useSession } from "next-auth/react";

export default function ExplorePage() {
  const { setSearchRecipeInput, searchRecipeInput, filterParameters } =
    useRecipeFilter();
  const { fetchNextPage, hasNextPage, isRefreshing } =
    useSearchRecipe(filterParameters);
  const session = useSession();
  const user = session.data?.user
  return (
    <div className={`h-[calc(100vh-3rem)] overflow-y-scroll p-4 ${user && 'ml-9'}`}>
      <div>
        <h2 className="pb-4 text-center text-2xl">Start Exploring Recipes</h2>
        <Input
          placeHolder="Search a recipe"
          className="w-full p-2"
          value={searchRecipeInput}
          onChange={(e) => {
            setSearchRecipeInput(e.target.value);
          }}
        />
        <SearchFilters />
        <div className="mx-auto grid grid-cols-responsiveGrid place-items-center gap-2">
          <RecipeList />
        </div>
        <div className="text-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage}
            className={`mt-8 text-center text-2xl underline transition-all hover:scale-105 active:text-primary ${hasNextPage || "hidden"}`}
          >
            {isRefreshing ? <MiniSpinner /> : "show more"}
          </button>
        </div>
      </div>
    </div>
  );
}
