import { Category } from "@/app/_types/RecipeTypes";
import MiniSpinner from "./MiniSpinner";
import { useRecipeFilter } from "@/app/_context/RecipeFilterContext";
import useSearchRecipe from "@/app/_hooks/useSearchRecipe";

interface props {
  categories: Category[];
  handleOptions: (category: string) => void;
  openedCategories: string;
}
function SearchCategories({
  categories,
  handleOptions,
  openedCategories,
}: props) {
  const { filterParameters, clearFilters, clearSearch } = useRecipeFilter();
  const { isRefreshing } = useSearchRecipe(filterParameters);
  return (
    <div className="flex items-center justify-between pr-4">
      <div className="flex gap-2 py-4">
        {categories.map((category) => (
          <button
            key={Object.keys(category)[0]}
            type="button"
            className={`text-md inline-block rounded-full border px-3 py-2 capitalize ${openedCategories === Object.keys(category)[0] && "border-none bg-accent dark:text-gray-700"}`}
            onClick={() =>
              openedCategories === Object.keys(category)[0]
                ? handleOptions("")
                : handleOptions(Object.keys(category)[0])
            }
          >
            {Object.keys(category)}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4">
        {isRefreshing && <MiniSpinner className="h-10 w-10 border-4" />}
        <button
          className={`text-md inline-block rounded-full border border-none bg-natural-beige px-3 py-2 capitalize`}
          onClick={clearFilters}
        >
          Clear Filter
        </button>
        <button
          className={`text-md inline-block rounded-full border border-none bg-natural-beige px-3 py-2 capitalize`}
          onClick={clearSearch}
        >
          Clear Search
        </button>
      </div>
    </div>
  );
}

export default SearchCategories;
