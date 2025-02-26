import React from "react";
import { HiOutlineHeart, HiOutlineThumbUp } from "react-icons/hi";
interface RecipeDetailProps {
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
    <div className="col-span-2 flex flex-col gap-4 bg-natural-cream p-4">
      <div className="flex justify-between ">
        <h2 className="text-4xl underline">{title} </h2>
        <div className="flex gap-4">
          <button>
            <HiOutlineThumbUp className="h-8 w-8 stroke-natural-terracotta transition-all hover:scale-110 hover:fill-natural-terracotta" />
          </button>
          <button>
            <HiOutlineHeart className="h-8 w-8 stroke-natural-terracotta transition-all hover:scale-110 hover:fill-natural-terracotta" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 text-xl">
        <p>🍽️ {dishTypes} type </p>
        <p>
          ⏱️ Ready In <span className="font-bold">{readyInMinutes}</span>
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
