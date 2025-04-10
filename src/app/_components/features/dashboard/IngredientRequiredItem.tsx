import { memo } from "react";
import { ExtendedIngredients } from "../../../_types/RecipeTypes";
import RequiredIngredientRow from "./RequiredIngredientRow";

interface props {
  recipeObject: { title: string; extendedIngredients: ExtendedIngredients[] };
}
const IngredientRequiredItem = memo(function IngredientRequiredItem({
  recipeObject,
}: props) {
  const { title, extendedIngredients } = recipeObject;
  return (
    <div className="rounded-md bg-indigo-200 p-1 dark:bg-indigo-600">
      <h3 className="border-b">{title.slice(0, 30)}</h3>
      <ul>
        {extendedIngredients.map((item, i) => (
          <RequiredIngredientRow key={`${item.id}${i}`} item={item} />
        ))}
      </ul>
    </div>
  );
});

export default IngredientRequiredItem;
