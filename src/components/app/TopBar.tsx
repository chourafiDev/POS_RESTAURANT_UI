import React, { FC, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbLayoutGrid } from "react-icons/tb";
import User from "../User";
import moment from "moment";

interface SideBarProps {
  showNav: boolean;
  setShowNav: (item: boolean) => void;
}

const TopBar: FC<SideBarProps> = ({ showNav, setShowNav }) => {
  const [fullDate, setFullDate] = useState("");

  useEffect(() => {
    setFullDate(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }, [fullDate]);

  return (
    <div
      className={`fixed w-full h-16 pr-8 bg-white flex justify-between items-center transition-all duration-[400ms] border-b border-gray/20 z-10 ${
        showNav ? "pl-64" : "pl-5"
      }`}
    >
      <button
        onClick={() => setShowNav(!showNav)}
        className="w-9 h-9 flex cursor-pointer justify-center items-center rounded-full border border-gray/50 bg-gray-light/10 text-gray"
      >
        {showNav ? (
          <FaChevronLeft color="#cacaca" />
        ) : (
          <FaChevronRight color="#cacaca" />
        )}
      </button>

      <div className="flex items-center gap-3">
        <p className="text-gray/70 text-sm tracking-wide mr-6">{fullDate}</p>
        <div className="w-10 h-10 rounded-full flex justify-center items-center border border-gray-light bg-white shadow-md shadow-gray/10 cursor-pointer">
          <TbLayoutGrid size={20} color="#c4c4c4" />
        </div>
        <div className="w-10 h-10 rounded-full flex justify-center items-center border border-gray-light bg-white shadow-md shadow-gray/10 cursor-pointer">
          <IoMdNotificationsOutline size={20} color="#c4c4c4" />
        </div>
        <div className="h-10 w-px bg-gray/20 mx-2"></div>
        <User />
      </div>
    </div>
  );
};

export default TopBar;
