"use client";
import { useUserShoppingList } from "../../../_hooks/useUserShoppingList";
import ShoppingListRow from "../shopping/ShoppingListRow";

function IngredientList() {
  const { data: ingredientData } = useUserShoppingList();
  return (
    <div className="h-[calc(100vh-190px)] min-h-0 items-start gap-4 overflow-x-hidden p-3">
      {ingredientData && ingredientData.length === 0 && (
        <div className="flex h-full items-center justify-center border-t text-xl">
          No shopping List yet
        </div>
      )}
      {ingredientData && ingredientData.length > 0 && (
        <div className="rounded-md bg-natural-beige p-4 h-full grid grid-rows-[auto_1fr_auto]" role="table">
          <div
            role="rowheader"
            className="hidden w-full grid-cols-[0.3fr_0.4fr_1.4fr_1fr_0.4fr_1fr_0.2fr] items-center gap-4 rounded border-b border-b-accent p-2 sm:grid"
          >
            <p>No.</p>
            <p>Image</p>
            <p>Name</p>
            <p>Amount</p>
            <p>consistency</p>
            <p className="hidden md:block">Added date</p>
            <div className="flex justify-end gap-4">Actions</div>
          </div>
          <div role="row" className="overflow-y-auto">
            {ingredientData.map((item, i) => (
              <ShoppingListRow data={item} index={i} key={item.id} />
            ))}
          </div>
          <div
            role="row"
            className="flex w-full items-center justify-end gap-4 border-t border-t-accent p-2"
          >
            <p className="rounded-full bg-blue-400 px-2 text-black">
              Total {ingredientData.length} Ingredients
            </p>
            <p className="rounded-full bg-red-400 px-2 text-black">
              {
                ingredientData.filter((item) => item.isPurchased === false)
                  .length
              }{" "}
              Pending
            </p>
            <p className="rounded-full bg-green-400 px-2 text-black">
              {
                ingredientData.filter((item) => item.isPurchased === true)
                  .length
              }{" "}
              checked
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default IngredientList;
