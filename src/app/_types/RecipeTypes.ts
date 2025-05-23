// recipe details types
export type ExtendedIngredients = {
  count: number;
  recipeId?: number;
  isPurchased: boolean;
  uniqueIngredientId?: number;
  userId: number;
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: {
    us: {
      amount: number;
      unitShort: string;
      unitLong: string;
    };
    metric: {
      amount: number;
      unitShort: string;
      unitLong: string;
    };
  };
};
export type AnalyzedInstructions = {
  name: string;
  steps: {
    number: number;
    step: string;
    ingredients: {
      id: number;
      name: string;
      localizedName: string;
      image: string;
    }[];
    equipment: {
      id: number;
      name: string;
      localizedName: string;
      image: string;
    }[];
  }[];
};
export type RecipeObject = {
  error?: string;
  missedIngredientCount: number;
  userId?: number;
  missedIngredients?: { name: string }[];
  created_at?: string;
  count: number;
  id: number;
  image: string;
  imageType: string;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  preparationMinutes: null | string;
  cookingMinutes: null | string;
  aggregateLikes: number;
  healthScore: number;
  creditsText: string;
  license: null | string;
  sourceName: string;
  pricePerServing: number;
  extendedIngredients: ExtendedIngredients[];
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: string[];
  instructions: string;
  analyzedInstructions: AnalyzedInstructions[];
  originalId: number | null;
  spoonacularScore: number;
  spoonacularSourceUrl: string;
  review?: string;

};

export type UserShoppingList = {
  id: number;
  name: string;
  unit: string;
  image: string;
  consistency: string;
  created_at?: string;
  amount: number;
  isPurchased: boolean;
  userId?: number;
};
export type Category = {
  [key: string]: string[];
};
export type IngredientListTags = {
  type: string;
  ingredients: string[];
};
export type IngredientListDB = { type: string; ingredient: string };
export type SearchData = {
  query: string;
  searchObject: Set<string>;
  filterObject: Record<string, string[]>;
  offSet: number
};
