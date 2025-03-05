"use client";
import BookmarksList from "@/app/_components/BookmarksList";
import IngredientCard from "@/app/_components/IngredientCard";
import { useSavedIngredients } from "@/app/_hooks/useSavedIngredients";
import ShoppingListPreview from "@/app/_components/ShoppingListPreview";
export default function ShoppingListPage() {
  const { savedIngredients } = useSavedIngredients();
  return (
    <div className="grid h-full grid-cols-[23.25rem_15.31rem_1fr]  gap-4">
      <div className="border-r">
        <h2 className="text-center text-xl capitalize">bookmark Recipes</h2>
        <BookmarksList detailLink="/dashboard/shopping" />
      </div>
      <div className="h-full border-r ">
        <h2 className="text-center text-xl capitalize">Ingredients list</h2>
        <div className="h-[calc(100vh-250px)] overflow-x-hidden flex flex-col gap-4 overflow-y-auto [&_.IngredientCard]:w-56 [&_.IngredientCard]:p-2 [&_.IngredientImage]:h-12 [&_.IngredientImage]:w-12 [&_h2]:mb-4 [&_h2]:text-[18px] [&_h4]:text-sm [&_p]:text-sm">
          {savedIngredients?.map((ingredient) => (
            <IngredientCard
              ingredient={ingredient}
              key={ingredient.id + Math.random()}
            />
          ))}
        </div>
      </div>
      <div>
        <ShoppingListPreview/>
      </div>
    </div>
  );
}
