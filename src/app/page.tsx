import IngredientPanel from "./_components/layout/IngredientPanel";
import ExplorePage from "./_components/layout/ExplorePage";
import { getIngredientListDB } from "./_servers/supabase/recipeFilter";
import { IngredientListDB } from "./_types/RecipeTypes";
export default async function page() {
  const data = await getIngredientListDB();
  const ingredientList = groupIngredientsByType(data);
  return (
    <div className="grid grid-cols-[1fr_auto]">
      <ExplorePage />
      <IngredientPanel ingredientList={ingredientList} />
    </div>
  );
}

function groupIngredientsByType(ingredientsDB: IngredientListDB[]) {
  return Object.entries(
    ingredientsDB.reduce(
      (acc: Record<string, string[]>, item) => {
        const { type, ingredient } = item;
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(ingredient);
        return acc;
      },
      {} as Record<string, string[]>,
    ),
  ).map(([type, ingredients]) => ({ type, ingredients }));
}
