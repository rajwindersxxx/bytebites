import React from "react";
import SignOutButton from "../../ui/SignOutButton";
interface props {
  children: React.ReactNode;
}
function UserNavigation({ children }: props) {
  return (
      <nav className="fixed left-0 top-12 z-40 h-[calc(100%-3rem)] w-9 overflow-hidden bg-natural-beige transition-all hover:w-48 hover:shadow-md">
        <div className="flex h-full w-48 flex-col justify-between">
          {children}
          <ul>
            <SignOutButton />
          </ul>
        </div>
      </nav>
  );
}

export default UserNavigation;
