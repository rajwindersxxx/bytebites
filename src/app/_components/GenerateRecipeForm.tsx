"use client";
import React, { useState } from "react";
import Input from "./Input";
import { IconButton, SecondaryButton } from "./Buttons";
import { useFieldArray, useForm } from "react-hook-form";
import { SITE_URL } from "../_config/siteConfig";
type Data = {
  ingredient: {
    value: string;
  }[];
};
export default function GenerateRecipeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { control, register, handleSubmit, reset } = useForm<Data>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredient",
  });

  async function onSubmit(data: Data) {
    setIsLoading(true);
    const ingredients = data.ingredient.map((item) => item.value).join(", ");
    const res = await fetch(`${SITE_URL}/api/aiRecipe?recipe=${ingredients}`);
    const output = await res.json();
    console.log(output);
    reset();
    setIsLoading(false);
  }
  return (
    <>
      <h2 className="mb-4 text-4xl">Generate Recipe using AI </h2>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 md:grid-cols-[1fr_auto] lg:grid-cols-[1fr_1fr_auto]">
          {fields.map((field, index) => (
            <Input
              placeHolder={`Enter Ingredient ${index + 1} `}
              key={field.id}
              {...register(`ingredient.${index}.value`)}
              disabled={isLoading}
            />
          ))}
        </div>
        <div className="flex-start flex gap-4 self-center">
          <IconButton
            type="button"
            onClick={() => append({ value: "" })}
            disabled={isLoading}
          >
            +
          </IconButton>
          <IconButton type="button" onClick={() => remove(-1)} disabled={isLoading}>
            -
          </IconButton>
        </div>
        <div className="flex justify-center gap-4">
          {/* <PrimaryButton type="submit">Find recipe</PrimaryButton> */}
          <SecondaryButton type="submit" disabled={isLoading}>
            Generate with AI
          </SecondaryButton>
        </div>
      </form>
    </>
  );
}
