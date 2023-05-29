"use client";

import { useState, useMemo } from "react";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
  const menuItems = [
    {
      id: 1,
      title: "Home",
      link: "/",
    },
    {
      id: 2,
      title: "Users",
      link: "/users",
    },
    {
      id: 3,
      title: "About",
      link: "/about",
    },
    {
      id: 4,
      title: "Setting",
      link: "/setting",
    },
  ];

  const [toggleCollaps, setToggleCollapse] = useState(false);
  const pathname = usePathname();

  const activeMenu = useMemo(
    () => menuItems.find(({ link }) => link === pathname),
    [pathname]
  );

  const wrapperClasses = classNames(
    "h-screen flex flex-col justify-between p-4 bg-white",
    {
      ["w-72"]: !toggleCollaps,
      ["w-20"]: toggleCollaps,
    }
  );

  const getNavItmsClasses = (menu: string) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-white rounded w-full overflow-hidden whitespace-nowrap",
      { ["bg-brand/30"]: activeMenu?.title === menu }
    );
  };

  const hundleToggle = () => {
    setToggleCollapse(!toggleCollaps);
  };

  return (
    <div
      className={wrapperClasses}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div>
        {/* Logo */}
        <div className="flex items-center justify-between">
          <p>Logo</p>
          <button onClick={hundleToggle}>toggle</button>
        </div>

        {/* Navigation items */}
        <ul className="flex flex-col gap-2 mt-24">
          {menuItems.map(({ id, title, link }) => {
            const classes = getNavItmsClasses(title);
            return (
              <li className={classes} key={id}>
                <Link href={link}>{title}</Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <p>Logout</p>
      </div>
    </div>
  );
};

export default Sidebar;
