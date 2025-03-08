import SignOutButton from "./SignOutButton";
import React from "react";
interface props {
  children: React.ReactNode
}
function UserNavigation({children}: props) {
  return (
    <nav className="flex h-full flex-col justify-between">
      {children}
      <ul>
        <SignOutButton />
      </ul>
    </nav>
  );
}

export default UserNavigation;
