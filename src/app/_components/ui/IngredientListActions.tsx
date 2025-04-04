"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SecondaryButton } from "./Buttons";
import { useSession } from "next-auth/react";
import { checkAllItems, clearShoppingList } from "@/app/_actions/shopping";
import MiniSpinner from "./MiniSpinner";
import { useUserShoppingList } from "@/app/_hooks/useUserShoppingList";
import { HiCheck, HiOutlineTrash } from "react-icons/hi";

function IngredientListActions() {
  const { userShoppingList } = useUserShoppingList();

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
  if (userShoppingList && userShoppingList?.length >= 1)
    return (
      <div className="flex gap-4 justify-end flex-1">
        <SecondaryButton onClick={clearList} disabled={pendingClear}>
          {pendingClear ? <MiniSpinner /> : <HiOutlineTrash/>}
        </SecondaryButton>
        <SecondaryButton onClick={checkAllCartItems} disabled={pendingCheck}>
          {pendingCheck ? <MiniSpinner /> : <HiCheck/>}
        </SecondaryButton>
      </div>
    );
  return null;
}

export default IngredientListActions;
