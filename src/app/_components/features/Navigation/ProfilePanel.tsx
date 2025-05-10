"use client";
import Link from "next/link";
import React from "react";
import {
  HiOutlineLogin,
  HiOutlineMoon,
  HiOutlineShoppingCart,
  HiOutlineSun,
  HiOutlineUserCircle,
} from "react-icons/hi";
import { useSession } from "next-auth/react";
import { useDarkMode } from "../../../_hooks/useDarkMode";
import UserProfileMenu from "../../ui/UserProfileMenu";
import { useToggleMenu } from "../../../_hooks/useToogleMenu";
import { useUserShoppingList } from "@/app/_hooks/useUserShoppingList";
import { IoDiamond } from "react-icons/io5";
import useUserData from "@/app/_hooks/useUserData";
import { useModal } from "../../ui/Modal";
import UserPointsModal from "../../ui/UserPointsModal";

export default function ProfilePanel() {
  const { openModal } = useModal();
  const session = useSession();
  const { isMenuOpen, menuRef, buttonRef } = useToggleMenu();
  const { toggleDarkMode, darkMode } = useDarkMode();
  const { userShoppingList } = useUserShoppingList();
  const { userData } = useUserData();
  const pendingItemsCount = userShoppingList?.filter(
    (item) => item.isPurchased === false,
  ).length;
  function handleClick() {
    openModal(
      <UserPointsModal totalPoints={Number(userData?.userPoints)} />,
      "userPoints",
    );
  }
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
          <button className="relative" onClick={handleClick}>
            <IoDiamond className="h-5 w-5" />
            <span className="absolute -bottom-2 -right-2 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-natural-cream text-xs">
              {userData?.userPoints}
            </span>
          </button>
          <Link href={"/shoppingList"} className="relative">
            <HiOutlineShoppingCart className="h-5 w-5" />
            {pendingItemsCount !== 0 && (
              <>
                <span className="absolute -bottom-2 -right-2 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-natural-cream text-xs">
                  {pendingItemsCount}
                </span>
              </>
            )}
          </Link>
          <button ref={buttonRef} className="relative flex gap-4">
            <HiOutlineUserCircle className="h-6 w-6" />
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
