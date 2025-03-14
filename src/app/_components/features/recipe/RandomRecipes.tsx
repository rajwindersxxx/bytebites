import RecipeCard from "./RecipeCard";
import { getRandomRecipeData } from "@/app/_actions/recipesActions";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import { RecipeObject } from "../../../types/RecipeTypes";

// Define the correct interface for a single recipe

interface props {
  groupId: number;
}
export default function RandomRecipes({ groupId }: props) {
  const { data, isLoading } = useQuery<RecipeObject[]>({
    queryKey: [`randomRecipes${groupId}`],
    queryFn: getRandomRecipeData,
    staleTime: Infinity,
  });

  if (isLoading) return <Spinner />;
  return (
    <>
      {data?.map((recipe: RecipeObject) => (
        <RecipeCard
          data={recipe}
          key={recipe.id}
          visibleButtons={["like", "saved", "cart"]}
        />
      ))}
    </>
  );
}
