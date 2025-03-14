import {
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiOutlineThumbUp,
} from "react-icons/hi";
import { useRecipeData } from "../../../context/RecipeDataContext";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useShoppingData } from "../../../context/ShoppingListContext";
import { GrTableAdd } from "react-icons/gr";
import { useModal } from "../../ui/Modal";
import { RecipeObject } from "../../../types/RecipeTypes";
import toast from "react-hot-toast";
import MealPlaningModal from "../MealPlanning/MealPlaningModal";
import ConfirmationModal from "../../forms/ConfirmationModal";
interface props {
  recipeId: number;
  visibleButtons?: string[];
  recipeData: RecipeObject;
}
function RecipeCardButtons({ recipeData, recipeId, visibleButtons }: props) {
  const { toggleLike, likedRecipes, toggleSave, savedRecipes } =
    useRecipeData();
  const { addRecipeToCart, removeRecipeFromCart } = useShoppingData();
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

  function handleCart(e: { stopPropagation: () => void }) {
    e.stopPropagation();
    // todo: modify later
    if (!userid) return toast.error("You need to login");
    if (isCart) removeRecipeFromCart(recipeId);
    else addRecipeToCart(recipeData);
  }
  function handleLike(e: { stopPropagation: () => void }) {
    e.stopPropagation();
    toggleLike(recipeId);
  }
  function handleSave(e: { stopPropagation: () => void }) {
    e.stopPropagation();
    if (isSaved)
      return openModal(
        <ConfirmationModal callback={() => toggleSave(recipeId)} />,
        `confirmDelete`,
      );
    toggleSave(recipeId);
  }
  function handleMeal(e: { stopPropagation: () => void }) {
    e.stopPropagation();
    openModal(
      <MealPlaningModal recipeData={recipeData} />,
      `modal${recipeId}`,
      { recipeTitle: recipeData.title },
    );
  }

  return (
    <div className="col-start-3 flex justify-end gap-4">
      {visibleButtons?.includes("cart") && (
        <button onClick={handleCart}>
          <HiOutlineShoppingCart
            className={`iconOutlineStyles ${isCart && "iconFillStyle"}`}
          />
        </button>
      )}
      {visibleButtons?.includes("like") && (
        <button onClick={handleLike}>
          <HiOutlineThumbUp
            className={`iconOutlineStyles ${isLiked && "iconFillStyle"}`}
          />
        </button>
      )}
      {visibleButtons?.includes("saved") && (
        <button onClick={handleSave}>
          <HiOutlineHeart
            className={`iconOutlineStyles ${isSaved && "iconFillStyle"}`}
          />
        </button>
      )}
      {visibleButtons?.includes("meal") && (
        <button onClick={handleMeal}>
          <GrTableAdd
            className={`h-5 w-5 stroke-natural-terracotta transition-all hover:scale-110 active:scale-125 dark:stroke-accent ${isSaved && "iconFillStyle"}`}
          />
        </button>
      )}
    </div>
  );
}

export default RecipeCardButtons;
