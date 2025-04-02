import { HiMinus, HiOutlinePlusSm, HiOutlineTrash } from "react-icons/hi";

import { uniqueId } from "lodash";
import { RecipeObject } from "@/app/types/RecipeTypes";
import { useShoppingData } from "@/app/context/ShoppingListContext";
import { ImageElement } from "../../ui/ImageElement";
import { INGREDIENT_IMAGE_URL } from "@/app/_config/foodApiConfig";
interface props {
  recipeInCart: RecipeObject[];
}
function ShoppingRecipeList({ recipeInCart }: props) {
  const { removeRecipeFromCart, addRecipeToCart } = useShoppingData();
  return (
    <>
      {recipeInCart.map((item) => (
        <div className="w-full rounded-md bg-natural-beige p-4" key={item.id}>
          <div className="flex justify-between border-b border-b-primary pb-2">
            <h1 className="text-xl font-semibold">
              📋 {item.title.slice(0, 25)}...
            </h1>
            <div className="flex justify-end gap-4">
              <p className="">🍽️ {item.count}</p>
              <button>
                <HiMinus
                  className="h-4 w-4"
                  onClick={() => addRecipeToCart(item, "decrease")}
                />
              </button>
              <button onClick={() => addRecipeToCart(item)}>
                <HiOutlinePlusSm className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex w-full flex-col gap-1">
            {item.extendedIngredients.map((ing) => (
              <div
                className="grid grid-cols-[auto_1.1fr_0.5fr_0.5fr] items-center gap-4 rounded border-b border-b-red-500 p-2"
                key={uniqueId()}
              >
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
                {/* <div className="flex justify-end gap-4">
                  <button className="flex items-center gap-1">
                    <label htmlFor={`have${ing.id}`}>Have</label>
                    <input
                      type="checkbox"
                      name={`have${ing.id}`}
                      id={`have${ing.id}`}
                    />
                  </button>
                </div> */}
              </div>
            ))}
          </div>
          <div className="flex justify-between px-2 pt-4">
            <div className="flex items-center gap-4">
              {item.vegetarian !== undefined && (
                <p>{item.vegetarian ? "🍀 veg" : "🥩 non-veg"} </p>
              )}
              <p className="">👨‍👩‍👧‍👦 {item.servings}</p>
              <p className="">⏱️ {item.readyInMinutes}min</p>
            </div>
            <div className="flex gap-4">
              <p>🍳 {item.extendedIngredients.length} Ingredients</p>
              <button onClick={() => removeRecipeFromCart(item.id)}>
                <HiOutlineTrash className="h-4 w-4 stroke-red-600" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ShoppingRecipeList;
