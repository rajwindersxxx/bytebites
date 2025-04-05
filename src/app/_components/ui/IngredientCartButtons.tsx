"use client";
import React from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { useShoppingData } from "../../context/ShoppingListContext";
import { ExtendedIngredients } from "../../types/RecipeTypes";
import { useSession } from "next-auth/react";

interface props {
  ingredient: ExtendedIngredients;
}
function IngredientCartButtons({ ingredient }: props) {
  const session = useSession();

  const { addIngredientToCart } = useShoppingData();
  return (
    <div>
      {session.data?.user && <button onClick={() => addIngredientToCart(ingredient)}>
        <HiOutlinePlusCircle className="h-6 w-6 stroke-natural-terracotta transition-all hover:scale-110 active:scale-125 dark:stroke-accent" />
      </button>}
    </div>
  );
}

export default IngredientCartButtons;
