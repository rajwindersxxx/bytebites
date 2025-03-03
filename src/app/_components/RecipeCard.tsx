"use client";
import React from "react";
import { ImageElement } from "./ImageElement";
import RecipeCardButtons from "./RecipeCardButtons";
import { useRouter } from "next/navigation";
interface props {
  data: RecipeData;
  baseUrlImage?: string;
  detailsLink?: string;
}
interface RecipeData {
  image: string;
  title: string;
  readyInMinutes?: number;
  id: number;
  servings: number;
  vegetarian?: boolean;
  pricePerServing?: number;
  veryPopular?: boolean;
  extendedIngredients: {
    id: number;
    amount: number;
    measures: { us: { amount: number }; metric: { amount: number } };
  }[];
  baseUrlImage?: string;
  usedIngredientCount?: number;
  missedIngredientCount?: number;
  missedIngredients?: { name: string }[];
}

export default function RecipeCard({ data, baseUrlImage, detailsLink }: props) {
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
  const isDragging = false
  return (
    <div
      onClick={handleRoute}
      className={`card grid w-[28rem] shrink-0 cursor-pointer grid-cols-[1fr_1.7fr] overflow-hidden rounded-md bg-natural-beige hover:scale-105 hover:shadow-md relative ${isDragging? '': 'transition-all' }`}
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
        <h3 className="title font-bold">
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
          <RecipeCardButtons recipeId={id} recipeData={data}/>
        </div>
      </div>
    </div>
  );
}
