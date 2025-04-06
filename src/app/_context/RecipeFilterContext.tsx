"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
} from "react";
import { useCategoryFilter } from "../_hooks/useCategoryFilter";
import { useIngredientFilter } from "../_hooks/useIngredientFilter";
interface props {
  children: ReactNode;
}
interface ReactFilterContext {
  handleFilterChange: (category: string, option: string) => void;
  toggleSelection: (ing: string) => void;
  setSearchRecipeInput: (arg: string) => void;
  clearFilters: () => void;
  clearSearch: () => void;
  selectedFilters: Record<string, string[]>;
  selectedIngredients: Set<string>;
  searchRecipeInput: string;
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
  // filter keys which need to remove when new filter applied

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
  function clearSearch() {
    setSearchRecipeInput("");
    clearIngredientFilter()
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
        clearSearch,
        filterParameters,
      }}
    >
      {children}
    </recipeFilterContext.Provider>
  );
}

function useRecipeFilter() {
  const context = useContext(recipeFilterContext);
  if (!context) {
    throw new Error("useRecipeFilter must be used within an AppProvider");
  }
  return context;
}
export { RecipeFilterContext, useRecipeFilter };
