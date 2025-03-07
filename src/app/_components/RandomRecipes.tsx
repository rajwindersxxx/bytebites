import RecipeCard from "./RecipeCard";
import { getRandomRecipeData } from "../_actions/action";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";
import { uniqueId } from "lodash";
import { RecipeObject } from "../types/RecipeTypes";

// Define the correct interface for a single recipe

interface props {
  groupId: number;
}
export default function RandomRecipes({ groupId }: props) {
  const { data, isLoading } = useQuery<RecipeObject[]>({
    queryKey: [`randomRecipes${groupId}`],
    queryFn: getRandomRecipeData,
  });

  if (isLoading) return <Spinner />;
  return (
    <>
      {data?.map((recipe: RecipeObject) => (
        <RecipeCard
          data={recipe}
          key={uniqueId()}
          visibleButtons={["like", "saved", "cart"]}
        />
      ))}
    </>
  );
}
