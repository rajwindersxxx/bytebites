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
    <div className="relative flex flex-col gap-4 bg-natural-cream py-8 lg:p-0">
      <div className="flex items-start justify-between border-b border-b-accent">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl">{title} </h2>
          <p className="text-xl">🍽️ {dishTypes.join(", ")} </p>
        </div>
        <RecipeDetailButtons recipeId={id} />
      </div>
      <div className="grid grid-cols-2 gap-8 py-4 text-xl ">
        <p className="w">
          ⏱️ <span className="font-bold">{readyInMinutes}</span> minutes
        </p>
        <p className="w">
          👨‍👩‍👧‍👦 <span className="font-bold">{servings}</span> servings
        </p>
        <p className="w">
          💸 <span className="font-bold">{pricePerServing}</span> $ per serving
        </p>
        <p className="w">
          {vegetarian ? "🍀 vegetarian" : "🥩 non-vegetarian"}{" "}
        </p>
        {cuisines.length > 0 && (
          <p className="col-span-2 ">
            🇨🇻 Cuisines {cuisines.join(", ")}{" "}
          </p>
        )}
        {winePairing && (
          <p className="col-span-2">🍷 Pair with {winePairing?.pairedWines.join(", ")} </p>
        )}
        <p className="">{veryPopular && "🌟 popular"} </p>
      </div>
    </div>
  );
}
