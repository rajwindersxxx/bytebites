import { useQueryClient } from "@tanstack/react-query";
import { useShoppingData } from "../context/ShoppingListContext";
import { IconButton, PrimaryButton, SecondaryButton } from "./Buttons";
import ShoppingIngredientsList from "./ShoppingIngredientsList";
import ShoppingRecipeList from "./ShoppingRecipeList";

import { useUserShoppingList } from "../_hooks/useUserShoppingList";
import { UserShoppingList } from "../types/RecipeTypes";
import { useModal } from "./Modal";
import ConfirmationModal from "./ConfirmationModal";
import { HiOutlineTrash } from "react-icons/hi";
function ShoppingListPreview() {
  const { recipeInCart, ingredientCart, clearLocalStorageCart } = useShoppingData();
  const QueryClient = useQueryClient();
  const { createShoppingList } = useUserShoppingList();
  const { openModal } = useModal();
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
  function confirmRemoveExistingList() {
    openModal(
      <ConfirmationModal
        callback={createShoppingList}
        message="This will remove exiting shopping List "
      />,
      "confirm_update",
    );
  }
  return (
    <div className="h-full">
      <h2 className="pb-2 text-center text-xl capitalize">Make a list</h2>
      {recipeInCart.length === 0 && ingredientCart.length == 0 && (
        <div className="mt-2 flex h-full items-center justify-center text-xl">
          <h3>start adding recipes</h3>
        </div>
      )}
      {(recipeInCart.length > 0 || ingredientCart.length > 0) && (
        <>
          <div className="flex h-[calc(100vh-300px)] flex-col gap-4 overflow-y-auto overflow-x-hidden pr-4">
            <ShoppingRecipeList recipeInCart={recipeInCart} />
            <ShoppingIngredientsList ingredientCart={ingredientCart} />
          </div>
          <div className="flex h-[50px] items-center justify-between gap-4 pt-4 px-4">
            <div className="flex gap-4">
              <PrimaryButton className="w-48" onClick={updateExistingList}>
                Updating Shopping List
              </PrimaryButton>
              <SecondaryButton
                className="w-48"
                onClick={confirmRemoveExistingList}
              >
                Make Shopping List
              </SecondaryButton>
            </div>
            <IconButton  onClick={clearLocalStorageCart}>
              <HiOutlineTrash/>
            </IconButton>
          </div>
        </>
      )}
    </div>
  );
}
export default ShoppingListPreview;
