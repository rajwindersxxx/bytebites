import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import RecipeCard from "@/app/_components/RecipeCard";
import Pagination from "@/app/_components/Pagination";
import { getSearchedRecipe } from "@/app/_servers/foodApi";
import { SEARCH_RESULTS_COUNT } from "@/app/_config/foodApiConfig";
import { searchRecipe } from "../../_data/searchRecipe";
interface SearchParams {
  search: string;
  page: number;
}
interface RecipeResponse {
  results: {
    image: string;
    title: string;
    id: number;
  }[];
  number: number;
  totalResults: number;
}
export default async function FilterPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { search, page } = await searchParams;
  const offset = page ? (page - 1) * SEARCH_RESULTS_COUNT : 0;
  const { results, number, totalResults }: RecipeResponse =
    await getSearchedRecipe(search, offset);
  // const { results, number, totalResults } = searchRecipe;
  return (
    <Suspense fallback={<Spinner />}>
      <div className="mx-auto grid grid-cols-responsiveGrid place-items-center gap-4">
        {results.map((recipe) => (
          <RecipeCard data={recipe} key={recipe.id + recipe.title} />
        ))}
      </div>
      <Pagination totalResults={totalResults} pageSize={number} />
    </Suspense>
  );
}
