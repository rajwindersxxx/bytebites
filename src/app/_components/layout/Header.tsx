import React from "react";

import ProfilePanel from "../features/Navigation/ProfilePanel";
import Logo from "../ui/Logo";
import Navigation from "../features/Navigation/Navigation";
import ToggleMenu from "./ToggleMenu";

export default function Header() {
  return (
    <div className="fixed top-0 z-50 h-12 w-full bg-natural-beige px-2">
      <div className="mx-auto grid h-full grid-cols-[1fr_auto_1fr_auto] items-center gap-4 text-orange-900 dark:text-orange-300">
        <Logo />
        <Navigation />
        <ProfilePanel />
        <ToggleMenu />
      </div>
    </div>
  );
}
