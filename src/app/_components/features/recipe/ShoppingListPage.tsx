// todo: currently not responsive yet
"use client";
import IngredientCard from "@/app/_components/ui/IngredientCard";
import { useSavedIngredients } from "@/app/_hooks/useSavedIngredients";
import { uniqueId } from "lodash";
import BookmarksList from "../bookmarks/BookmarksList";
import ShoppingListPreview from "../shopping/ShoppingListPreview";
export default function ShoppingListPage() {
  const { savedIngredients = [] } = useSavedIngredients();
  return (
    <div className="ml-9 grid h-[92%] gap-4 px-8 py-4 md:grid-cols-[23.25rem__1fr] lg:grid-cols-[23.25rem_15.31rem_1fr]">
      <div className="hidden h-full md:block">
        <h1 className="p-2 text-center text-2xl">Bookmarked recipes</h1>
        <BookmarksList detailLink="/shopping" />
      </div>
      <div className="hidden lg:block">
        <h2 className="p-2 text-center text-2xl">Ingredients list</h2>
        {savedIngredients?.length === 0 && (
          <div className="flex h-[calc(100vh-8.125rem)] items-center justify-center border-r text-xl">
            No recipe selected
          </div>
        )}
        {savedIngredients?.length > 0 && (
          <div className="flex h-[calc(100vh-8.125rem)] flex-col gap-4 overflow-y-auto overflow-x-hidden py-3 [&_.IngredientCard]:w-56 [&_.IngredientCard]:p-2 [&_.IngredientImage]:h-12 [&_.IngredientImage]:w-12 [&_h2]:mb-4 [&_h2]:text-[18px] [&_h4]:text-sm [&_p]:text-sm">
            {savedIngredients?.map((ingredient) => (
              <IngredientCard ingredient={ingredient} key={uniqueId()} />
            ))}
          </div>
        )}
      </div>
      <ShoppingListPreview />
    </div>
  );
}
