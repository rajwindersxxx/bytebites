import type { Metadata } from "next";
import { Poppins, Quicksand } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "./context/providers";
import SessionAuthProvider from "./context/SessionAuthProvider";
import { RecipeDataContext } from "./context/RecipeDataContext";
import { ShoppingContext } from "./context/ShoppingListContext";
import { ModalProvider } from "./_components/ui/Modal";
import Header from "./_components/layout/Header";
import UserNavLinks from "./_components/ui/UserNavLinks";
import { GUIStateProvider } from "./context/GUIStateProvider";
import FloatingQuickActions from "./_components/ui/FloatingQuickActions";
import Main from "./_components/layout/Main";
import NotificationBox from "./_components/layout/NotificationBox";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` ${poppins.variable} ${quicksand.variable} dark text-sm transition-colors sm:text-base`}
    >
      <body
        className={`bg-natural-cream font-poppins text-gray-800 dark:text-gray-300`}
      >
        <SessionAuthProvider>
          <QueryProvider>
            <GUIStateProvider>
              <RecipeDataContext>
                <ShoppingContext>
                  <ModalProvider>
                    <Header />
                    <UserNavLinks />
                    <FloatingQuickActions />
                    <NotificationBox />
                    <Main>{children}</Main>
                  </ModalProvider>
                </ShoppingContext>
              </RecipeDataContext>
            </GUIStateProvider>
          </QueryProvider>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
