import React from "react";
import { INGREDIENT_IMAGE_URL } from "../_config/foodApiConfig";
import { ImageElement } from "./ImageElement";
interface Ingredient {
  name: string;
  image: string;
  consistency: string;
  amount: number;
  measures: {
    metric: {
      unitShort: string;
    };
  };
}

interface props {
  ingredient: Ingredient;
}

export default function IngredientCard({ ingredient }: props) {
  const { name, image, consistency, amount, measures } = ingredient;
  return (
    <div className="item-center flex w-80 gap-4 rounded-md bg-natural-beige p-4">
      <div className="relative h-20 w-20 overflow-hidden rounded-full">
        <ImageElement src={`${INGREDIENT_IMAGE_URL}/${image}`} alt={name} />
      </div>
      <div>
        <h4 className="text-xl font-bold capitalize">
          {" "}
          {name.length > 15 ? `${name.slice(0, 15)}...` : name}{" "}
        </h4>
        <p>
          Amount: <span className="font-bold">{amount} </span>
          {measures.metric.unitShort}
        </p>
        <p>
          consistency:{" "}
          <span className="font-bold">
            {consistency === "SOLID" ? "🧊" : "💧"}{" "}
          </span>
        </p>
      </div>
    </div>
  );
}

