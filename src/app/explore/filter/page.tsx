import { Suspense } from 'react';
import Spinner from '@/app/components/Spinner';
import RecipeCard from '@/app/components/RecipeCard';
import Pagination from '@/app/components/Pagination';
import { getSearchedRecipe } from '@/app/api/foodApi';
import { SEARCH_RESULTS_COUNT } from '@/app/config/foodApiConfig';
import {searchRecipe} from '../../data/searchRecipe.js'
interface SearchParams {
  search: string;
  page: number;
}

export default async function FilterPage({ searchParams }: { searchParams: SearchParams }) {
  const {search, page} = await searchParams;
  const offset = page? (page - 1) * SEARCH_RESULTS_COUNT: 0;
  // const { results, number, totalResults }  = await getSearchedRecipe(search, offset);
  const { results,  number, totalResults } = searchRecipe;
  return (
    <Suspense fallback={<Spinner />}>
      <div className="grid grid-cols-responsiveGrid gap-4 mx-auto place-items-center">
        {results.map((recipe) => (
          <RecipeCard data={recipe} key={recipe.id + recipe.title} />
        ))}
      </div>
      <Pagination totalResults={totalResults} pageSize={number} />
    </Suspense>
  );
}
