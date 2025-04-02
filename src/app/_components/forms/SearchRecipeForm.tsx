"use client";
import React, { useState } from "react";
import Input from "../ui/Input";
import { PrimaryButton } from "../ui/Buttons";
import { useCustomParams } from "@/app/_hooks/useCustomParams";

export default function SearchRecipeForm() {
  const [search, setSearch] = useState("");
  const { setParams } = useCustomParams();

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (search.length < 3) return;
    setParams({ search: search }, "/filter");
  }
  return (
    <form className="flex gap-4" onSubmit={handleSubmit}>
      <Input
        placeHolder="Enter recipe to search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <PrimaryButton type="submit">Search</PrimaryButton>
    </form>
  );
}
