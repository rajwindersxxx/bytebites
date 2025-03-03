import {
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiOutlineThumbUp,
} from "react-icons/hi";
import { useRecipeData } from "../context/RecipeDataContext";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useShoppingData } from "../context/ShoppingListContext";
interface props {
  recipeId: number;
  recipeData: {
    id: number;
    servings: number;
    extendedIngredients: {
      id: number;
      amount: number;
      measures: { us: { amount: number }; metric: { amount: number } };
    }[];
  };
}
function RecipeCardButtons({ recipeData, recipeId }: props) {
  const { toggleLike, likedRecipes, toggleSave, savedRecipes } =
    useRecipeData();
  const { addRecipeToCart } = useShoppingData();
  const session = useSession();
  const userid = session.data?.user;
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  useEffect(() => {
    setIsLiked(likedRecipes.includes(recipeId));
    setIsSaved(savedRecipes.includes(recipeId));
  }, [likedRecipes, recipeId, savedRecipes]);
  return (
    <div className="col-start-3 flex justify-end gap-4">
      <button
        onClick={(e) => {
          e.stopPropagation();
          addRecipeToCart(recipeData);
        }}
      >
        <HiOutlineShoppingCart
          className={`h-6 w-6 stroke-natural-terracotta transition-all hover:scale-110 hover:fill-natural-terracotta ${isLiked && "fill-natural-terracotta"}`}
        />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (!userid) return;
          toggleLike(recipeId);
        }}
      >
        <HiOutlineThumbUp
          className={`h-6 w-6 stroke-natural-terracotta transition-all hover:scale-110 hover:fill-natural-terracotta ${isLiked && "fill-natural-terracotta"}`}
        />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleSave(recipeId);
        }}
      >
        <HiOutlineHeart
          className={`h-6 w-6 stroke-natural-terracotta transition-all hover:scale-110 hover:fill-natural-terracotta ${isSaved && "fill-natural-terracotta"}`}
        />
      </button>
    </div>
  );
}

export default RecipeCardButtons;
