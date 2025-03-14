import React from "react";

import ProfilePanel from "../features/Navigation/ProfilePanel";
import Logo from "../ui/Logo";
import Navigation from "../features/Navigation/Navigation";

export default function Header() {
  return (
    <div className="h-20 bg-natural-beige">
      <div className="container mx-auto grid h-full grid-cols-[1fr_auto_1fr] items-center text-orange-900 dark:text-orange-300">
        <Logo />
        <Navigation />
        <ProfilePanel />
      </div>
    </div>
  );
}
