import { RecipeObject } from "../types/RecipeTypes";
import { ImageElement } from "./ImageElement";
import "react-day-picker/style.css";
import CreateMealForm from "./CreateMealForm";
interface props {
  recipeData: RecipeObject;
}
function MealPlaningModal({ recipeData }: props) {
  const { image, title, servings, readyInMinutes, vegetarian } = recipeData;
  return (
    <div className="grid max-w-[55rem] grid-cols-[0.8fr_2fr] gap-4 pt-5">
      <div className="flex flex-col gap-4 overflow-hidden first-letter:rounded-md">
        <div className="relative h-40">
          <ImageElement src={image} alt={title} className="rounded-md" />
        </div>
        <div>
          <h2 className="mb-4 text-xl">{title}</h2>
          <div className="flex justify-between gap-4">
            <p>⏱️ {readyInMinutes} min </p>
            <p>👨‍👩‍👧‍👦 {servings} </p>
            <p>{vegetarian ? "🍀 veg" : "🥩 non-veg"} </p>
          </div>
        </div>
      </div>
      <div>
        <CreateMealForm recipeData={recipeData} />
      </div>
    </div>
  );
}

export default MealPlaningModal;
