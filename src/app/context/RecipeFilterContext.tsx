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
import { useQueryClient } from "@tanstack/react-query";
import { RecipeObject } from "../types/RecipeTypes";
import useSearchRecipe from "../_hooks/useSearchRecipe";
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
  isRefreshing: boolean;
  clearFilters: () => void;
  clearIngredientFilter: () => void;
  clearSearch: () => void;
  setOffset: (offset: number) => void
}

const recipeFilterContext = createContext<ReactFilterContext | undefined>(
  undefined,
);

function RecipeFilterContext({ children }: props) {
  const queryClient = useQueryClient();
  const { selectedFilters, handleFilterChange, clearFilters } =
    useCategoryFilter();
  const { selectedIngredients, toggleSelection, clearIngredientFilter } =
    useIngredientFilter();
  const [searchRecipeInput, setSearchRecipeInput] = useState<string>("");
  const { isRefreshing, isLoadingRecipes, recipeData, setOffset } = useSearchRecipe({
    searchRecipeInput,
    selectedIngredients,
    selectedFilters,
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: [`recipeFilterData`] });
    }, 500);
    return () => clearTimeout(timer);
  }, [ queryClient, selectedFilters, selectedIngredients]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if(searchRecipeInput.length < 4) return
      queryClient.invalidateQueries({ queryKey: [`recipeFilterData`] });
    }, 600);
    return () => clearTimeout(timer);
  }, [ queryClient, searchRecipeInput]);
  function clearSearch() {
    setSearchRecipeInput("");
  }
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
        isRefreshing,
        clearFilters,
        clearIngredientFilter,
        clearSearch,
        setOffset
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
