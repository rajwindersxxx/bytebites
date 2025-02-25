import Link from "next/link";
import React from "react";
import { ImageElement } from "./ImageElement";

interface props {
  data: RecipeData;
  baseUrlImage?: string;
}
interface RecipeData {
  image: string;
  title: string;
  readyInMinutes?: number;
  id: number;
  servings?: number;
  vegetarian?: boolean;
  pricePerServing?: number;
  veryPopular?: boolean;
  extendedIngredients?: unknown[];
  baseUrlImage?: string;
  usedIngredientCount?:number;
  missedIngredientCount?: number;
  missedIngredients?: {name: string}[]
}

export default function RecipeCard({ data, baseUrlImage }: props) {
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

  return (
    <Link
      href={`/recipeDetail?recipeId=${id}`}
      className="grid min-w-[28rem] grid-cols-[1fr_1.7fr] overflow-hidden rounded-md bg-natural-beige transition-all hover:scale-105 hover:shadow-md"
    >
      <div className="relative h-full">
        {baseUrlImage ? (
          <ImageElement
            src={`${baseUrlImage}/${image}`}
            alt={title}
            className="brightness-75"
          />
        ) : (
          <ImageElement
            src={image}
            alt={title}
          />
        )}
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="font-bold">
          {title.slice(0, 25)}
          {title.length > 25 && " ..."}
        </h3>
        <div className="grid grid-cols-[1fr_0.5fr_1fr] content-center items-center justify-center gap-2">
          {missedIngredients && <p className="col-span-3"><span className="font-bold">Require</span> {missedIngredients.map(item => item.name).join(', ')} </p>}
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
          <div className="col-start-3 flex justify-end gap-4">
            <button>❤️ </button>
            <button>👍 </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
