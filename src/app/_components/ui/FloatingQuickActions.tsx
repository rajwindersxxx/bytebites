"use client";

import { useShoppingData } from "@/app/context/ShoppingListContext";
import { PrimaryButton } from "./Buttons";
import { useQueryClient } from "@tanstack/react-query";
import { UserShoppingList } from "@/app/types/RecipeTypes";
import { useUserShoppingList } from "@/app/_hooks/useUserShoppingList";

function FloatingQuickActions() {
  const QueryClient = useQueryClient();

  const { recipeInCart, ingredientCart } = useShoppingData();
    const { createShoppingList } = useUserShoppingList();

   function updateExistingList() {
      const exitingList: UserShoppingList[] | undefined =
        QueryClient.getQueryData(["userShoppingList"]);
      if (exitingList) {
        const storedList = exitingList.filter(
          (item) => item.isPurchased === false,
        );
        createShoppingList(storedList);
      }
    }
  return (
    <>
      {(recipeInCart.length > 0 || ingredientCart.length > 0) && (
        <PrimaryButton className="fixed bottom-4 right-4 z-50 w-48" onClick={updateExistingList}>
          update Ingredient cart
        </PrimaryButton>
      )}
    </>
  );
}

export default FloatingQuickActions;
