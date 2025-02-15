import React from 'react';
import Input from './Input';
import { IconButton, PrimaryButton, SecondaryButton } from './button';

export default function GenerateRecipeForm() {
  return (
    <>
      <h2 className="text-4xl mb-4">Generate Recipe using AI </h2>
      <form className="flex flex-col gap-8">
        <div className="grid lg:grid-cols-[1fr_1fr_auto] md:grid-cols-[1fr_auto] gap-4">
          <Input placeHolder="Enter Ingredient 1" />
          <Input placeHolder="Enter recipe to search" />
          <Input placeHolder="Enter recipe to search" />
          <Input placeHolder="Enter recipe to search" />
          <Input placeHolder="Enter recipe to search" />
          <Input placeHolder="Enter recipe to search" />
          <Input placeHolder="Enter recipe to search" />
          <div className="flex flex-start gap-4 self-center">
            <IconButton type="button">+</IconButton>
            <IconButton type="button">-</IconButton>
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <PrimaryButton type="submit">Find recipe</PrimaryButton>
          <SecondaryButton type="submit">Generate with AI</SecondaryButton>
        </div>
      </form>
    </>
  );
}
