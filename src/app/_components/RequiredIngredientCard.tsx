"use client";
import { useQuery } from "@tanstack/react-query";
import IngredientRequiredItem from "./IngredientRequiredItem";
import { getUpcomingIngredients } from "../_actions/action";
import { useSession } from "next-auth/react";
import { uniqueId } from "lodash";
import { ExtendedIngredients, RecipeObject } from "../types/RecipeTypes";

function RequiredIngredientCard() {
  const session = useSession();
  const userId = session.data?.user?.id;
  const { data: IngredientData } = useQuery({
    queryFn: () => getUpcomingIngredients(Number(userId)),
    queryKey: ["upComingIngredients"],
    staleTime: Infinity,
  });
  let data;
  if (IngredientData) {
    data = groupRecipesById(IngredientData, Number(userId));
  }
  return (
    <div className="col-span-1 rounded-md bg-indigo-400 p-4 dark:bg-indigo-900">
      <h2 className="mb-4 text-xl uppercase">Ingredient Required</h2>
      <div className="flex max-h-52 flex-col gap-2 overflow-y-auto">
        {data &&
          data.map((item) => (
            <IngredientRequiredItem recipeObject={item} key={uniqueId()} />
          ))}
      </div>
    </div>
  );
}

export default RequiredIngredientCard;

function groupRecipesById(
  data: {
    id: number;
    recipeId: number;
    bitebytesRecipes: RecipeObject;
    extendedIngredients: ExtendedIngredients;
  }[],
  userId: number,
) {
  return Object.values(
    data.reduce(
      (
        acc: {
          [key: number]: {
            recipeId: number;
            title: string;
            id: number;
            extendedIngredients: ExtendedIngredients[];
          };
        },
        item,
      ) => {
        const { recipeId, bitebytesRecipes, extendedIngredients, id } = item;

        if (!acc[recipeId]) {
          acc[recipeId] = {
            recipeId,
            id,
            title: bitebytesRecipes.title,
            extendedIngredients: [],
          };
        }
        acc[recipeId].extendedIngredients.push({
          ...extendedIngredients,
          uniqueIngredientId: id,
          userId: Number(userId),
        });
        return acc;
      },
      {},
    ),
  );
}
