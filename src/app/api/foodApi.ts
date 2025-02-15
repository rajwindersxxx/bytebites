const apiKey = process.env.FOOD_API_KEY;
const FOOD_URL = 'https://api.spoonacular.com';
export async function getSearchedRecipe(recipeName: string) {
  try {
    const res = await fetch(
      `${FOOD_URL}/recipes/complexSearch?apiKey=${apiKey}&query=${recipeName}`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
}

export async function getRandomRecipes(count: number) {
  try {
    const res = await fetch(
      `${FOOD_URL}/recipes/random?apiKey=${apiKey}&number=${count}`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
}

export async function getRecipeDetails(id: number) {
  try {
    const res = await fetch(
      `${FOOD_URL}/recipes/${id}/information?apiKey=${apiKey}`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
}
export async function getSimilarRecipes(id: number) {
  try {
    const res = await fetch(
      `${FOOD_URL}/recipes/${id}/similar?apiKey=${apiKey}`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
}
