"use client";
import React, { useContext, useState } from "react";
import { createContext } from "react";
import lodash from "lodash";
interface props {
  children: React.ReactNode;
}
// !don't do mutation
type IngredientCart = {
  id: number;
  amount: number;
  count: number;
  measures: { us: { amount: number }; metric: { amount: number } };
};
type IngredientObject = {
  id: number;
  amount: number;
  measures: { us: { amount: number }; metric: { amount: number } };
};
type RecipeCart = {
  id: number;
  servings?: number;
  count: number;
  extendedIngredients: {
    id: number;
    amount: number;
    measures: { us: { amount: number }; metric: { amount: number } };
  }[];
};
type RecipeObject = {
  id: number;
  servings?: number;
  extendedIngredients: {
    id: number;
    amount: number;
    measures: { us: { amount: number }; metric: { amount: number } };
  }[];
};
interface ShoppingContextType {
  recipeInCart: RecipeCart[];
  ingredientCart: IngredientCart[];
  addRecipeToCart: (recipeObject: RecipeObject) => void;
  addIngredientToCart: (recipeObject: IngredientObject) => void;
}
const shoppingContext = createContext<ShoppingContextType | undefined>(
  undefined,
);

function ShoppingContext({ children }: props) {
  const [recipeInCart, setRecipeInCart] = useState<RecipeCart[]>([]);
  const [ingredientCart, setIngredientCart] = useState<IngredientCart[]>([]);

  function addIngredientToCart(ingredientObject: IngredientObject) {
    const index = ingredientCart.findIndex(
      (item: { id: number }) => item.id === ingredientObject.id,
    );
    if (index !== -1) {
      const storedObject = lodash.cloneDeep(ingredientCart[index]);
      storedObject.amount += storedObject.amount;
      storedObject.measures.us.amount += storedObject.measures.us.amount;
      storedObject.measures.metric.amount +=
        storedObject.measures.metric.amount;
        storedObject.count+= storedObject.count;
      setIngredientCart((preValue) =>
        preValue.map((item, i) => (index === i ? storedObject : item)),
      );
    } else {
      setIngredientCart((preValue) => [
        ...preValue,
        { ...ingredientObject, count: 1 },
      ]);
    }
  }
  function addRecipeToCart(recipeObject: RecipeObject) {
    const index = recipeInCart.findIndex((item) => item.id === recipeObject.id);

    if (index !== -1) {
      const storedObject = lodash.cloneDeep(recipeInCart[index]);
      const ingredientsData = storedObject.extendedIngredients?.map((item) => {
        item.amount += item.amount;
        item.measures.us.amount += item.measures.us.amount;
        item.measures.metric.amount += item.measures.metric.amount;
        return item;
      });
     if (storedObject.servings) {
       storedObject.servings += storedObject.servings;
     }
      storedObject.count += storedObject.count;
      const finalObject = {
        ...storedObject,
        extendedIngredients: ingredientsData,
      };
      setRecipeInCart((preValue) =>
        preValue.map((item, i) => (i === index ? finalObject : item)),
      );
    } else {
      // element not exist
      setRecipeInCart((preValue) => [
        ...preValue,
        { ...recipeObject, count: 1 },
      ]);
    }
  }
  return (
    <shoppingContext.Provider
      value={{
        recipeInCart,
        ingredientCart,
        addRecipeToCart,
        addIngredientToCart,
      }}
    >
      {children}
    </shoppingContext.Provider>
  );
}

function useShoppingData() {
  const context = useContext(shoppingContext);
  if (!context)
    throw new Error("useShoppingContext must be used within a RecipeProvider");
  return context;
}

export { ShoppingContext, useShoppingData };
