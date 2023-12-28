import Image from "next/image";
import React, { FC } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

interface SideBarLogoProps {
  collapsed: boolean;
  setCollapsed: (item: boolean) => void;
}

const SideBarLogo: FC<SideBarLogoProps> = ({ collapsed, setCollapsed }) => {
  return (
    <div className="bg-[#1B1D23] flex items-center gap-5 px-4 py-4">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-8 h-8 flex items-center justify-center"
      >
        {collapsed ? (
          <MenuFoldOutlined
            className="text-white"
            style={{ fontSize: "120%" }}
          />
        ) : (
          <MenuUnfoldOutlined
            className="text-white"
            style={{ fontSize: "120%" }}
          />
        )}
      </button>
      {!collapsed && (
        <picture>
          <Image
            src="/assets/imgs/logo.svg"
            alt="logo"
            width={90}
            height={30}
          />
        </picture>
      )}
    </div>
  );
};

export default SideBarLogo;
