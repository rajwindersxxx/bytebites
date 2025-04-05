import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { getSearchedRecipeData } from "../_actions/recipesActions";
import { useMemo } from "react";
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

  const stableSearchParams = useMemo(
    () => ({
      searchRecipeInput,
      selectedIngredients: [... new Set(selectedIngredients)],
      selectedFilters,
    }),
    [searchRecipeInput, selectedIngredients, selectedFilters],
  );
  const debouncedSearchTerm = useDebounce(stableSearchParams, 600);
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

  const recipeData= data?.pages?.flatMap((page) => page.results) || ['test'];
  const apiError = data?.pages[0].error;
  return {
    isRefreshing,
    isLoadingRecipes,
    recipeData,
    fetchNextPage,
    hasNextPage,
    apiError
  };
}

export default useSearchRecipe;
