import Link from "next/link";
import { Ref } from "react";
import useUserAuth from "@/app/_hooks/useUserAuth";

interface props {
  ref?: Ref<HTMLDivElement>;
}
function UserProfileMenu({ ref }: props) {
  const { userSignOut } = useUserAuth();
  const menuButtons = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Bookmarks", link: "/bookmarks" },
    { name: "Shopping List", link: "/shopping" },
  ];
  return (
    <div
      ref={ref}
      className="absolute -right-0 top-[50px] z-40 min-w-36 rounded-md border border-accent bg-natural-beige text-start shadow-md"
    >
      <ul className="flex w-full flex-col items-stretch p-2">
        {menuButtons.map((item) => (
          <li key={item.name}>
            <Link
              href={item.link}
              className="block rounded-sm p-1 transition-all hover:bg-accent"
            >
              {item.name}
            </Link>
          </li>
        ))}
        <li>
          <a
            onClick={() => userSignOut()}
            className="block w-full rounded-sm p-1 text-start transition-all hover:bg-accent"
          >
            SignOut
          </a>
        </li>
      </ul>
    </div>
  );
}

export default UserProfileMenu;
