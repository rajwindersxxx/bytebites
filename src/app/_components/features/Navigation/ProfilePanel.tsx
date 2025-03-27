"use client";
import Link from "next/link";
import React from "react";
import {
  HiOutlineLogin,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineUserCircle,
} from "react-icons/hi";
import { useSession } from "next-auth/react";
import { useDarkMode } from "../../../_hooks/useDarkMode";
import UserProfileMenu from "../../ui/UserProfileMenu";
import { useToggleMenu } from "../../../_hooks/useToogleMenu";

export default function ProfilePanel() {
  const session = useSession();
  const { isMenuOpen, menuRef, buttonRef } = useToggleMenu();
  const { toggleDarkMode, darkMode } = useDarkMode();
  return (
    <div className="flex items-center gap-4 justify-self-end">
      <button onClick={toggleDarkMode}>
        {darkMode ? (
          <HiOutlineMoon className="h-5 w-5" />
        ) : (
          <HiOutlineSun className="h-5 w-5" />
        )}
      </button>
      {session.data?.user ? (
        <>
          <button ref={buttonRef} className="relative flex gap-4">
          <HiOutlineUserCircle className="h-6 w-6"/>
            {isMenuOpen && <UserProfileMenu ref={menuRef} />}
          </button>
        </>
      ) : (
        <Link href="/login">
          <HiOutlineLogin className="h-5 w-5" />
        </Link>
      )}

    </div>
  );
}
