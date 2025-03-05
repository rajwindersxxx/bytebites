"use client";
import React from "react";
import { ImageElement } from "./ImageElement";
import RecipeCardButtons from "./RecipeCardButtons";
import { useRouter } from "next/navigation";
import { RecipeObject } from "../types/RecipeTypes";
interface props {
  data: RecipeObject;
  baseUrlImage?: string;
  detailsLink?: string;
  visibleButtons?: string[];
}
export default function RecipeCard({
  data,
  baseUrlImage,
  detailsLink,
  visibleButtons = ["cart", "like", "saved", "meal"],
}: props) {
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
  } = data;
  const router = useRouter();
  const link = detailsLink ? detailsLink : `/recipeDetail?recipeId=${id}`;
  function handleRoute() {
    if (detailsLink) router.replace(link);
    else router.push(link);
  }
  const isDragging = false;
  return (
    <div
      onClick={handleRoute}
      className={`card relative grid w-[28rem] shrink-0 cursor-pointer grid-cols-[1fr_1.7fr] overflow-hidden rounded-md bg-natural-beige hover:scale-105 hover:shadow-md ${isDragging ? "" : "transition-all"}`}
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
      <div className="cardDetails flex flex-col gap-2 p-4">
        <a
          className="title cursor-pointer font-bold transition-all hover:underline active:text-primary"
          onClick={(e) => {
            router.push(`/recipeDetail?recipeId?${id}`)
            e.stopPropagation();
          }}
        >
          {title.slice(0, 25)}
          {title.length > 25 && " ..."}
        </a>
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
          <RecipeCardButtons
            recipeId={id}
            recipeData={data}
            visibleButtons={visibleButtons}
          />
        </div>
      </div>
    </div>
  );
}
