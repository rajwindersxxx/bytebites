import React from "react";

import ProfilePanel from "../features/Navigation/ProfilePanel";
import Logo from "../ui/Logo";
import Navigation from "../features/Navigation/Navigation";
import ToggleMenu from "./ToggleMenu";

export default function Header() {
  return (
    <div className="h-12 bg-natural-beige px-2 fixed top-0 z-50 w-full">
      <div className="mx-auto grid h-full grid-cols-[0.16fr_1fr_0.15fr] items-center text-orange-900 dark:text-orange-300 gap-4">
        <Logo />
        <Navigation />
        <div className="flex gap-4 justify-self-end">
          <ProfilePanel />
          <ToggleMenu />
        </div>
      </div>
    </div>
  );
}
