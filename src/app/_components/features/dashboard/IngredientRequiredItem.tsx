import { uniqueId } from "lodash";
import {
  ExtendedIngredients,
  UserShoppingList,
} from "../../../types/RecipeTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeUpcomingIngredientItem } from "@/app/_servers/supabase/mealPlanning";
import { useSession } from "next-auth/react";
import { useUserShoppingList } from "../../../_hooks/useUserShoppingList";

interface props {
  recipeObject: { title: string; extendedIngredients: ExtendedIngredients[] };
}
function IngredientRequiredItem({ recipeObject }: props) {
  const { title, extendedIngredients } = recipeObject;
  const session = useSession();
  const userId = session.data?.user?.id;
  const queryclient = useQueryClient();
  const { addIngredientToCart } = useUserShoppingList();
  const { mutate: removeUpcomingIngredient } = useMutation({
    mutationFn: (id: number) => {
      if (userId) {
        return removeUpcomingIngredientItem(id, Number(userId));
      } else {
        throw new Error("userId undefined ");
      }
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["upComingIngredients"] });
    },
  });
  function handleAddToCart(ingredientObject: ExtendedIngredients) {
    const { uniqueIngredientId, ...recipeData } = ingredientObject;
    const existingList = queryclient.getQueryData<UserShoppingList[]>([
      "userShoppingList",
    ]);
    if (existingList) {
      addIngredientToCart({
        storedList: existingList,
        ingredientCart: [recipeData],
      });
    }
    if (uniqueIngredientId) removeUpcomingIngredient(uniqueIngredientId);
  }
  return (
    <div className="rounded-md bg-indigo-200 p-1 dark:bg-indigo-600">
      <h3 className="border-b">{title.slice(0, 30)}</h3>
      <ul>
        {extendedIngredients.map((item) => (
          <li
            className="grid grid-cols-[1fr_0.6fr_auto] items-center p-1"
            key={uniqueId()}
          >
            <p>
              {item.name.length < 12
                ? item.name
                : `${item.name.slice(0, 12)}...`}
            </p>
            <p>
              {+item.amount.toFixed(2)} {item.unit.slice(0, 8)}
            </p>
            <div>
              <button
                className="h-7 w-7 rounded-full transition-colors hover:bg-accent"
                onClick={() => removeUpcomingIngredient(item.id)}
              >
                ✔
              </button>
              <button
                className="h-7 w-7 rounded-full transition-colors hover:bg-accent"
                onClick={() => handleAddToCart(item)}
              >
                &#43;
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IngredientRequiredItem;
