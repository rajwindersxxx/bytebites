import RecipeCard from '../components/RecipeCard';
import { recipeData } from '../data/recipeData.js';
export default function ExplorePage() {
  return (
    <div className="container  mx-auto p-4 my-8 border">
      <h2 className="text-center text-4xl mb-8">Explore Some of recipes </h2>
      <div className="grid grid-cols-responsiveGrid gap-4 mx-auto place-items-center">
        {recipeData.map((recipe) => (
          <RecipeCard data={recipe} key={recipe.id} />
        ))}
      </div>
      <div className='text-center'>
        <button className="text-center text-2xl mt-8 underline hover:scale-105 transition-all active:text-primary">Show more</button>
      </div>
    </div>
  );
}
