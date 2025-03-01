"use client";
import BookmarksList from "@/app/_components/BookmarksList";
export default function ShoppingListPage() {

  return (
    <div className="grid h-full grid-cols-[0.74fr_0.74fr_1fr] gap-4">
        <div>
          <h2 className="text-center text-xl capitalize">bookmark Recipes</h2>
          <BookmarksList />
        </div>
        <div className="h-[95%]">
          <h2 className="text-center text-xl capitalize">Drag recipe here</h2>
          <div className="h-full border"></div>
        </div>
    </div>
  );
}
