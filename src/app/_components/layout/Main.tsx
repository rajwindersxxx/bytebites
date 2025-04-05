'use client'
import { useSession } from "next-auth/react";

type MainProps = {
  children: React.ReactNode;
};

export default function Main({ children }: MainProps) {
  const { data: session } = useSession();

  return (
    <main className={`mt-12 ${session?.user ? "ml-8" : ""}`}>
      {children}
    </main>
  );
}
