import { useUserShoppingList } from "@/app/_hooks/useUserShoppingList";
import { INGREDIENT_IMAGE_URL } from "../../_config/foodApiConfig";
import { UserShoppingList } from "../../_types/RecipeTypes";
import { ImageElement } from "./ImageElement";
import { useState } from "react";
interface props {
  ingredientObject: UserShoppingList;
}
function PendingCardListItem({ ingredientObject }: props) {
  const { updateShoppingStatus } = useUserShoppingList();
  const [isPending, setIsPending] = useState(false);
  const { id, name, amount, unit, image } = ingredientObject;
  function updateStatus() {
    setIsPending(true);
    updateShoppingStatus(
      {
        ingredientId: Number(id),
        purchasedStatus: true,
      },
      { onSuccess: () => setIsPending(false) },
    );
  }
  return (
    <li className="grid grid-cols-[auto_1fr_0.6fr_auto] items-center gap-2 rounded-full bg-natural-cream p-1">
      <div className="relative h-7 w-7 overflow-hidden rounded-full">
        <ImageElement src={`${INGREDIENT_IMAGE_URL}/${image}`} alt="image" />
      </div>
      <p>{name.length < 20 ? name : `${name.slice(0, 20)}...`}</p>
      <p>
        {Math.round(amount * 1000) / 1000} {unit.slice(0, 8)}
      </p>
      <button
        className="h-7 w-7 rounded-full transition-colors hover:bg-accent disabled:bg-gray-400"
        onClick={updateStatus}
        disabled={isPending}
      >
        ✔
      </button>
    </li>
  );
}

export default PendingCardListItem;
