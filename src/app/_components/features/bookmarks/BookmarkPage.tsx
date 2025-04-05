"use client";
import { useRecipeData } from "@/app/context/RecipeDataContext";
import RecipeShortDetails from "../recipe/RecipeShortDetails";
import BookmarksList from "./BookmarksList";

function BookmarkPage() {
  const { savedRecipeData } = useRecipeData();
  if (savedRecipeData && savedRecipeData?.length < 1)
    return (
      <div className="flex h-[calc(100vh-160px)] items-center justify-center text-xl">
        No Recipe bookmarked yet
      </div>
    );

  return (
    <div className="grid gap-4 px-8 py-4 md:grid-cols-[2fr_23.25rem]">
      <RecipeShortDetails />
      <div>
        <h1 className="p-2 text-center text-2xl">Bookmarked recipes</h1>
        <BookmarksList detailLink="/bookmarks" />
      </div>
    </div>
  );
}

export default BookmarkPage;
