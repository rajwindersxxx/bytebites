import {
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiOutlineThumbUp,
} from "react-icons/hi";
import { useRecipeData } from "../context/RecipeDataContext";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useShoppingData } from "../context/ShoppingListContext";
import { GrTableAdd } from "react-icons/gr";
import {  useModal } from "./Modal";
import MealPlaningModal from "./MealPlaningModal";
import { RecipeObject } from "../types/RecipeTypes";
interface props {
  recipeId: number;
  visibleButtons?: string[];
  recipeData: RecipeObject;
}
function RecipeCardButtons({ recipeData, recipeId, visibleButtons }: props) {
  const { toggleLike, likedRecipes, toggleSave, savedRecipes } =
    useRecipeData();
  const { addRecipeToCart } = useShoppingData();
  const session = useSession();
  const userid = session.data?.user;
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isCart, setIsCart] = useState<boolean>(false);
  const { openModal } = useModal();
  const { recipeInCart } = useShoppingData();
  useEffect(() => {
    setIsLiked(likedRecipes.includes(recipeId));
    setIsSaved(savedRecipes.includes(recipeId));
    setIsCart(recipeInCart.some((item) => item.id === recipeId));
  }, [likedRecipes, recipeId, recipeInCart, savedRecipes]);
  return (
    <div className="col-start-3 flex justify-end gap-4">
      {visibleButtons?.includes("cart") && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            addRecipeToCart(recipeData);
          }}
        >
          <HiOutlineShoppingCart
            className={`h-6 w-6 stroke-natural-terracotta transition-all hover:scale-110 hover:fill-natural-terracotta ${isCart && "fill-natural-terracotta"}`}
          />
        </button>
      )}
      {visibleButtons?.includes("like") && (
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
      )}
      {visibleButtons?.includes("saved") && (
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
      )}
      {visibleButtons?.includes("meal") && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            openModal(`modal${recipeId}`);
          }}
        >
          <GrTableAdd
            className={`h-5 w-5 stroke-natural-terracotta transition-all hover:scale-110 hover:stroke-natural-terracotta ${isSaved && "fill-natural-terracotta"}`}
          />
        </button>
      )}
      <MealPlaningModal recipeData={recipeData}/>
    </div>
  );
}

export default RecipeCardButtons;
