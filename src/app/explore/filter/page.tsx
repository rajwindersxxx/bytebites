import { Suspense } from "react";
import Spinner from "@/app/_components/ui/Spinner";
import RecipeCard from "@/app/_components/features/recipe/RecipeCard";
import Pagination from "@/app/_components/ui/Pagination";
import { SEARCH_RESULTS_COUNT } from "@/app/_config/foodApiConfig";
import { getSearchedRecipeData } from "@/app/_actions/recipesActions";
import { RecipeObject } from "@/app/types/RecipeTypes";
interface props {
  searchParams: Promise<{ search: string; page: number }>;
}
interface RecipeResponse {
  results: RecipeObject[];
  number: number;
  totalResults: number;
}
export default async function FilterPage({ searchParams }: props) {
  const { search, page } = await searchParams;
  const offset = page ? (page - 1) * SEARCH_RESULTS_COUNT : 0;
  const { results, number, totalResults }: RecipeResponse =
    await getSearchedRecipeData(search, offset);
  // const { results, number, totalResults } = searchRecipe;
  return (
    <Suspense fallback={<Spinner />}>
      <div className="mx-auto grid grid-cols-responsiveGrid place-items-center gap-4">
        {results.map((recipe) => (
          <RecipeCard
            data={recipe}
            key={recipe.id}
            visibleButtons={["saved"]}
          />
        ))}
      </div>
      <Pagination totalResults={totalResults} pageSize={number} />
    </Suspense>
  );
}
