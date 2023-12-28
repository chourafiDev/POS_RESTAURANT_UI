import { FC, useState } from "react";
import { motion } from "framer-motion";
import OrderDetails from "./OrderDetails";
import { OrderedList } from "@/types";

interface OrderProps {
  order: OrderedList;
  hundleClickOrder: (orderId: string) => void;
  orderSelected: string;
}

const Order: FC<OrderProps> = ({
  order: { orderId, table, Qta, time, price },
  hundleClickOrder,
  orderSelected,
}) => {
  // handle opne drawer
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const hideDrawer = () => {
    setOpen(false);
  };

  const cardVariant = {
    active: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    inactive: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <motion.div
        key={orderId}
        className={`flex justify-between items-center rounded-xl bg-white py-3 px-4 cursor-pointer ${
          orderId === orderSelected
            ? "border border-brand"
            : "border border-gray-light/50"
        }`}
        variants={cardVariant}
        onClick={() => {
          showDrawer(), hundleClickOrder(orderId);
        }}
      >
        <div className="space-y-1">
          <h1 className="text-dark font-semibold text-[15px]">
            Order: {orderId}
          </h1>
          <p className="text-dark/70 font-semibold text-sm">Table: {table}</p>
          <span className="block text-gray text-sm">QtaM: {Qta}</span>
        </div>
        <div className="space-y-2">
          <p className="text-gray text-right text-sm">{time}</p>
          <div className="flex items-center gap-2">
            <strong className="text-dark text-lg">${price}</strong>
            <p className="px-3 py-1 rounded-full bg-[#56CA93] text-white text-sm font-medium">
              Dine-In
            </p>
          </div>
        </div>
      </motion.div>

      <OrderDetails
        hideDrawer={hideDrawer}
        open={open}
        orderId={orderId}
        table={table}
      />
    </>
  );
};

export default Order;
