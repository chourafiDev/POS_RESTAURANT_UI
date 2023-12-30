"use client";

import React, { FC, useState } from "react";
import Order from "./Order";
import { motion } from "framer-motion";
import { ordersList } from "@/utils/data";

interface OrdersCompletedProps {
  id: string;
  active: boolean;
}

const OrdersCompleted: FC<OrdersCompletedProps> = ({ id, active }) => {
  const tabContentVariant = {
    active: {
      display: "block",
      transition: {
        staggerChildren: 0.2,
      },
    },
    inactive: {
      display: "none",
    },
  };

  const [orderSelected, setOrderSelected] = useState("");

  const hundleClickOrder = (orderId: string) => {
    setOrderSelected(orderId);
  };

  return (
    <motion.div
      variants={tabContentVariant}
      animate={active ? "active" : "inactive"}
      initial="inactive"
      className="space-y-2"
    >
      {ordersList.map((order) => (
        <Order
          key={order.orderId}
          order={order}
          orderSelected={orderSelected}
          hundleClickOrder={hundleClickOrder}
        />
      ))}
    </motion.div>
  );
};

export default OrdersCompleted;
