import { useState } from "react";

export function useIngredientFilter() {
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(
    new Set(),
  );
  const toggleSelection = (ingredient: string) => {
    setSelectedIngredients((prevSelected) => {
      const newSet = new Set(prevSelected);
      if (newSet.has(ingredient)) newSet.delete(ingredient);
      else newSet.add(ingredient);
      return newSet;
    });
  };
  return {selectedIngredients, toggleSelection}
}

