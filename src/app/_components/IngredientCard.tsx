import React from "react";
import { INGREDIENT_IMAGE_URL } from "../_config/foodApiConfig";
import { ImageElement } from "./ImageElement";
import IngredientCartButtons from "./IngredientCartButtons";
interface Ingredient {
  id: number;
  name: string;
  image: string;
  consistency: string;
  amount: number;
  unit: string;
  measures: { us: { amount: number }; metric: { amount: number } };
}

interface props {
  ingredient: Ingredient;
}

export default function IngredientCard({ ingredient }: props) {
  const { name, image, consistency, amount, unit } = ingredient;
  return (
    <div className="item-center grid grid-cols-[auto_1fr] w-80 gap-4 rounded-md bg-natural-beige p-4 IngredientCard relative">
      <div className="relative h-20 w-20 overflow-hidden rounded-full IngredientImage">
        <ImageElement src={`${INGREDIENT_IMAGE_URL}/${image}`} alt={name} />
      </div>
      <div className="">
        <h4 className="text-xl font-bold capitalize">
          {name.length > 15 ? `${name.slice(0, 15)}...` : name}{" "}
        </h4>
        <p>
          Amount: <span className="font-bold">{amount} </span>
          {unit}
        </p>
        <div className="flex justify-between">
          <p>
            consistency:{" "}
            <span className="font-bold">
              {consistency === "SOLID" ? "🧊" : "💧"}{" "}
            </span>
          </p>
            <IngredientCartButtons ingredient={ingredient}/>
        </div>
      </div>
    </div>
  );
}

