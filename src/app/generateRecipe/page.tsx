import GenerateRecipeForm from "../_components/GenerateRecipeForm";
import RecipePreview from "../_components/RecipePreview";

export default function GenerateRecipePage() {
  return (
    <div className="flex min-h-[91vh] flex-col items-center justify-center gap-8 py-12 text-center">
      <GenerateRecipeForm />
      <RecipePreview />
    </div>
  );
}
