import { RecipeObject } from "../../../types/RecipeTypes";
import { ImageElement } from "../../ui/ImageElement";
import "react-day-picker/style.css";
import CreateMealForm from "../../forms/CreateMealForm";
interface props {
  recipeData: RecipeObject;
}
function MealPlaningModal({ recipeData }: props) {
  const { image, title, servings, readyInMinutes, vegetarian } = recipeData;
  return (
    <div className="grid max-w-[55rem] items-center gap-2 pt-5 md:grid-cols-[1fr_2.3fr] md:gap-12">
      <div className="flex-col gap-4 overflow-hidden first-letter:rounded-md md:flex">
        <div className="relative hidden h-40 md:block">
          <ImageElement src={image} alt={title} className="rounded-md" />
        </div>
        <div>
          <h2 className="text-xl md:mb-4">{title}</h2>
          <div className="hidden justify-between gap-4 md:flex">
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
