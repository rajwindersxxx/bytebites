import { useQueryClient } from "@tanstack/react-query";

import ShoppingIngredientsList from "./ShoppingIngredientsList";
import ShoppingRecipeList from "./ShoppingRecipeList";


import { HiOutlineTrash } from "react-icons/hi";
import { useUserShoppingList } from "@/app/_hooks/useUserShoppingList";
import { useModal } from "../../ui/Modal";
import { useShoppingData } from "@/app/context/ShoppingListContext";
import ConfirmationModal from "../../forms/ConfirmationModal";
import { UserShoppingList } from "@/app/types/RecipeTypes";
import { IconButton, PrimaryButton, SecondaryButton } from "../../ui/Buttons";
function ShoppingListPreview() {
  const { recipeInCart, ingredientCart, clearLocalStorageCart } =
    useShoppingData();
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
    <div className="">
      <h2 className="p-2 text-center text-2xl capitalize">Make a list</h2>
      {recipeInCart.length === 0 && ingredientCart.length == 0 && (
        <div className="mt-2 flex  h-[calc(100vh-11.25rem)] items-center justify-center text-xl">
          <h3>start adding recipes</h3>
        </div>
      )}
      {(recipeInCart.length > 0 || ingredientCart.length > 0) && (
        <>
          <div className="flex  h-[calc(100vh-11.25rem)] flex-col gap-4 overflow-y-auto overflow-x-hidden pr-4">
            <ShoppingRecipeList recipeInCart={recipeInCart} />
            <ShoppingIngredientsList ingredientCart={ingredientCart} />
          </div>
          <div className="flex h-[50px] items-center justify-between gap-4 pt-4 pr-4">
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
            <IconButton onClick={clearLocalStorageCart}>
              <HiOutlineTrash />
            </IconButton>
          </div>
        </>
      )}
    </div>
  );
}
export default ShoppingListPreview;
