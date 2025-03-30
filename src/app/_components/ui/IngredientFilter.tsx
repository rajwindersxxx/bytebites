import { IngredientListTags } from "@/app/types/RecipeTypes";
import IngredientFilterCard from "./IngredientFilterCard";
import { useState } from "react";
interface props {
  ingredientList: IngredientListTags[];
}
function IngredientFilter({ ingredientList }: props) {
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(
    new Set(),
  );
  //* here we can apply filters
  console.log(selectedIngredients);
  const toggleSelection = (ingredient: string) => {
    setSelectedIngredients((prevSelected) => {
      const newSet = new Set(prevSelected);
      if (newSet.has(ingredient)) newSet.delete(ingredient);
      else newSet.add(ingredient);
      return newSet;
    });
  };
  return (
    <>
      {ingredientList.map((item) => (
        <IngredientFilterCard
          item={item}
          key={item.type}
          selectedIngredients={selectedIngredients}
          toggleSelection={toggleSelection}
        />
      ))}
    </>
  );
}

export default IngredientFilter;
