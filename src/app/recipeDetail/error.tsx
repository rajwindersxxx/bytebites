"use client";

import { useRouter } from "next/navigation";
import { SecondaryButton } from "../_components/ui/Buttons";

export default function ErrorComponent() {
  const route = useRouter();
  return (
    <div className="flex h-[91vh] flex-col items-center justify-center gap-8 text-center">
      <h1 className="text-3xl font-semibold">Recipe Do not Exists :(</h1>
      {/* <p className="text-lg">{error.message}</p> */}
      <SecondaryButton
        className="bg-accent-500 text-primary-800 inline-block px-6 py-3 text-lg"
        onClick={() => route.replace("/")}
      >
        Go back
      </SecondaryButton>
    </div>
  );
}
