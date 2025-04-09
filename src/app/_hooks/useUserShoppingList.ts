import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserShoppingList,
  makeAShoppingList,
  removeShoppingListItem,
  updateShoppingItemStates,
} from "../_actions/shopping";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useShoppingData } from "../_context/ShoppingListContext";
import { ExtendedIngredients, UserShoppingList } from "../_types/RecipeTypes";

export function useUserShoppingList() {
  const session = useSession();
  const userId = session.data?.user?.id;
  const QueryClient = useQueryClient();
  const {
    data: userShoppingList,
    error,
    isLoading,
  } = useQuery({
    queryFn: () => {
      if (!userId) throw new Error("userId undefined ");
      return getUserShoppingList();
    },
    queryKey: ["userShoppingList"],
    enabled: Boolean(userId),
    staleTime: Infinity,
  });
  const { recipeInCart, ingredientCart, clearLocalStorageCart } =
    useShoppingData();
  const { mutate: createShoppingList, isPending: isCreating } = useMutation({
    mutationFn: (storedList?: UserShoppingList[] | void) =>
      makeAShoppingList(
        recipeInCart,
        ingredientCart,
        Number(userId),
        storedList,
      ),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Shopping List created successfully");
      QueryClient.invalidateQueries({ queryKey: ["userShoppingList"] });
      clearLocalStorageCart();
    },
  });
  // this is only for one item to cart
  const { mutate: addIngredientToCart, isPending: addingIngredientToCart } =
    useMutation({
      mutationFn: ({
        storedList,
        ingredientCart,
      }: {
        storedList: UserShoppingList[] | void;
        ingredientCart: ExtendedIngredients[];
      }) =>
        makeAShoppingList(
          recipeInCart, //this is empty in this case
          ingredientCart,
          Number(userId),
          storedList,
        ),
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: () => {
        toast.success("Shopping List created successfully");
        QueryClient.invalidateQueries({ queryKey: ["userShoppingList"] });
        clearLocalStorageCart();
      },
    });
  const {
    mutate: removeUserShoppingItem,
    isPending: removingUserShoppingItem,
  } = useMutation({
    mutationFn: (ingredientId: number) =>
      removeShoppingListItem(ingredientId),
    onSuccess: () => {
      toast.success("Item is removed form shopping list");
      QueryClient.invalidateQueries({ queryKey: ["userShoppingList"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: updateShoppingStatus, isPending: updatingShoppingStatus } =
    useMutation({
      mutationFn: ({
        ingredientId,
        purchasedStatus,
      }: {
        ingredientId: number;
        purchasedStatus: boolean;
      }) =>
        updateShoppingItemStates(ingredientId, purchasedStatus),
      onSuccess: () => {
        toast.success("Item status updated ");
        QueryClient.invalidateQueries({ queryKey: ["userShoppingList"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  return {
    userShoppingList,
    error,
    isLoading,
    removeUserShoppingItem,
    updateShoppingStatus,
    createShoppingList,
    addIngredientToCart,
    addingIngredientToCart,
    removingUserShoppingItem,
    updatingShoppingStatus,
    isCreating,
  };
}
