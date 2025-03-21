import React from "react";
import SearchRecipeForm from "../_components/forms/SearchRecipeForm";
interface props {
  children: React.ReactNode;
}
export default function layout({ children }: props) {
  return (
    <div className="container  mx-auto p-4 my-8 border dark:border-natural-beige bg-natural-cream">
      <div className="grid grid-cols-3 place-items-center mb-4">
        <div></div>
        <div>
          <h2 className="text-center text-4xl !font-quicksand">Explore Some of recipes </h2>
        </div>
        <div className="justify-self-end pr-5">
          <SearchRecipeForm />
        </div>
      </div>
      <div className="min-h-[60%]">{children}</div>
    </div>
  );
}
