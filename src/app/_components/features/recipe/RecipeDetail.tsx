import React from "react";
import RecipeDetailButtons from "./RecipeDetailButtons";
interface RecipeDetailProps {
  id: number;
  title: string;
  dishTypes: string[];
  readyInMinutes: number;
  servings: number;
  pricePerServing: number;
  vegetarian: boolean;
  cuisines: string[];
  winePairing: {
    pairedWines: string[];
  };
  veryPopular: boolean;
}

interface Props {
  detail: RecipeDetailProps;
}
export default function RecipeDetail({ detail }: Props) {
  const {
    id,
    title,
    dishTypes,
    readyInMinutes,
    servings,
    pricePerServing,
    vegetarian,
    cuisines,
    winePairing,
    veryPopular,
  } = detail;
  return (
    <div className="col-span-2 flex flex-col gap-4 bg-natural-cream p-4 ">
      <div className="flex justify-between">
        <h2 className="text-4xl underline">{title} </h2>
        <RecipeDetailButtons recipeId={id} />
      </div>
      <div className="flex flex-col gap-4 text-xl">
        <p>🍽️ {dishTypes} type </p>
        <p>
          ⏱️ Ready In <span className="font-bold">{readyInMinutes}</span>{" "}
          minutes
        </p>
        <p>
          👨‍👩‍👧‍👦 Total <span className="font-bold">{servings}</span> servings
        </p>
        <p>
          💸 Approximate Cost:{" "}
          <span className="font-bold">{pricePerServing}</span> $ per serving
        </p>
        <p>{vegetarian ? "🍀 vegetarian" : "🥩 non-vegetarian"} </p>
        {cuisines.length > 0 && <p>🇨🇻 Cuisines {cuisines.join(", ")} </p>}
        {winePairing && (
          <p>🍷 Pair with {winePairing?.pairedWines.join(", ")} </p>
        )}
        <p className="col-start-3">{veryPopular && "🌟 popular"} </p>
      </div>
    </div>
  );
}
