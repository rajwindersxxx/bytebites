"use client";
import React from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { useShoppingData } from "../context/ShoppingListContext";

interface props {
  ingredient: {
    id: number;
    amount: number;
    measures: { us: { amount: number }; metric: { amount: number } };
  };
}
function IngredientCartButtons({ ingredient }: props) {
  const { addIngredientToCart } = useShoppingData();
  return (
    <div>
      <button onClick={() => addIngredientToCart(ingredient)}>
        <HiOutlinePlusCircle className="h-6 w-6 stroke-natural-terracotta transition-all hover:scale-110" />
      </button>
    </div>
  );
}

export default IngredientCartButtons;
