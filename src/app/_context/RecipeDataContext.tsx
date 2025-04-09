"use client";
import React, { useContext } from "react";
import { createContext } from "react";
import { useLikedRecipes } from "../_hooks/useLikedRecipes";
import { useSavedRecipes } from "../_hooks/useSavedRecipes";
import { RecipeObject } from "../_types/RecipeTypes";
import { useGenerateRecipe } from "../_hooks/useGenerateRecipe";
interface props {
  children: React.ReactNode;
}
interface RecipeContextType {
  likedRecipes: number[];
  savedRecipes: number[];
  status: string;
  savedRecipeData: RecipeObject[] | undefined;
  likedRecipesData: RecipeObject[] | undefined;
  isLoadingSavedRecipes: boolean;
  isSavePending: boolean;
  isLikePending: boolean;
  generatedRecipe: RecipeObject | undefined;
  toggleLike: (recipeId: number) => void;
  toggleSave: (recipeId: number) => void;
  clearUserRecipeData: () => void;
  generateRecipe: () => void;
}
const recipeDataContext = createContext<RecipeContextType | undefined>(
  undefined,
);
function RecipeDataContext({ children }: props) {
  const {
    likedRecipes,
    likedRecipesData,
    toggleLike,
    isLikePending,
    setLikedRecipes,
  } = useLikedRecipes();
  const { status, generatedRecipe, generateRecipe } = useGenerateRecipe();
  const {
    savedRecipes,
    setSavedRecipes,
    toggleSave,
    savedRecipeData,
    isLoading: isLoadingSavedRecipes,
    isPending: isSavePending,
  } = useSavedRecipes();
  function clearUserRecipeData() {
    setLikedRecipes([]);
    setSavedRecipes([]);
  }
  return (
    <recipeDataContext.Provider
      value={{
        likedRecipes,
        likedRecipesData,
        toggleLike,
        toggleSave,
        savedRecipes,
        savedRecipeData,
        isLoadingSavedRecipes,
        isSavePending,
        isLikePending,
        status,
        generatedRecipe,
        generateRecipe,
        clearUserRecipeData,
      }}
    >
      {children}
    </recipeDataContext.Provider>
  );
}

function useRecipeData() {
  const context = useContext(recipeDataContext);
  if (!context)
    throw new Error("useRecipeContext must be used within a RecipeProvider");
  return context;
}

export { useRecipeData, RecipeDataContext };
