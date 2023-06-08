import React, { FC } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbLayoutGrid } from "react-icons/tb";
import User from "../User";

interface SideBarProps {
  showNav: boolean;
  setShowNav: (item: boolean) => void;
}

const TopBar: FC<SideBarProps> = ({ showNav, setShowNav }) => {
  return (
    <div
      className={`fixed w-full h-14 pr-5 bg-white flex justify-between items-center transition-all duration-[400ms] border-b border-gray/20 z-10 ${
        showNav ? "pl-64" : "pl-5"
      }`}
    >
      <button
        onClick={() => setShowNav(!showNav)}
        className="w-8 h-8 rounded-full border border-gray flex justify-center items-center"
      >
        {showNav ? (
          <FaChevronLeft color="#808080" />
        ) : (
          <FaChevronRight color="#808080" />
        )}
      </button>

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full flex justify-center items-center">
          <TbLayoutGrid size={20} />
        </div>
        <div className="w-8 h-8 rounded-full flex justify-center items-center">
          <IoMdNotificationsOutline size={20} />
        </div>
        <div className="h-10 w-1 bg-gray"></div>
        {/* User */}
        <User />
      </div>
    </div>
  );
};

export default TopBar;
