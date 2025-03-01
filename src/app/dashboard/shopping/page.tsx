'use client'
import BookmarksList from "@/app/_components/BookmarksList";
export default function ShoppingListPage() {
  return (
    <div className="grid h-full grid-cols-[0.74fr_0.74fr_1fr] gap-4">
      <div>
        <h2 className="capitalize text-xl text-center">bookmark Recipes</h2>
        <BookmarksList />
      </div>
      <div className="h-[95%]">
        <h2 className="capitalize text-xl text-center">Drag recipe here</h2>
        <div className="border h-full"></div>
      </div>
    </div>
  );
}
