"use client";

import { SecondaryButton } from "../_components/button";

interface ErrorProps {
  error: {
    message: string;
  };
  reset: () => void;
}

export default function error({ error, reset }: ErrorProps) {
  return (
    <div className="flex justify-center flex-col gap-8 items-center h-[65vh] text-center">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>
      <SecondaryButton
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        onClick={reset}
      >
        Try again
      </SecondaryButton>
    </div>
  );
}
