import React from "react";
import IngredientCard from "./IngredientCard";
import { ExtendedIngredients } from "../../types/RecipeTypes";
import { uniqueId } from "lodash";
interface props {
  extendedIngredients: ExtendedIngredients[];
}
export default function Ingredients({ extendedIngredients }: props) {
  return (
    <div className="">
      <h2 className="detailHeading mb-8 text-2xl">🍳 Ingredients </h2>
      <div className="ingredientsList  grid grid-cols-responsiveGrid2 place-items-center gap-4 bg-natural-cream">
        {extendedIngredients.map((ingredient) => (
          <IngredientCard ingredient={ingredient} key={uniqueId()} />
        ))}
      </div>
    </div>
  );
}
