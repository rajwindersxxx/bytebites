"use client";

import { SecondaryButton } from "./_components/ui/Buttons";

interface ErrorProps {
  error: {
    message: string;
  };
  reset: () => void;
}

export default function error({ error, reset }: ErrorProps) {
  return (
    <div className="flex h-[91vh] flex-col items-center justify-center gap-8 text-center">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>
      <SecondaryButton
        className="bg-accent-500 text-primary-800 inline-block px-6 py-3 text-lg"
        onClick={reset}
      >
        Try again
      </SecondaryButton>
    </div>
  );
}
