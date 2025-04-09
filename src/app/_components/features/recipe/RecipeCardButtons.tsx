import {
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiOutlineThumbUp,
} from "react-icons/hi";
import { useRecipeData } from "../../../_context/RecipeDataContext";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useShoppingData } from "../../../_context/ShoppingListContext";
import { GrTableAdd } from "react-icons/gr";
import { useModal } from "../../ui/Modal";
import { RecipeObject } from "../../../_types/RecipeTypes";
import toast from "react-hot-toast";
import MealPlaningModal from "../MealPlanning/MealPlaningModal";
import ConfirmationModal from "../../forms/ConfirmationModal";
import { BarsSpinner } from "../../ui/Spinner";
import { useSavedRecipes } from "@/app/_hooks/useSavedRecipes";
import { useLikedRecipes } from "@/app/_hooks/useLikedRecipes";
interface props {
  visibleButtons?: string[];
  recipeData: RecipeObject;
}
function RecipeCardButtons({ recipeData, visibleButtons }: props) {
  const recipeId = Number(recipeData.id);
  const { likedRecipes, savedRecipes } = useRecipeData();
  const { toggleSave } = useSavedRecipes();
  const { toggleLike } = useLikedRecipes();

  const { addRecipeToCart, removeRecipeFromCart } = useShoppingData();
  const session = useSession();
  const userid = session.data?.user;
  const [isLiked, setIsLiked] = useState<boolean | string>(false);
  const [isSaved, setIsSaved] = useState<boolean | string>(false);
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
    setIsLiked("pending");
    toggleLike(recipeId, {
      onError: () => setIsLiked(false)
    });
  }
  function handleSave(e: { stopPropagation: () => void }) {
    e.stopPropagation();
    if (isSaved)
      return openModal(
        <ConfirmationModal
          callback={() => {
            setIsSaved("pending");
            toggleSave(recipeId, {
              onError: () => setIsSaved(false),
            });
          }}
        />,
        `confirmDelete`,
      );
    setIsSaved("pending");
    toggleSave(recipeId, {
      onError: () => setIsSaved(false),
    });
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
        <button onClick={handleLike} disabled={isLiked === "pending"}>
          {isLiked === "pending" ? (
            <BarsSpinner className="h-6 w-6" />
          ) : (
            <HiOutlineThumbUp
              className={`iconOutlineStyles ${isLiked && "iconFillStyle"}`}
            />
          )}
        </button>
      )}
      {visibleButtons?.includes("saved") && (
        <button onClick={handleSave} disabled={isSaved === "pending"}>
          {isSaved === "pending" ? (
            <BarsSpinner className="h-6 w-6" />
          ) : (
            <HiOutlineHeart
              className={`iconOutlineStyles ${isSaved && "iconFillStyle"}`}
            />
          )}
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
