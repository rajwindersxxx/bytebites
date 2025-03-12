"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useUserShoppingList } from "../_hooks/useUserShoppingList";
import PendingCardListItem from "./PendingCardListItem";
import { UserShoppingList } from "../types/RecipeTypes";
import { uniqueId } from "lodash";
function CartCard() {
  const { updateShoppingStatus } = useUserShoppingList();
  const queryClient = useQueryClient();
  const data: UserShoppingList[] | undefined = queryClient.getQueryData([
    "userShoppingList",
  ]);
  const filterData = data?.filter((item) => item.isPurchased === false);
  return (
    <div className="col-span-1 rounded-md bg-natural-beige p-4">
      <h2 className="pb-4 text-xl uppercase"> Pending Cart Items</h2>
      <ul className="flex max-h-52 flex-col gap-2 overflow-x-auto">
        {filterData && filterData.length < 1 && (
          <div className="flex h-44 justify-center items-center">
           No items in Cart
          </div>
        )}

        {filterData &&
          filterData.length > 1 &&
          filterData.map((item) => (
            <PendingCardListItem
              ingredientObject={item}
              key={uniqueId()}
              updateFunction={updateShoppingStatus}
            />
          ))}
      </ul>
    </div>
  );
}

export default CartCard;
