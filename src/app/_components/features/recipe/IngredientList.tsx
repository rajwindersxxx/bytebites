"use client";
import { useUserShoppingList } from "../../../_hooks/useUserShoppingList";
import ShoppingListRow from "../shopping/ShoppingListRow";

function IngredientList() {
  const { data: ingredientData } = useUserShoppingList();
  return (
    <>
      {ingredientData && ingredientData.length === 0 && (
        <div className="flex h-full items-center justify-center border-t text-xl">
          No shopping List yet
        </div>
      )}
      {ingredientData && ingredientData.length > 0 && (
        <div className="rounded-md bg-natural-beige p-4" role="table">
          <div
            role="rowheader"
            className="grid w-full grid-cols-[0.3fr_0.4fr_1.4fr_1fr_0.4fr_1fr_0.2fr] items-center gap-4 rounded border-b border-b-accent p-2"
          >
            <p>Count</p>
            <p>Image</p>
            <p>Name</p>
            <p>Amount</p>
            <p>consistency</p>
            <p>Added date</p>
            <div className="flex justify-end gap-4">Actions</div>
          </div>
          <div role="row">
            {ingredientData.map((item, i) => (
              <ShoppingListRow data={item} index={i} key={item.id} />
            ))}
          </div>
          <div
            role="row"
            className="flex w-full items-center justify-between gap-4 border-t border-t-accent p-2"
          >
            <div>Total {ingredientData.length} Ingredients</div>
            <div>
              Ingredient{" "}
              {
                ingredientData.filter((item) => item.isPurchased === false)
                  .length
              }
              Purchased
            </div>
            <div>
              Ingredient{" "}
              {
                ingredientData.filter((item) => item.isPurchased === true)
                  .length
              }{" "}
              left
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default IngredientList;
