const apiKey = process.env.FOOD_API_KEY;
const FOOD_URL = 'https://api.spoonacular.com/recipes';
export async function getRecipe(recipeName: string) {
  const res = await fetch(
    `${FOOD_URL}/complexSearch?apiKey=${apiKey}&query=${recipeName}`
  );
  const data = await res.json();
  return data;
}
