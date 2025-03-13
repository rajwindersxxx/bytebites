import { Metadata } from "next";
import GenerateRecipeForm from "../_components/GenerateRecipeForm";
export const metadata: Metadata = {
  title: 'Make a recipe'
}
export default function GenerateRecipePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12 text-center">
      <GenerateRecipeForm />
    </div>
  );
}
