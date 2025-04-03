"use client";
import React from "react";
import { ImageElement } from "../../ui/ImageElement";
import RecipeCardButtons from "./RecipeCardButtons";
import { useRouter } from "next/navigation";
import { RecipeObject } from "../../../types/RecipeTypes";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/ToolTip";
import { FloatingDelayGroup } from "@floating-ui/react";
interface props {
  data: RecipeObject;
  baseUrlImage?: string;
  detailsLink?: string;
  visibleButtons?: string[];
  totalResults?: number;
}
export default function RecipeCard({
  data,
  baseUrlImage,
  detailsLink,
  visibleButtons = ["cart", "like", "saved", "meal"],
  totalResults
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
    missedIngredientCount,
  } = data;
  const router = useRouter();
  const link = detailsLink ? detailsLink : `/recipeDetail?recipeId=${id}`;
  function handleRoute() {
    if (detailsLink) router.push(link);
    else router.push(link);
  }
  const isDragging = false;
  return (
    <div
      onClick={handleRoute}
      className={`card relative grid w-full ${totalResults && totalResults < 4 && 'md:w-[28rem]'} shrink-0 cursor-pointer grid-cols-[1fr_1.7fr] overflow-hidden rounded-md bg-natural-beige hover:shadow-md ${isDragging ? "" : "transition-all"}`}
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
        <FloatingDelayGroup delay={200}>
          <Tooltip>
            <TooltipTrigger>
              <a
                className="title block w-full cursor-pointer text-start font-bold transition-all hover:underline active:text-primary"
                onClick={(e) => {
                  router.push(`/recipeDetail?recipeId=${id}`);
                  e.stopPropagation();
                }}
              >
                {title.slice(0, 25)}
                {title.length > 25 && " ..."}
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <div className="w-52 rounded-md border border-accent bg-natural-beige p-2 text-sm">
                {title}
              </div>
            </TooltipContent>
          </Tooltip>
        </FloatingDelayGroup>
        <div className="grid grid-cols-[1fr_0.5fr_1fr] content-center items-center justify-center gap-2 dark:text-gray-300">
          {readyInMinutes && <p>⏱️ {readyInMinutes} min </p>}
          {servings && <p>👨‍👩‍👧‍👦 {servings} </p>}
          {pricePerServing && <p>💸 {pricePerServing} $</p>}
          {vegetarian !== undefined && (
            <p>{vegetarian ? "🍀 veg" : "🥩 non-veg"} </p>
          )}
          <p className="col-start-3">{veryPopular && "🌟 popular"} </p>
          {missedIngredientCount && extendedIngredients && (
            <p className="col-span-2">
              {missedIngredientCount}/{extendedIngredients.length} Missing
            </p>
          )}
          <RecipeCardButtons
            recipeData={data}
            visibleButtons={visibleButtons}
          />
        </div>
      </div>
    </div>
  );
}
