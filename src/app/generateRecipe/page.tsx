import GenerateRecipeForm from '../components/GenerateRecipeForm';
import SearchRecipeForm from '../components/SearchRecipeForm';

export default function GenerateRecipePage() {
  return (
    <div className="flex justify-center flex-col gap-8 items-center h-screen text-center">
      <h2 className="text-4xl">Search Recipes by name</h2>
      <SearchRecipeForm/>
      <h2 className="text-4xl">or</h2>
      <GenerateRecipeForm />
    </div>
  );
}
