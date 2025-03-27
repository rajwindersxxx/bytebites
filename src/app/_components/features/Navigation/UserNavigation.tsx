import React from "react";
import SignOutButton from "../../ui/SignOutButton";
interface props {
  children: React.ReactNode;
}
function UserNavigation({ children }: props) {
  return (
    <nav className="bg-natural-beige fixed top-12 h-[calc(100%-3rem)] left-0 w-9 overflow-hidden transition-all hover:w-48 hover:shadow-md z-40 ">
      <div className="w-48 h-full flex justify-between flex-col">
        {children}
        <ul>
          <SignOutButton />
        </ul>
      </div>
    </nav>
  );
}

export default UserNavigation;
