import React, { FC } from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart, removeFromCart } from "@/redux/features/cartSlice";
import { motion } from "framer-motion";

interface OrderProps {
  id: string;
  title: string;
  image: string;
  price: number;
  qty: number;
  options: string[];
  note: string;
}

const Order: FC<OrderProps> = ({
  id,
  title,
  image,
  price,
  qty,
  options,
  note,
}) => {
  const dispatch = useAppDispatch();

  // handel remover from cart
  const handleRemoveFromCart = (orderId: string) => {
    dispatch(removeFromCart(orderId));
  };

  // handle add new item and change quantity
  const decreaseNumberOfOrders = () => {
    dispatch(
      addToCart({
        id,
        title,
        image,
        price,
        options,
        note,
        qty: qty - 1,
      })
    );
  };

  const increaseNumberOfOrders = () => {
    dispatch(
      addToCart({
        id,
        title,
        image,
        price,
        options,
        note,
        qty: qty + 1,
      })
    );
  };

  // variant for framer motion to animate order item when remove it
  const variantB = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <motion.div
      key={id}
      variants={variantB}
      layout
      className="flex items-center gap-3 w-full"
    >
      <div className="w-[80px] h-[70px] relative">
        <Image
          src={image}
          fill
          alt={title}
          className="rounded-lg object-cover"
        />
      </div>

      <div className="w-full space-y-1">
        <div className="flex justify-between items-center">
          <h5 className="text-dark font-medium">{title}</h5>
          <div
            onClick={() => handleRemoveFromCart(id)}
            className="w-5 h-5 rounded-full bg-red flex justify-center items-center cursor-pointer"
          >
            <IoMdClose className="text-white" />
          </div>
        </div>

        <div className="flex justify-between items-center -mt-4">
          <p className="text-gray text-sm">{qty}x</p>
          <p className="text-brand font-medium">${price}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            className={`${
              qty <= 1 && "cursor-not-allowed"
            } w-6 h-6 text-lg rounded-md bg-white border-2 border-brand text-brand outline-none flex justify-center items-center`}
            onClick={decreaseNumberOfOrders}
            disabled={qty <= 1}
          >
            -
          </button>
          <p className="text-dark w-3 flex justify-center">{qty}</p>
          <button
            className="w-6 h-6 text-lg rounded-md bg-brand text-white flex justify-center items-center"
            onClick={increaseNumberOfOrders}
          >
            +
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Order;
