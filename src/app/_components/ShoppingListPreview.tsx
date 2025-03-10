import { useQueryClient } from "@tanstack/react-query";
import { useShoppingData } from "../context/ShoppingListContext";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import ShoppingIngredientsList from "./ShoppingIngredientsList";
import ShoppingRecipeList from "./ShoppingRecipeList";

import MiniSpinner from "./MiniSpinner";
import { useUserShoppingList } from "../_hooks/useUserShoppingList";
import { UserShoppingList } from "../types/RecipeTypes";
function ShoppingListPreview() {
  useUserShoppingList();
  const { recipeInCart, ingredientCart } = useShoppingData();
  const QueryClient = useQueryClient();
  const { createShoppingList ,isCreating } = useUserShoppingList();
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
  function createNewList(){
    createShoppingList()
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
          <div className="flex h-[50px] items-center justify-center gap-4 pt-4">
            <SecondaryButton className="w-48" onClick={updateExistingList}>
              {isCreating ? <MiniSpinner /> : "Updating Existing List"}
            </SecondaryButton>
            <PrimaryButton className="w-48" onClick={createNewList}>
              {isCreating ? <MiniSpinner /> : "Generate Shopping List"}
            </PrimaryButton>
          </div>
        </>
      )}
    </div>
  );
}
export default ShoppingListPreview;
