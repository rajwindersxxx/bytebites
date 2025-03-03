"use client";
import Link from "next/link";
import React from "react";
import { HiOutlineLogin } from "react-icons/hi";
import { useSession } from "next-auth/react";
import { useShoppingData } from "../context/ShoppingListContext";

export default function ProfilePanel() {
  const session = useSession();
  const {ingredientCart, recipeInCart} = useShoppingData()
  return (
    <div className="flex items-center gap-4 justify-self-end">
      {session?.data ? (
        <>
          <Link href="/dashboard" className="capitalize">
            {session?.data?.user?.name}
          </Link>
          <p>{ingredientCart.length} Ingredients  </p>
          <p>{recipeInCart.length} recipes  </p>
        </>
      ) : (
        <Link href="/login">
          <HiOutlineLogin className="h-6 w-6" />
        </Link>
      )}
    </div>
  );
}
