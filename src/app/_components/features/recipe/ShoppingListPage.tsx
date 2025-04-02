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
    <div className="grid h-[92%] px-8 py-4 lg:grid-cols-[23.25rem_15.31rem_1fr] md:grid-cols-[23.25rem__1fr] gap-4  ml-9">
      <div className="h-full md:block hidden">
        <h1 className="p-2 text-center text-2xl ">Bookmarked recipes</h1>
        <BookmarksList detailLink="/shopping" />
      </div>
      <div className="lg:block hidden">
        <h2 className="p-2 text-center text-2xl">
          Ingredients list
        </h2>
        {savedIngredients?.length === 0 && (
          <div className="flex h-[calc(100vh-8.125rem)] items-center justify-center border-r text-xl">
            No recipe selected
          </div>
        )}
        {savedIngredients?.length > 0 && (
          <div className="flex h-[calc(100vh-8.125rem)] flex-col gap-4 overflow-y-auto overflow-x-hidden [&_.IngredientCard]:w-56 [&_.IngredientCard]:p-2 [&_.IngredientImage]:h-12 [&_.IngredientImage]:w-12 [&_h2]:mb-4 [&_h2]:text-[18px] [&_h4]:text-sm [&_p]:text-sm py-3">
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
