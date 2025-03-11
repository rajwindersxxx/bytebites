"use client";
import { uniqueId } from "lodash";
import { SecondaryButton } from "./Buttons";
import { useForm } from "react-hook-form";

function MakeRecipeCard() {
  const {handleSubmit, register , reset} =useForm();
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
  function handleForm(data){
  console.log(data)
  reset();
  }
  return (
    <div className="col-span-1 bg-slate-200 p-4 dark:bg-slate-800">
      <h1 className="mb-4 text-xl uppercase">make quick recipe</h1>
      <form className="flex flex-col justify-between" onSubmit={handleSubmit(handleForm)}>
        <div className="peer h-40 text-center overflow-x-auto">
          {tags.map((item, i) => (
            <label
              htmlFor={`ingredient${i}`}
              className="has-checked m-1 inline-block cursor-pointer rounded-md bg-slate-400 px-1 dark:bg-slate-900 has-[:checked]:dark:bg-slate-600"
              key={uniqueId()}
            >
              {item}
              <input type="checkbox" id={`ingredient${i}`} value={item} className="hidden" {...register(`ingredient${i}`)}/>
            </label>
          ))}
        </div>
        <div className="text-center">
          <SecondaryButton>Make A.I reicpe</SecondaryButton>
        </div>
      </form>
    </div>
  );
}

export default MakeRecipeCard;
