"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useCategoryFilter } from "../_hooks/useCategoryFilter";
import { useIngredientFilter } from "../_hooks/useIngredientFilter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSearchedRecipeData } from "../_actions/recipesActions";
import { RecipeObject } from "../types/RecipeTypes";
interface props {
  children: ReactNode;
}
interface ReactFilterContext {
  handleFilterChange: (category: string, option: string) => void;
  toggleSelection: (ing: string) => void;
  selectedFilters: Record<string, string[]>;
  selectedIngredients: Set<string>;
  setSearchRecipeInput: (arg: string) => void;
  searchRecipeInput: string;
  recipeData: RecipeObject[];
  isLoadingRecipes: boolean;
}

const recipeFilterContext = createContext<ReactFilterContext | undefined>(
  undefined,
);

function RecipeFilterContext({ children }: props) {
  const queryClient = useQueryClient();
  const { selectedFilters, handleFilterChange } = useCategoryFilter();
  const { selectedIngredients, toggleSelection } = useIngredientFilter();
  const [searchRecipeInput, setSearchRecipeInput] = useState<string>("");
  useEffect(() => {
    const timer = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["recipeFilterData"] });
    }, 500);

    return () => clearTimeout(timer);
  }, [queryClient, searchRecipeInput, selectedFilters, selectedIngredients]);
  const { data, isLoading: isLoadingRecipes } = useQuery({
    queryKey: ["recipeFilterData"],
    staleTime: Infinity,
    queryFn: () =>
      getSearchedRecipeData({
        query: searchRecipeInput,
        searchObject: selectedIngredients,
        filterObject: selectedFilters,
        offSet: 0, //we need to change this
      }),
  });
  const recipeData = data?.results || [];
  return (
    <recipeFilterContext.Provider
      value={{
        handleFilterChange,
        selectedFilters,
        selectedIngredients,
        toggleSelection,
        setSearchRecipeInput,
        searchRecipeInput,
        recipeData,
        isLoadingRecipes,
      }}
    >
      {children}
    </recipeFilterContext.Provider>
  );
}

function useRecipeFilter() {
  const context = useContext(recipeFilterContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
export { RecipeFilterContext, useRecipeFilter };
