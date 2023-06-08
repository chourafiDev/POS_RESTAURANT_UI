import React, { FC } from "react";

interface SideBarProps {
  showNav: boolean;
  setShowNav: (item: boolean) => void;
}

const TopBar: FC<SideBarProps> = ({ showNav, setShowNav }) => {
  return (
    <div
      className={`fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms] ${
        showNav ? "pl-56" : ""
      }`}
    >
      <div className="px-4 md:px-16">
        <p onClick={() => setShowNav(!showNav)}>close</p>
      </div>
    </div>
  );
};

export default TopBar;
