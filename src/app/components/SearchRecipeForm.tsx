import React from 'react';
import Input from './Input';
import { PrimaryButton } from './button';

export default function SearchRecipeForm() {
  return (
    <form className="flex gap-4">
      <Input placeHolder="Enter recipe to search" />
      <PrimaryButton type="submit">Search</PrimaryButton>
    </form>
  );
}
