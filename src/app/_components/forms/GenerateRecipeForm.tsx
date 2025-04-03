"use client";
import React, { useState } from "react";

import { uniqueId } from "lodash";
import { useFieldArray, useForm } from "react-hook-form";
import { makeARecipe } from "@/app/_actions/recipesActions";
import Input from "../ui/Input";
import { IconButton, SecondaryButton } from "../ui/Buttons";
import Spinner from "../ui/Spinner";
import RecipePreview from "../features/recipe/RecipePreview";
type Data = {
  ingredient: {
    value: string;
  }[];
};
export default function GenerateRecipeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [recipePreview, setRecipePreview] = useState<string | null>(null);
  const { control, register, handleSubmit, reset } = useForm<Data>({
    defaultValues: {
      ingredient: [{ value: "" }, { value: "" }, { value: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredient",
  });

  async function onSubmit(data: Data) {
    setIsLoading(true);
    const output = await makeARecipe(data);
    sessionStorage.setItem("generatedRecipe", JSON.stringify(output));
    const previewData = "review" in output ? output.review : null;
    setRecipePreview(previewData);
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
              key={uniqueId()}
              {...register(`ingredient.${index}.value`, {
                required: `ingredient ${index - 1} is required`,
              })}
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
          <IconButton
            type="button"
            onClick={() => remove(-1)}
            disabled={isLoading}
          >
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
      {isLoading && <Spinner />}
      {recipePreview && <RecipePreview review={recipePreview} />}
    </>
  );
}
