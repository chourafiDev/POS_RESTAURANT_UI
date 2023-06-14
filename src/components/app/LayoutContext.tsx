"use client";

import { Transition } from "@headlessui/react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { useState, useEffect, Fragment } from "react";
import NextNProgress from "nextjs-progressbar";

const LayoutContext = ({ children }: { children: React.ReactNode }) => {
  const [showNav, setShowNav] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  function handleResize() {
    if (innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (typeof window != undefined) {
      addEventListener("resize", handleResize);
    }

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <NextNProgress
        color="#6591ff"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
        options={{ showSpinner: false }}
      />
      <TopBar showNav={showNav} setShowNav={setShowNav} />
      <Transition
        as={Fragment}
        show={showNav}
        enter="transform transition duration-[400ms]"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <SideBar showNav={showNav} />
      </Transition>
      <main
        className={`h-screen pt-16 transition-all duration-[400ms] bg-white ${
          showNav && !isMobile ? "pl-24" : ""
        }`}
      >
        {children}
      </main>
    </>
  );
};

export default LayoutContext;
