import type { Metadata } from "next";
// import { Geist, Geist_Mono } from 'next/font/google';
import "./globals.css";
import Header from "./_components/Header";
import { QueryProvider } from "./context/providers";
import Footer from "./_components/Footer";
import SessionAuthProvider from "./context/SessionAuthProvider";
import { RecipeDataContext } from "./context/RecipeDataContext";
import { ShoppingContext } from "./context/ShoppingListContext";

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: "ByteBite",
  description:
    "Interactive AI-powered recipe generator and meal planner. Users enter ingredients they have at home, and the system generates a recipe for them using AI. They can also save meals, plan their week, and get shopping lists based on their selections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="text-gray-800">
      <body
        className={`grid h-screen grid-rows-[auto_1fr_auto] bg-natural-cream`}
      >
        <SessionAuthProvider>
          <QueryProvider>
            <RecipeDataContext>
              <ShoppingContext>
                <Header />
                <main>{children}</main>
                <Footer />
              </ShoppingContext>
            </RecipeDataContext>
          </QueryProvider>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
