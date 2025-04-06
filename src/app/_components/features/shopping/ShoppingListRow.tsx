import { HiOutlineTrash } from "react-icons/hi";

import { memo, useEffect, useState } from "react";
import { useUserShoppingList } from "@/app/_hooks/useUserShoppingList";
import { ImageElement } from "../../ui/ImageElement";
import { INGREDIENT_IMAGE_URL } from "@/app/_config/foodApiConfig";
import { textToEmoji } from "@/app/_helper/clientheper";
import Checkbox from "../../ui/Checkbox";
import { UserShoppingList } from "@/app/_types/RecipeTypes";

interface props {
  data: UserShoppingList;
  index: number;
}

const ShoppingListRow = memo(function ShoppingListRow({ data, index }: props) {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const {
    id,
    name,
    amount,
    unit,
    image,
    consistency,
    created_at,
    isPurchased,
  } = data;
  useEffect(() => {
    setIsChecked(isPurchased);
  }, [isPurchased]);
  const { updateShoppingStatus, removeUserShoppingItem } =
    useUserShoppingList();
  function handleStatusUpdate(e: React.ChangeEvent<HTMLInputElement>): void {
    setIsChecked(e.target.checked);
    updateShoppingStatus({ ingredientId: id, purchasedStatus: !isChecked });
  }
  function handleDeleteItem() {
    removeUserShoppingItem(id);
  }
  return (
    <div className="grid w-full grid-cols-[0.3fr_0.4fr_1.4fr_1fr_0.4fr_1fr_0.2fr] items-center gap-4 rounded border-b-red-500 p-2">
      <div>{index + 1}.</div>
      <div>
        <div className="relative h-8 w-8 overflow-hidden rounded-full">
          <ImageElement
            src={INGREDIENT_IMAGE_URL + "/" + image}
            alt={`ing.name`}
          />
        </div>
      </div>
      <p>{name}</p>
      <p>
        {Math.round(amount * 1000) / 1000} {unit ? unit : name}
      </p>
      <p>{textToEmoji(consistency)}</p>
      <p className="hidden md:block">{created_at?.split("T")[0]}</p>
      <div className="flex justify-end gap-4">
        <Checkbox onChange={handleStatusUpdate} checked={isChecked} />
        <button onClick={handleDeleteItem}>
          <HiOutlineTrash className="h-4 w-4 stroke-accent" />
        </button>
      </div>
    </div>
  );
});

export default ShoppingListRow;
