import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import RecipeCard from "@/app/_components/RecipeCard";
import Pagination from "@/app/_components/Pagination";
import { SEARCH_RESULTS_COUNT } from "@/app/_config/foodApiConfig";
import { getSearchedRecipeData } from "@/app/_actions/action";
import { uniqueId } from "lodash";
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
    await getSearchedRecipeData(search, offset);
  // const { results, number, totalResults } = searchRecipe;
  return (
    <Suspense fallback={<Spinner />}>
      <div className="mx-auto grid grid-cols-responsiveGrid place-items-center gap-4">
        {results.map((recipe) => (
          <RecipeCard data={recipe} key={uniqueId()} visibleButtons={['saved']}/>
        ))}
      </div>
      <Pagination totalResults={totalResults} pageSize={number} />
    </Suspense>
  );
}
