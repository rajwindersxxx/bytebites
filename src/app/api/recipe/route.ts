// app/api/users/route.js
// import { getRandomRecipes } from "@/app/_servers/foodApi";
import { recipeData } from "../../data/recipeData";

export async function GET() {
  //  const { recipes: recipeData }: { recipes: recipe[] } = await getRandomRecipes(
  //   12
  // );

  return new Response(JSON.stringify(recipeData), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
