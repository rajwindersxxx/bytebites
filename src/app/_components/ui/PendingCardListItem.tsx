import { INGREDIENT_IMAGE_URL } from "../../_config/foodApiConfig";
import { UserShoppingList } from "../../types/RecipeTypes";
import { ImageElement } from "../ui/ImageElement";
interface props {
  ingredientObject: UserShoppingList;
  updateFunction: (variables: {
    ingredientId: number;
    purchasedStatus: boolean;
  }) => void;
}
function PendingCardListItem({ ingredientObject, updateFunction }: props) {
  const { id, name, amount, unit, image } = ingredientObject;
  return (
    <li className="grid grid-cols-[auto_1fr_0.6fr_auto] items-center gap-2 rounded-full bg-natural-cream p-1">
      <div className="relative h-7 w-7 overflow-hidden rounded-full">
        <ImageElement src={INGREDIENT_IMAGE_URL + "/" + image} alt="image" />
      </div>
      <p>{name.length < 12 ? name : `${name.slice(0, 12)}...`}</p>
      <p>
        {+amount.toFixed(2)} {unit.slice(0, 8)}
      </p>
      <button
        className="h-7 w-7 rounded-full transition-colors hover:bg-accent"
        onClick={() =>
          updateFunction({ ingredientId: Number(id), purchasedStatus: true })
        }
      >
        ✔
      </button>
    </li>
  );
}

export default PendingCardListItem;
