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
  selectedFilters: Record<string, string[]>;
  selectedIngredients: Set<string>;
  setSearchRecipeInput: (arg: string) => void;
  searchRecipeInput: string;
  clearFilters: () => void;
  clearIngredientFilter: () => void;
  clearSearch: () => void;
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
  console.log(filterParameters)
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
