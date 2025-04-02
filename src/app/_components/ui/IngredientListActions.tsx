"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SecondaryButton } from "./Buttons";
import { useSession } from "next-auth/react";
import { checkAllItems, clearShoppingList } from "@/app/_actions/shopping";
import MiniSpinner from "./MiniSpinner";
import { useUserShoppingList } from "@/app/_hooks/useUserShoppingList";

function IngredientListActions() {
  const { data: ingredientData } = useUserShoppingList();

  const queryClient = useQueryClient();
  const session = useSession();
  const userId = session.data?.user?.id;
  const { mutate: clearList, isPending: pendingClear } = useMutation({
    mutationFn: () => clearShoppingList(Number(userId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userShoppingList"] });
    },
  });
  const { mutate: checkAllCartItems, isPending: pendingCheck } = useMutation({
    mutationFn: () => checkAllItems(Number(userId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userShoppingList"] });
    },
  });
  if (ingredientData && ingredientData?.length > 1)
    return (
      <div className="flex justify-end gap-4 px-4 pt-4">
        <SecondaryButton onClick={clearList} disabled={pendingClear}>
          {pendingClear ? <MiniSpinner /> : "Delete all"}
        </SecondaryButton>
        <SecondaryButton onClick={checkAllCartItems} disabled={pendingCheck}>
          {pendingCheck ? <MiniSpinner /> : "check all"}
        </SecondaryButton>
      </div>
    );
  return null;
}

export default IngredientListActions;
