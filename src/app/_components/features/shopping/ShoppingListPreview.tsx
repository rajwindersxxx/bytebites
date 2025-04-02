import ShoppingIngredientsList from "./ShoppingIngredientsList";
import ShoppingRecipeList from "./ShoppingRecipeList";
import { HiOutlineTrash } from "react-icons/hi";
import { useUserShoppingList } from "@/app/_hooks/useUserShoppingList";
import { useModal } from "../../ui/Modal";
import { useShoppingData } from "@/app/context/ShoppingListContext";
import ConfirmationModal from "../../forms/ConfirmationModal";
import { IconButton, SecondaryButton } from "../../ui/Buttons";
function ShoppingListPreview() {
  const { recipeInCart, ingredientCart, clearLocalStorageCart } =
    useShoppingData();
  const { createShoppingList } = useUserShoppingList();
  const { openModal } = useModal();

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
        <div className="mt-2 flex h-[calc(100vh-11.25rem)] items-center justify-center text-xl">
          <h3>start adding recipes</h3>
        </div>
      )}
      {(recipeInCart.length > 0 || ingredientCart.length > 0) && (
        <>
          <div className="flex h-[calc(100vh-11.25rem)] flex-col gap-4 overflow-y-auto overflow-x-hidden pr-4">
            <ShoppingRecipeList recipeInCart={recipeInCart} />
            <ShoppingIngredientsList ingredientCart={ingredientCart} />
          </div>
          <div className="flex h-[50px] items-center justify-between gap-4 pr-4 pt-4">
            <div className="flex gap-4">
              <SecondaryButton
                className="w-52"
                onClick={confirmRemoveExistingList}
              >
                Make New Shopping List
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
