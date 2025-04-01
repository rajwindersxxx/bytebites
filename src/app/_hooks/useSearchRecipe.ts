import { useQuery } from "@tanstack/react-query";
import {  useState } from "react";
import { getSearchedRecipeData } from "../_actions/recipesActions";
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
  const [offset, setOffset] = useState(0);
  const {
    data,
    isLoading: isLoadingRecipes,
    isFetching: isRefreshing,
  } = useQuery({
    queryKey: [`recipeFilterData${offset}`],
    staleTime: Infinity,
    queryFn: () =>
      getSearchedRecipeData({
        query: searchRecipeInput,
        searchObject: selectedIngredients,
        filterObject: selectedFilters,
        offSet: offset, //we need to change this
      }),
  });
  const recipeData = data?.results || [];

  return { isRefreshing, isLoadingRecipes, recipeData, setOffset, offset };
}

export default useSearchRecipe;
