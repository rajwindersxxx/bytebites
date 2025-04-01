"use client";
import { uniqueId } from "lodash";
import Link from "next/link";
import {
  HiCalendar,
  HiClock,
  HiHeart,
  HiHome,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineShoppingCart,
  HiOutlineThumbUp,
  HiOutlineUser,
  HiShoppingBag,
  HiShoppingCart,
  HiThumbUp,
  HiUser,
} from "react-icons/hi";
import UserNavigation from "../features/Navigation/UserNavigation";
import { usePathname } from "next/navigation";
import { cloneElement } from "react";
import { useSession } from "next-auth/react";

function UserNavLinks() {
  const session = useSession();
  const user = session.data?.user;
  const pathName = usePathname();
  const userNavigation = [
    {
      name: "Home",
      link: "/",
      icon: <HiOutlineHome />,
      active: <HiHome/>
    },
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <HiOutlineClock />,
      active: <HiClock/>
    },
    {
      name: "bookmarked",
      link: "/bookmarks",
      icon: <HiOutlineHeart />,
      active: <HiHeart/>
    },
    {
      name: "Make shopping list",
      link: "/shopping",
      icon: <HiOutlineShoppingBag />,
      active: <HiShoppingBag/>
    },
    {
      name: "Cart",
      link: "/shoppingList",
      icon: <HiOutlineShoppingCart />,
      active: <HiShoppingCart/>
    },
    {
      name: "Meal Planning",
      link: "/mealPlanner",
      icon: <HiOutlineCalendar />,
      active: <HiCalendar/>
    },
    {
      name: "Likes",
      link: "/likes",
      icon: <HiOutlineThumbUp />,
      active: <HiThumbUp/>
    },
    {
      name: "Profile",
      link: "/profile",
      icon: <HiOutlineUser />,
      active: <HiUser/>
    },
  ];
  if (!user) return null;
  return (
    <UserNavigation>
      <ul className="w-42">
        {userNavigation.map((item) => (
          <li key={uniqueId()}>
            <Link
              href={item.link}
              prefetch={true}
              className={`my-2 flex items-center justify-start gap-2 p-2 transition-all hover:bg-accent ${item.link === pathName && "bg-natural-beige"}`}
            >

              {item.link === pathName  ?  cloneElement(item.active, {
                className: `h-5 w-5`,
              }) : cloneElement(item.icon, {
                className: `h-5 w-5`,
              })}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </UserNavigation>
  );
}

export default UserNavLinks;
