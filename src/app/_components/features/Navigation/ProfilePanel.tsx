"use client";
import Link from "next/link";
import React from "react";
import { HiOutlineLogin, HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useSession } from "next-auth/react";
import { ImageElement } from "../../ui/ImageElement";
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
          <HiOutlineMoon className="h-6 w-6" />
        ) : (
          <HiOutlineSun className="h-6 w-6" />
        )}
      </button>
      {session.data?.user ? (
        <>
          <button ref={buttonRef} className="relative flex gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-full">
              <ImageElement
                src={session.data.user?.image || ""}
                alt={session.data.user?.name || ""}
              />
            </div>
            {isMenuOpen && <UserProfileMenu ref={menuRef} />}
          </button>
        </>
      ) : (
        <Link href="/login">
          <HiOutlineLogin className="h-6 w-6" />
        </Link>
      )}
    </div>
  );
}
