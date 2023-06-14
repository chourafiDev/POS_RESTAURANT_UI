import React, { FC } from "react";
import Order from "./Order";
import { motion } from "framer-motion";

interface OrdersOnProcess {
  id: string;
  active: boolean;
}

const OrdersOnProcess: FC<OrdersOnProcess> = ({ id, active }) => {
  let array = new Array(5);

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

  return (
    <motion.div
      variants={tabContentVariant}
      animate={active ? "active" : "inactive"}
      initial="inactive"
      className="space-y-2"
    >
      {array.fill(5).map((index) => (
        <Order key={index} index={index} />
      ))}
    </motion.div>
  );
};

export default OrdersOnProcess;
