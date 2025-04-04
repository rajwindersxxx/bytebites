"use client";
import IngredientRequiredItem from "./IngredientRequiredItem";
import useRequiredIngredients from "@/app/_hooks/useRequiredIngredients";

function RequiredIngredientCard() {
  const {requiredIngredientsList} =  useRequiredIngredients();

  return (
    <div className="col-span-1 rounded-md bg-indigo-400 p-4 dark:bg-indigo-900 flex-1">
      <h2 className="mb-4 text-xl uppercase">Ingredient Required</h2>
      {requiredIngredientsList && requiredIngredientsList.length < 1 && (
        <div className="flex h-44 items-center justify-center">
          No Upcoming meals
        </div>
      )}
      {requiredIngredientsList && requiredIngredientsList.length > 0 && (
        <div className="flex max-h-52 flex-col gap-2 overflow-y-auto">
          {requiredIngredientsList.map((item, index) => (
            <IngredientRequiredItem recipeObject={item} key={item.id+index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default RequiredIngredientCard;

