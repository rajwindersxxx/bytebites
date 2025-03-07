import React from "react";
import IngredientCard from "./IngredientCard";
import { ExtendedIngredients } from "../types/RecipeTypes";
interface props {
  extendedIngredients: ExtendedIngredients[];
}
export default function Ingredients({ extendedIngredients }: props) {
  return (
    <div className="col-span-3">
      <h2 className="detailHeading mb-8 text-2xl">🍳 Ingredients </h2>
      <div className="ingredientsList my-4 grid grid-cols-responsiveGrid2 place-items-center gap-4 bg-natural-cream">
        {extendedIngredients.map((ingredient) => (
          <IngredientCard
            ingredient={ingredient}
            key={ingredient.id + ingredient.amount}
          />
        ))}
      </div>
    </div>
  );
}
