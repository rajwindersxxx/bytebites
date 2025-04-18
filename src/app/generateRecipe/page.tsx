import { Metadata } from "next";
import GenerateRecipeForm from "../_components/forms/GenerateRecipeForm";
export const metadata: Metadata = {
  title: 'Make a recipe'
}
export default function GenerateRecipePage() {
  // todo: this feature need to embedded  inside the root page filter
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12 text-center">
      <GenerateRecipeForm />
    </div>
  );
}
