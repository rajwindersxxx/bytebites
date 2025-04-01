"use client";
import Input from "../ui/Input";
import SearchFilters from "../ui/SearchFilters";
import RecipeList from "../features/recipe/RecipeList";
import { useRecipeFilter } from "@/app/context/RecipeFilterContext";
import { SEARCH_RESULTS_COUNT } from "@/app/_config/foodApiConfig";

export default function ExplorePage() {
  const { setSearchRecipeInput, searchRecipeInput, offsetArray, setOffsetArray } = useRecipeFilter();
  return (
    <div className="h-[calc(100vh-3rem)] overflow-y-scroll p-4">
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
        {offsetArray.map((item: number) => (
          <RecipeList key={item} offset={item} />
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={() =>
            setOffsetArray((preValue: number[]) => {
              const offset =
                preValue[preValue.length - 1] + SEARCH_RESULTS_COUNT;
              return [...preValue, offset];
            })
          }
          className="mt-8 text-center text-2xl underline transition-all hover:scale-105 active:text-primary"
        >
          Show more
        </button>
      </div>
    </div>
  );
}
