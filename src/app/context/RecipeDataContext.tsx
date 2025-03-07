"use client";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";
import { createContext } from "react";
import { useLikedRecipes } from "../_hooks/useLikedRecipes";
import { useSavedRecipes } from "../_hooks/useSavedRecipes";
import { RecipeObject } from "../types/RecipeTypes";
interface props {
  children: React.ReactNode;
}
interface RecipeContextType {
  likedRecipes: number[];
  savedRecipes: number[];
  savedRecipeData: RecipeObject[];
  likedRecipesData: RecipeObject[];
  isLoadingSavedRecipes: boolean;
  isSavePending: boolean;
  isLikePending: boolean;
  toggleLike: (recipeId: number) => void;
  toggleSave: (recipeId: number) => void;
}
const recipeDataContext = createContext<RecipeContextType | undefined>(
  undefined,
);
function RecipeDataContext({ children }: props) {
  const session = useSession();
  const userId = session.data?.user?.id;
  const { likedRecipes, likedRecipesData, toggleLike , isLikePending} = useLikedRecipes(Number(userId));
  const {
    savedRecipes,
    toggleSave,
    savedRecipeData,
    isLoading: isLoadingSavedRecipes,
    isPending: isSavePending,
  } = useSavedRecipes(Number(userId));

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
        isLikePending
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
