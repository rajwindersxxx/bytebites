import type { Metadata } from "next";
import { Poppins, Quicksand } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { QueryProvider } from "./context/providers";
import Footer from "./_components/Footer";
import SessionAuthProvider from "./context/SessionAuthProvider";
import { RecipeDataContext } from "./context/RecipeDataContext";
import { ShoppingContext } from "./context/ShoppingListContext";
import { ModalProvider } from "./_components/Modal";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  variable: "--font-Poppins",
  weight: ["400", "600"],
  subsets: ["latin"],
});
const quicksand = Quicksand({
  variable: "--font-quickSand",
  weight: ["400", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | BiteBytes",
    default: "Welcome | BiteBytes",
  },
  description:
    "Interactive AI-powered recipe generator and meal planner. Users enter ingredients they have at home, and the system generates a recipe for them using AI. They can also save meals, plan their week, and get shopping lists based on their selections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` ${poppins.variable} ${quicksand.variable} dark transition-colors`}
    >
      <body
        className={`grid h-screen grid-rows-[auto_1fr_auto] bg-natural-cream font-poppins text-gray-800 dark:text-gray-300`}
      >
        <SessionAuthProvider>
          <QueryProvider>
            <RecipeDataContext>
              <ShoppingContext>
                <ModalProvider>
                  <Header />
                  <main>{children}</main>
                  <Footer />
                  <Toaster
                    toastOptions={{
                      className:
                        "!text-primary !dark:text-accent !bg-natural-cream !dark:bg-natural-accent !border-primary !border !dark:border-secondary",
                      position: "bottom-center",
                    }}
                  />
                </ModalProvider>
              </ShoppingContext>
            </RecipeDataContext>
          </QueryProvider>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
