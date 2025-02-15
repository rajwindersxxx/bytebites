import { getRandomRecipes } from '../api/foodApi';
import RecipeCard from '../components/RecipeCard';
import SearchRecipeForm from '../components/SearchRecipeForm';
interface recipe {
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
}
export default async function ExplorePage() {
  const { recipes: recipeData }: { recipes: recipe[] } = await getRandomRecipes(
    12
  );
  return (
    <div className="container  mx-auto p-4 my-8 border">
      <div className='grid grid-cols-3 place-items-center mb-4'>
        <div></div>
        <div>
          <h2 className="text-center text-4xl">Explore Some of recipes </h2>
        </div>
        <div className='justify-self-end pr-5'>
          <SearchRecipeForm />
        </div>
      </div>
      <div className="grid grid-cols-responsiveGrid gap-4 mx-auto place-items-center">
        {recipeData.map((recipe) => (
          <RecipeCard data={recipe} key={recipe.id} />
        ))}
      </div>
      <div className="text-center">
        <button className="text-center text-2xl mt-8 underline hover:scale-105 transition-all active:text-primary">
          Show more
        </button>
      </div>
    </div>
  );
}
