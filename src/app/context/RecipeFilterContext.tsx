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
  clearFilters: () => void;
  clearIngredientFilter: () => void;
  clearSearch: () => void;
  offsetArray: number[];
  setOffsetArray: React.Dispatch<React.SetStateAction<number[]>>;
  filterParameters: {
    searchRecipeInput: string;
    selectedIngredients: Set<string>;
    selectedFilters: Record<string, string[]>;
  };
}

const recipeFilterContext = createContext<ReactFilterContext | undefined>(
  undefined,
);

function RecipeFilterContext({ children }: props) {
  const [offsetArray, setOffsetArray] = useState<number[]>([0]);
  // filter keys which need to remove when new filter applyied
  const queryKeysToRemove = offsetArray
    .filter((item) => item !== 0)
    .map((item) => `recipeFilterData${item}`);
    console.log(queryKeysToRemove)
  const queryClient = useQueryClient();
  const { selectedFilters, handleFilterChange, clearFilters } =
    useCategoryFilter();
  const { selectedIngredients, toggleSelection, clearIngredientFilter } =
    useIngredientFilter();
  const [searchRecipeInput, setSearchRecipeInput] = useState<string>("");
  const filterParameters = {
    searchRecipeInput,
    selectedIngredients,
    selectedFilters,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: [`recipeFilterData0`] });
      setOffsetArray([0]);
    }, 500);
    return () => clearTimeout(timer);
  }, [queryClient, selectedFilters, selectedIngredients]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchRecipeInput.length < 4) return;
      queryClient.invalidateQueries({ queryKey: [`recipeFilterData0`] });
      setOffsetArray([0]);
    }, 600);
    return () => clearTimeout(timer);
  }, [queryClient , searchRecipeInput]);
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
        clearFilters,
        clearIngredientFilter,
        clearSearch,
        filterParameters,
        offsetArray,
        setOffsetArray,
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
