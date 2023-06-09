"use client";
import { menu } from "@/utils/data";
import React from "react";
import MenuItem from "./MenuItem";

const Menu = () => {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-dark font-medium text-xl mb-3">
          Special menu for you
        </h2>
        <p className="text-sm text-gray font-normal">
          Showing {menu.length} items
        </p>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {menu.map((menu) => (
          <MenuItem menu={menu} key={menu.id} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
