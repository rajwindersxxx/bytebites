import { useInfiniteQuery } from "@tanstack/react-query";
import { getSearchedRecipeData } from "../_actions/recipesActions";
import useDebounce from "./useDebounce";
interface props {
  searchRecipeInput: string;
  selectedIngredients: Set<string>;
  selectedFilters: Record<string, string[]>;
}
function useSearchRecipe({
  searchRecipeInput,
  selectedIngredients,
  selectedFilters,
}: props) {
  const debouncedSearchTerm = useDebounce(
    {
      searchRecipeInput,
      selectedIngredients: [...new Set(selectedIngredients)],
      selectedFilters,
    },
    600,
  );
  const {
    data,
    isLoading: isLoadingRecipes,
    isFetching: isRefreshing,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["recipeFilterData", debouncedSearchTerm],
    staleTime: Infinity,
    queryFn: ({ pageParam = 0 }) =>
      getSearchedRecipeData({
        query: searchRecipeInput,
        searchObject: selectedIngredients,
        filterObject: selectedFilters,
        offSet: pageParam,
      }),

    getNextPageParam: (lastPage) => {
      const { offset, totalResults, number } = lastPage;
      const nextOffset = offset + number;
      return nextOffset < totalResults ? nextOffset : undefined;
    },
    initialPageParam: 0,
  });

  const recipeData = data?.pages?.flatMap((page) => page.results) || ["test"];
  const apiError = data?.pages[0].error;
  return {
    isRefreshing,
    isLoadingRecipes,
    recipeData,
    fetchNextPage,
    hasNextPage,
    apiError,
  };
}

export default useSearchRecipe;
