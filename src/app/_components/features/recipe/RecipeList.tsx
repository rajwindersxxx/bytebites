import RecipeCard from "./RecipeCard";
import Spinner from "../../ui/Spinner";
import { RecipeObject } from "../../../types/RecipeTypes";
import { useRecipeFilter } from "@/app/context/RecipeFilterContext";

// Define the correct interface for a single recipe
interface props {
  offset: number;
}

export default function RecipeList({ offset }: props) {
  const { recipeData, isLoadingRecipes } = useRecipeFilter();
  console.log(offset)
  // useEffect(() => {
  //   setOffset(offset);
  // }, [offset, setOffset]);
  if (isLoadingRecipes) return <Spinner />;
  console.log(isLoadingRecipes);
  return (
    <>
      {recipeData?.map((recipe: RecipeObject) => (
        <RecipeCard
          data={recipe}
          key={recipe.id}
          visibleButtons={["like", "saved"]}
        />
      ))}
    </>
  );
}
