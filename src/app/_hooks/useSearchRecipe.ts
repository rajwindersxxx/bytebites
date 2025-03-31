import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
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
  const [isRefreshing, setRefreshState] = useState(false);
  const [offset , setOffset] = useState(0)
  const { data, isLoading: isLoadingRecipes } = useQuery({
    queryKey: [`recipeFilterData${offset}`],
    staleTime: Infinity,
    queryFn: async () => {
      setRefreshState(true);
      const data = await getSearchedRecipeData({
        query: searchRecipeInput,
        searchObject: selectedIngredients,
        filterObject: selectedFilters,
        offSet: offset, //we need to change this
      });
      setRefreshState(false);
      return data;
    },
  });
  const recipeData = data?.results || [];
  return { isRefreshing, isLoadingRecipes, recipeData , setOffset,offset};
}

export default useSearchRecipe;
