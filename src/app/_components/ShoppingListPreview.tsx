import { useMutation } from "@tanstack/react-query";
import { useShoppingData } from "../context/ShoppingListContext";
import { SecondaryButton } from "./Buttons";
import ShoppingIngredientsList from "./ShoppingIngredientsList";
import ShoppingRecipeList from "./ShoppingRecipeList";
import toast from "react-hot-toast";
import { makeAShoppingList } from "../_actions/action";
import { useSession } from "next-auth/react";
import MiniSpinner from "./MiniSpinner";
function ShoppingListPreview() {
  const { recipeInCart, ingredientCart, clearLocalStorageCart } = useShoppingData();
  const session = useSession();
  const userId = session.data?.user?.id
  const { mutate: createShoppingList, isPending } = useMutation({
    mutationFn: () => makeAShoppingList(recipeInCart, ingredientCart, Number(userId)),
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success('Shopping List created successfully');
      clearLocalStorageCart();
    }
  });
  return (
    <div className="h-full">
      <h2 className="text-center text-xl capitalize">Make a  list</h2>
      {recipeInCart.length === 0 && ingredientCart.length == 0 && (
        <div className="mt-2 h-[calc(100vh-200px)]  flex  items-center justify-center border-t text-xl">
          <h3>start adding recipes</h3>
        </div>
      )}
      <div className="flex h-[calc(100vh-300px)] flex-col gap-4 overflow-y-auto overflow-x-hidden pr-4">
        {recipeInCart.length !== 0 && (
          <ShoppingRecipeList recipeInCart={recipeInCart} />
        )}
        {ingredientCart.length !== 0 && (
          <ShoppingIngredientsList ingredientCart={ingredientCart} />
        )}
      </div>
      <div className="flex h-[50px] items-center justify-center pt-4">
        <SecondaryButton onClick={createShoppingList}>
        {isPending ? <MiniSpinner/> : "Generate Shopping List"}

        </SecondaryButton>
      </div>
    </div>
  );
}

export default ShoppingListPreview;
