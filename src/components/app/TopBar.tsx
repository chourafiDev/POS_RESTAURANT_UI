import React, { FC, useEffect, useState, Fragment } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbLayoutGrid, TbLogout } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import User from "../User";
import moment from "moment";
import { useRouter } from "next/navigation";

import { Menu, Transition } from "@headlessui/react";
import { useAppDispatch } from "@/redux/hooks";
import { useLogoutMutation } from "@/redux/services/authApiSlice";
import { clearCredentials } from "@/redux/features/authSlice";
import Link from "next/link";

interface SideBarProps {
  showNav: boolean;
  setShowNav: (item: boolean) => void;
}

const TopBar: FC<SideBarProps> = ({ showNav, setShowNav }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [fullDate, setFullDate] = useState("");

  useEffect(() => {
    setFullDate(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }, [fullDate]);

  // handle lougout
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(clearCredentials());
      router.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`fixed w-full h-16 pr-8 bg-white flex justify-between items-center transition-all duration-[400ms] border-b border-gray/20 z-10 ${
        showNav ? "pl-28" : "pl-5"
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
          <IoMdNotificationsOutline size={20} color="#c4c4c4" />
        </div>

        {/* Menu for more options */}
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="w-10 h-10 rounded-full flex justify-center items-center border border-gray-light bg-white shadow-md shadow-gray/10 cursor-pointer">
            <TbLayoutGrid size={20} color="#c4c4c4" />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute shadow-xl shadow-gray-light/30 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/profile"
                      className={`${
                        active ? "bg-brand text-white" : "text-dark"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2`}
                    >
                      <FiUser />
                      Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logoutHandler}
                      className={`${
                        active ? "bg-brand text-white" : "text-dark"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2`}
                    >
                      <TbLogout />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <div className="h-10 w-px bg-gray/20 mx-2"></div>
        <User />
      </div>
    </div>
  );
};

export default TopBar;
