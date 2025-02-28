import RecipeCard from "./RecipeCard";
import { getRandomRecipeData } from "../_actions/action";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";

// Define the correct interface for a single recipe
interface Recipe {
  id: number;
  image: string;
  title: string;
  readyInMinutes: number;
  servings: number;
  vegetarian?: boolean;
  pricePerServing?: number;
  veryPopular?: boolean;
  extendedIngredients?: unknown[];
  baseUrlImage?: string;
  searchParams: { search: string };
}
interface props {
  groupId: number;
}
export default function RandomRecipes({ groupId }: props) {
  const { data, isLoading } = useQuery<Recipe[]>({
    queryKey: [`randomRecipes${groupId}`],
    queryFn: getRandomRecipeData,
  });

  if (isLoading) return <Spinner />;
  return (
    <>
      {data?.map((recipe: Recipe) => (
        <RecipeCard data={recipe} key={recipe.id} />
      ))}
    </>
  );
}
