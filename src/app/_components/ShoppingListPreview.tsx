import { useShoppingData } from "../context/ShoppingListContext";
import ShoppingIngredientsList from "./ShoppingIngredientsList";
import ShoppingRecipeList from "./ShoppingRecipeList";
function ShoppingListPreview() {
  const { recipeInCart, ingredientCart } = useShoppingData();
  return (
    <div className="h-full">
      <h2 className="text-center text-xl capitalize">Shopping list</h2>
      {recipeInCart.length === 0 && ingredientCart.length == 0 && (
        <div className="mt-2 flex h-full items-center justify-center border-t text-xl">
          <h3>start adding recipes</h3>
        </div>
      )}
      <div className="flex h-[calc(100vh-250px)] flex-col gap-4 overflow-y-auto overflow-x-hidden pr-4">
        {recipeInCart.length !== 0 && (
          <ShoppingRecipeList recipeInCart={recipeInCart} />
        )}
      {ingredientCart.length !== 0 && (
        <ShoppingIngredientsList ingredientCart={ingredientCart} />
      )}
      </div>
    </div>
  );
}

export default ShoppingListPreview;
