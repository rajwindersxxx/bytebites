"use client";
import React from "react";
import { ImageElement } from "./ImageElement";
import RecipeCardButtons from "./RecipeCardButtons";
import { useRouter } from "next/navigation";
import {  recipeDetails } from "../_data/dataSamples";
import { RecipeObject } from "../types/RecipeTypes";
interface props {
  data: RecipeObject[];
  baseUrlImage?: string;
}
export default function DashboardRecipeCard({  baseUrlImage}: props) {
  const {
    id,
    image,
    title,
    readyInMinutes,
    servings,
    vegetarian,
    pricePerServing,
    veryPopular,
    extendedIngredients,
    missedIngredients,
  } = recipeDetails[0];
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/recipeDetail?recipeId=${id}`)}
      className="grid min-w-[20rem] grid-cols-[1fr_1.7fr] overflow-hidden rounded-md bg-natural-beige transition-all hover:scale-105 hover:shadow-md cursor-pointer"
    >
      <div className="relative h-full">
        {baseUrlImage ? (
          <ImageElement
            src={`${baseUrlImage}/${image}`}
            alt={title}
            className="brightness-75"
          />
        ) : (
          <ImageElement src={image} alt={title} />
        )}
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="font-bold">
          {title.slice(0, 25)}
          {title.length > 25 && " ..."}
        </h3>
        <div className="grid grid-cols-[1fr_0.5fr_1fr] content-center items-center justify-center gap-2">
          {missedIngredients && (
            <p className="col-span-3">
              <span className="font-bold">Require</span>{" "}
              {missedIngredients.map((item) => item.name).join(", ")}{" "}
            </p>
          )}
          {readyInMinutes && <p>⏱️ {readyInMinutes} min </p>}
          {servings && <p>👨‍👩‍👧‍👦 {servings} </p>}
          {pricePerServing && <p>💸 {pricePerServing} $</p>}
          {!baseUrlImage && servings && (
            <p>{vegetarian ? "🍀 veg" : "🥩 non-veg"} </p>
          )}
          <p className="col-start-3">{veryPopular && "🌟 popular"} </p>
          {extendedIngredients && (
            <p className="col-span-2">
              {extendedIngredients.length} Ingredients
            </p>
          )}
          <RecipeCardButtons recipeId={id} />
        </div>
      </div>
    </div>
  );
}
