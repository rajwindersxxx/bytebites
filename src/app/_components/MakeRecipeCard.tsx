"use client";
import { uniqueId } from "lodash";
import { SecondaryButton } from "./Buttons";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { makeARecipe } from "../_actions/action";
import { useRouter } from "next/navigation";
import MiniSpinner from "./MiniSpinner";

function MakeRecipeCard() {
  const router = useRouter();
  const { handleSubmit, register, reset } = useForm<{
    ingredients: string[];
  }>();
  const [isLoading, setIsLoading] = useState(false);
  const tags = [
    "Tomatoes",
    "Onion",
    "Garlic",
    "Olive Oil",
    "Salt",
    "Black Pepper",
    "Basil",
    "Chicken Breast",
    "Rice",
    "Water",
    "Lemon",
    "Honey",
    "Soy sauce",
    "Ginger",
    "Broccoli",
  ];

  async function handleForm(data: { ingredients: string[] }) {
    setIsLoading(true);
    if (data.ingredients.length > 2) {
      const transformedData = data.ingredients.map((item) => {
        return { value: item };
      });
      const output = await makeARecipe({ ingredient: transformedData });
      sessionStorage.setItem("generatedRecipe", JSON.stringify(output));
      router.push("/generateRecipe/generatedRecipe");
    }else {
      return null //
    }
    reset();
    setIsLoading(false);
  }
  return (
    <div className="col-span-1 bg-slate-200 p-4 dark:bg-slate-800">
      <h1 className="mb-4 text-xl uppercase">make quick recipe</h1>
      <form
        className="flex flex-col justify-between"
        onSubmit={handleSubmit(handleForm)}
      >
        <div className="peer h-40 overflow-x-auto text-center">
          {tags.map((item, i) => (
            <label
              htmlFor={`ingredient${i}`}
              className="has-checked m-1 inline-block cursor-pointer rounded-md bg-slate-400 px-1 dark:bg-slate-900 has-[:checked]:dark:bg-slate-600"
              key={uniqueId()}
            >
              {item}
              <input
                type="checkbox"
                id={`ingredient${i}`}
                value={item}
                className="hidden"
                {...register(`ingredients` ,{required: 'please choose at least 3 ingredients'})}
              />
            </label>
          ))}
        </div>
        <div className="text-center">
          <SecondaryButton type="submit" className="w-36">
            {isLoading ? <MiniSpinner /> : "Make A.I recipe"}
          </SecondaryButton>
        </div>
      </form>
    </div>
  );
}

export default MakeRecipeCard;
