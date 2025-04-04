import { memo, useState } from "react";
import useRequiredIngredients from "../_hooks/useRequiredIngredients";
import { useUserShoppingList } from "../_hooks/useUserShoppingList";
import { ExtendedIngredients } from "../types/RecipeTypes";

interface props {
  item: ExtendedIngredients;
}
const RequiredIngredientRow = memo(function RequiredIngredientRow({
  item,
}: props) {
  const { uniqueIngredientId, ...recipeData } = item;
  const { addIngredientToCart, userShoppingList } = useUserShoppingList();
  const { removeUpcomingIngredient } = useRequiredIngredients();
  const [isPending, setIsPending] = useState(false);
  function handleAddToCart() {
    setIsPending(true);
    if (userShoppingList) {
      addIngredientToCart(
        {
          storedList: userShoppingList,
          ingredientCart: [recipeData],
        },
        {
          onSuccess: () => setIsPending(false),
        },
      );
    }
    if (uniqueIngredientId)
      removeUpcomingIngredient(uniqueIngredientId, {
        onSuccess: () => setIsPending(false),
      });
  }
  function handleRemoveIngredient() {
    setIsPending(true);
    if (uniqueIngredientId)
      removeUpcomingIngredient(uniqueIngredientId, {
        onSuccess: () => setIsPending(false),
      });
  }
  return (
    <li className="grid grid-cols-[1fr_0.6fr_auto] items-center p-1">
      <p>
        {item.name.length < 12 ? item.name : `${item.name.slice(0, 12)}...`}
      </p>
      <p>
        {+item.amount.toFixed(2)} {item.unit.slice(0, 8)}
      </p>
      <div>
        <button
          className="h-7 w-7 rounded-full transition-colors hover:bg-accent disabled:bg-gray-400"
          disabled={isPending}
          onClick={handleRemoveIngredient}
        >
          ✔
        </button>
        <button
          disabled={isPending}
          className="h-7 w-7 rounded-full transition-colors hover:bg-accent disabled:bg-gray-400"
          onClick={handleAddToCart}
        >
          &#43;
        </button>
      </div>
    </li>
  );
});

export default RequiredIngredientRow;
