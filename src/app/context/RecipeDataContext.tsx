"use client";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";
import { createContext } from "react";
import { useLikedRecipes } from "../_hooks/useLikedRecipes";
import { useSavedRecipes } from "../_hooks/useSavedRecipes";
interface props {
  children: React.ReactNode;
}
interface RecipeContextType {
  likedRecipes: number[];
  savedRecipes: number[];
  toggleLike: (recipeId: number) => void;
  toggleSave: (recipeId: number) => void;
}
const recipeDataContext = createContext<RecipeContextType | undefined>(
  undefined,
);
function RecipeDataContext({ children }: props) {
  const session = useSession();
  const userId = session.data?.user?.id;
  const { likedRecipes, toggleLike } = useLikedRecipes(Number(userId));
  const { savedRecipes, toggleSave } = useSavedRecipes(Number(userId));
  // this will mutate data , update values

  return (
    <recipeDataContext.Provider
      value={{ likedRecipes, toggleLike, toggleSave, savedRecipes }}
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
