import React, { FC, useEffect, useState, Fragment } from "react";
import { GoChevronDown } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbLayoutGrid, TbLogout } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import moment from "moment";
import { useRouter } from "next/navigation";

import { Menu, Transition } from "@headlessui/react";
import { useAppDispatch } from "@/redux/hooks";
import { useLogoutMutation } from "@/redux/services/authApiSlice";
import { clearCredentials } from "@/redux/features/authSlice";
import Link from "next/link";
import { Button, Layout, Popover, Select } from "antd";
import { franceFlag, germanyFlag, usFlag } from "@/utils/assets";
import Image from "next/image";

import { Trans } from "react-i18next/TransWithoutContext";
import { languages } from "@/app/i18n/settings";

const { Header } = Layout;

interface TopBarProps {
  t: any;
  locale: string;
}

const TopBar: FC<TopBarProps> = ({ t, locale }) => {
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
      await logoutApiCall(null).unwrap();
      dispatch(clearCredentials());
      router.push(`/${locale}/login`);
    } catch (err) {
      console.log(err);
    }
  };

  // // Popover content
  const content = (
    <>
      {languages
        .filter((l) => locale !== l)
        .map((l, index) => {
          return (
            <Link
              href={`/${l}/dashboard`}
              key={index}
              className="flex items-center gap-2 w-[120px] my-1"
            >
              <Image
                src={l == "en" ? usFlag : l == "de" ? germanyFlag : franceFlag}
                alt="flag"
                width={20}
                height={12}
              />
              <p>{l == "en" ? "English" : l == "de" ? "Dutch" : "Frensh"}</p>
            </Link>
          );
        })}
    </>
  );

  return (
    <Header className="bg-white flex items-center justify-between px-6">
      <p className="text-gray/70 text-sm tracking-wide">{fullDate}</p>

      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full flex justify-center items-center border border-gray-light bg-white shadow-md shadow-gray/10 cursor-pointer">
          <IoMdNotificationsOutline size={20} color="#c4c4c4" />
        </div>

        {/* Menu for more options */}
        <div className="flex items-center gap-3">
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
              <Menu.Items className="z-10 absolute shadow-xl shadow-gray-light/30 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/profile"
                        className={`${
                          active ? "bg-brand text-white" : "text-dark"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2 hover:text-white`}
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

          <Popover
            placement="bottomRight"
            content={content}
            trigger="click"
            className="border border-none shadow-none"
          >
            <Button className="flex items-center gap-2">
              <Trans i18nKey="languageSwitcher" t={t}>
                <Image
                  src={
                    locale == "en"
                      ? usFlag
                      : locale == "de"
                      ? germanyFlag
                      : franceFlag
                  }
                  alt="flag"
                  width={20}
                  height={12}
                />
                <p className="text-dark font-normal">
                  {locale == "en"
                    ? "English"
                    : locale == "de"
                    ? "Dutch"
                    : "Frensh"}
                </p>
                <GoChevronDown />
              </Trans>
            </Button>
          </Popover>
        </div>
      </div>
    </Header>
  );
};

export default TopBar;
