"use client";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import lodash from "lodash";
import { getRecipeDetailsData } from "../_actions/recipesActions";
import { ExtendedIngredients, RecipeObject } from "../types/RecipeTypes";
import toast from "react-hot-toast";
import { getLocalStorage, setLocalStorage } from "../_helper/clientheper";
interface props {
  children: React.ReactNode;
}

type IngredientCart = ExtendedIngredients & { count: number };
type RecipeCart = RecipeObject & { count: number };
interface ShoppingContextType {
  recipeInCart: RecipeCart[];
  ingredientCart: IngredientCart[];
  addRecipeToCart: (
    recipeObject: RecipeObject,
    updateQuantity?: string,
  ) => void;
  addIngredientToCart: (
    recipeObject: ExtendedIngredients,
    updateQuantity?: string,
  ) => void;
  removeIngredientFromCart: (ingredientId: number) => void;
  removeRecipeFromCart: (recipeId: number) => void;
  clearLocalStorageCart: () => void;
}
const shoppingContext = createContext<ShoppingContextType | undefined>(
  undefined,
);

function ShoppingContext({ children }: props) {
  const [recipeInCart, setRecipeInCart] = useState<RecipeCart[]>([]);
  const [ingredientCart, setIngredientCart] = useState<IngredientCart[]>([]);
  const [initialRecipeCartState, setInitialRecipeCartState] = useState<
    RecipeCart[]
  >([]);
  useEffect(() => {
    const storedRecipeCart = getLocalStorage("");
    const storedIngredientCart =
      getLocalStorage("ingredientCart");
    const initialCartState = getLocalStorage("initialCartState");
    setRecipeInCart(storedRecipeCart || []);
    setIngredientCart(storedIngredientCart || []);
    setInitialRecipeCartState(initialCartState || []);
  }, []);
  useEffect(() => {
    if (recipeInCart.length > -1) setLocalStorage("recipeCart", recipeInCart);
    if (initialRecipeCartState.length > -1)
      setLocalStorage("initialCartState", initialRecipeCartState);
  }, [initialRecipeCartState, recipeInCart]);
  useEffect(() => {
    if (ingredientCart.length > -1)
      setLocalStorage("ingredientCart", ingredientCart);
  }, [ingredientCart]);
  function addIngredientToCart(
    ingredientObject: ExtendedIngredients,
    updateQuantity?: string,
  ) {
    const index = ingredientCart.findIndex(
      (item: { id: number }) => item.id === ingredientObject.id,
    );
    if (index !== -1) {
      const storedObject = lodash.cloneDeep(ingredientCart[index]);
      if (updateQuantity === "increase") {
        storedObject.amount += 1;
        storedObject.measures.us.amount += 1;
        storedObject.measures.metric.amount += 1;
        toast.success(
          `Added 1 ${storedObject.measures.us.unitShort}. New Total ${storedObject.measures.us.amount} ${storedObject.unit}`,
        );
      }
      if (updateQuantity === "decrease") {
        if (storedObject.amount <= 1) return;
        storedObject.amount -= 1;
        storedObject.measures.us.amount -= 1;
        storedObject.measures.metric.amount -= 1;
        toast.success(
          `Removed 1 ${storedObject.unit}. New Total ${storedObject.measures.us.amount} ${storedObject.unit}`,
        );
      }
      if (!updateQuantity) {
        storedObject.amount += ingredientObject.amount;
        storedObject.measures.us.amount += ingredientObject.measures.us.amount;
        storedObject.measures.metric.amount +=
          ingredientObject.measures.metric.amount;
        storedObject.count += 1;
        toast.success(
          `Added ${ingredientObject.amount} ${storedObject.unit}. New Total ${storedObject.measures.us.amount} ${storedObject.unit}`,
        );
      }
      setIngredientCart((preValue) =>
        preValue.map((item, i) => (index === i ? storedObject : item)),
      );
    } else {
      toast.success(
        `Added ${ingredientObject.amount} ${ingredientObject.unit}.`,
      );
      setIngredientCart((preValue) => [
        { ...ingredientObject, count: 1 },
        ...preValue,
      ]);
    }
  }
  function removeIngredientFromCart(ingredientId: number) {
    const removeObject = ingredientCart.filter(
      (item) => item.id !== ingredientId,
    );
    setIngredientCart(removeObject);
    toast.success("Ingredient removed for cart");
  }
  function removeRecipeFromCart(recipeId: number) {
    const removeObject = recipeInCart.filter((item) => item.id !== recipeId);
    setRecipeInCart(removeObject);
    toast.success(`Recipe Removed from Cart`);
  }
  async function addRecipeToCart(
    recipeObject: RecipeObject,
    updateQuantity?: string,
  ) {
    if (!recipeObject.extendedIngredients) {
      const recipeData = await getRecipeDetailsData(recipeObject.id);
      recipeObject = recipeData;
    }
    const index = recipeInCart.findIndex((item) => item.id === recipeObject.id);
    if (index !== -1) {
      const storedObject = lodash.cloneDeep(recipeInCart[index]);
      const initialObject = initialRecipeCartState.filter(
        (item) => item.id === storedObject.id,
      )[0];
      let ingredientsData;
      if (updateQuantity === "decrease") {
        if (storedObject.count <= 1) return;
        ingredientsData = storedObject.extendedIngredients?.map((item, i) => {
          item.amount -= initialObject.extendedIngredients[i].amount;
          item.measures.us.amount -=
            initialObject.extendedIngredients[i].measures.us.amount;
          item.measures.metric.amount -=
            initialObject.extendedIngredients[i].measures.metric.amount;
          return item;
        });
        if (storedObject.servings) {
          storedObject.servings -= initialObject.servings;
        }
        storedObject.count -= 1;
      } else {
        ingredientsData = storedObject.extendedIngredients?.map((item, i) => {
          item.amount += initialObject.extendedIngredients[i].amount;
          item.measures.us.amount +=
            initialObject.extendedIngredients[i].measures.us.amount;
          item.measures.metric.amount +=
            initialObject.extendedIngredients[i].measures.metric.amount;
          return item;
        });
        if (storedObject.servings) {
          storedObject.servings += initialObject.servings;
        }
        storedObject.count += 1;
      }
      const finalObject = {
        ...storedObject,
        extendedIngredients: ingredientsData,
      };
      setRecipeInCart((preValue) =>
        preValue.map((item, i) => (i === index ? finalObject : item)),
      );
    } else {
      setRecipeInCart((preValue) => [
        { ...recipeObject, count: 1 },
        ...preValue,
      ]);
      toast.success(`Recipe Added to Cart`);
    }
    if (index === -1) {
      setInitialRecipeCartState((preValue) => [
        { ...recipeObject, count: 1 },
        ...preValue,
      ]);
    }
  }
  function clearLocalStorageCart() {
    setRecipeInCart([]);
    setIngredientCart([]);
    localStorage.removeItem("recipeCart");
    localStorage.removeItem("ingredientCart");
    localStorage.removeItem("initialCartState");
  }
  return (
    <shoppingContext.Provider
      value={{
        recipeInCart,
        ingredientCart,
        addRecipeToCart,
        addIngredientToCart,
        removeIngredientFromCart,
        removeRecipeFromCart,
        clearLocalStorageCart,
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
