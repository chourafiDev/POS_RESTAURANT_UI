"use client";
import { menu } from "@/utils/data";
import React from "react";
import MenuItem from "./MenuItem";

const Menu = () => {
  return (
    <>
      <h2 className="text-dark font-medium text-xl mb-2">
        Special menu for you
      </h2>

      <div className="grid grid-cols-5 gap-6">
        {menu.map((menu) => (
          <MenuItem menu={menu} key={menu.id} />
        ))}
      </div>
    </>
  );
};

export default Menu;
