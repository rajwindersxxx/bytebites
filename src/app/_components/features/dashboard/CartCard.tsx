"use client";
import PendingCardListItem from "../../ui/PendingCardListItem";
import { useUserShoppingList } from "@/app/_hooks/useUserShoppingList";

function CartCard() {
  const { userShoppingList } = useUserShoppingList();

  const filterData = userShoppingList?.filter(
    (item) => item.isPurchased === false,
  );
  return (
    <div className="col-span-1 min-h-[248px] flex-1 rounded-md bg-natural-beige p-4">
      <h2 className="pb-4 text-xl uppercase"> Pending Cart Items</h2>
      <ul className="flex max-h-52 flex-col gap-2 overflow-x-auto">
        {filterData && filterData.length === 0 && (
          <div className="flex h-44 items-center justify-center">
            No items in Cart
          </div>
        )}

        {filterData &&
          filterData.length > 0 &&
          filterData.map((item, i) => (
            <PendingCardListItem
              ingredientObject={item}
              key={`${item.id}${i}`}
            />
          ))}
      </ul>
    </div>
  );
}

export default CartCard;
