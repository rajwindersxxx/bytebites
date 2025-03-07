import { HiMinus, HiOutlinePlusSm, HiOutlineTrash } from "react-icons/hi";
import { ImageElement } from "./ImageElement";
import { INGREDIENT_IMAGE_URL } from "../_config/foodApiConfig";
import { useShoppingData } from "../context/ShoppingListContext";
import { ExtendedIngredients } from "../types/RecipeTypes";
import { uniqueId } from "lodash";

interface props {
  ingredientCart: ExtendedIngredients[];
}

function ShoppingIngredientsList({ ingredientCart }: props) {
  const { removeIngredientFromCart, addIngredientToCart } = useShoppingData();
  return (
    <>
      {ingredientCart.map((ing) => (
        <div
          className="rounded-md bg-natural-beige p-4"
          key={uniqueId()}
        >
          <div className="grid w-full grid-cols-[auto_1.1fr_0.5fr_0.5fr] items-center gap-4 rounded border-b border-b-red-500 p-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full">
              <ImageElement
                src={INGREDIENT_IMAGE_URL + "/" + ing.image}
                alt={ing.name}
              />
            </div>
            <p>{ing.name}</p>
            <p>
              {ing.amount} {ing.unit}
            </p>
            <div className="flex justify-end gap-4">
              <button>
                <HiMinus
                  onClick={() => addIngredientToCart(ing, "decrease")}
                  className="h-4 w-4"
                />
              </button>
              <button onClick={() => addIngredientToCart(ing, "increase")}>
                <HiOutlinePlusSm className="h-4 w-4" />
              </button>
              <button onClick={() => removeIngredientFromCart(ing.id)}>
                <HiOutlineTrash className="h-4 w-4 stroke-red-500" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ShoppingIngredientsList;
