"use client";

import { menu } from "@/utils/assets";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Cart from "../cart/Cart";
import { useAppSelector } from "@/redux/hooks";

const CartButton = () => {
  const [totalQty, setTotalQty] = useState<number | string>("-");
  const { cartItems } = useAppSelector((state) => state.cart);

  // handle opne drawer
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const hideDrawer = () => {
    setOpen(false);
  };

  useEffect(() => {
    setTotalQty(Number(cartItems.reduce((a, c) => a + c.qty, 0)));
  }, [cartItems]);

  return (
    <>
      <div className="fixed top-56 right-0 z-30">
        <div
          onClick={showDrawer}
          className="bg-brand py-1 pl-1 pr-3 rounded-s-full flex items-center gap-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full relative bg-white flex justify-center items-center">
            <Image
              src={menu}
              alt="menu"
              width={28}
              height={28}
              className="spin"
            />
          </div>
          <p className="text-white font-medium text-[18px]">{totalQty}</p>
        </div>
      </div>

      <Cart hideDrawer={hideDrawer} open={open} />
    </>
  );
};

export default CartButton;
