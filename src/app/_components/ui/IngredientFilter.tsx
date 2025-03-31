import { IngredientListTags } from "@/app/types/RecipeTypes";
import IngredientFilterCard from "./IngredientFilterCard";
interface props {
  ingredientList: IngredientListTags[];
}
function IngredientFilter({ ingredientList }: props) {

  return (
    <>
      {ingredientList.map((item) => (
        <IngredientFilterCard
          item={item}
          key={item.type}
        />
      ))}
    </>
  );
}

export default IngredientFilter;
