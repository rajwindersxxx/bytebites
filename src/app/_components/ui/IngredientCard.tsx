import React, { memo } from "react";
import { INGREDIENT_IMAGE_URL } from "../../_config/foodApiConfig";
import { ImageElement } from "./ImageElement";
import IngredientCartButtons from "./IngredientCartButtons";
import { ExtendedIngredients } from "../../_types/RecipeTypes";
import { textToEmoji } from "../../_helper/clientheper";

interface props {
  ingredient: ExtendedIngredients;
}

const IngredientCard = memo(function IngredientCard({ ingredient }: props) {
  const { name, image, consistency, amount, unit } = ingredient;
  return (
    <div className="item-center IngredientCard relative grid w-full grid-cols-[auto_1fr] gap-4 rounded-md bg-natural-beige p-4">
      <div className="IngredientImage relative h-20 w-20 overflow-hidden rounded-full">
        <ImageElement src={`${INGREDIENT_IMAGE_URL}/${image}`} alt={name} />
      </div>
      <div className="">
        <h4 className="text-xl font-bold capitalize">
          {name.length > 15 ? `${name.slice(0, 15)}...` : name}{" "}
        </h4>
        <p>
          Amount:{" "}
          <span className="font-bold">{Math.round(amount * 1000) / 1000} </span>
          {unit}
        </p>
        <div className="flex justify-between">
          <p>
            consistency:{" "}
            <span className="font-bold">{textToEmoji(consistency)}</span>
          </p>
          <IngredientCartButtons ingredient={ingredient} />
        </div>
      </div>
    </div>
  );
});
export default IngredientCard;
