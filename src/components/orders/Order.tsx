import React from "react";
import { motion } from "framer-motion";

const Order = ({ index }: { index: number }) => {
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
    <motion.div
      key={index}
      className="flex justify-between items-center rounded-xl bg-white py-3 px-4 border border-gray-light/50"
      variants={cardVariant}
    >
      <div className="space-y-1">
        <h1 className="text-dark font-semibold text-[15px]">Order: #907865</h1>
        <p className="text-dark/70 font-semibold text-sm">Table: T1</p>
        <span className="block text-gray text-sm">Qta: 7</span>
      </div>
      <div className="space-y-2">
        <p className="text-gray text-right text-sm">20:30pm</p>
        <div className="flex items-center gap-2">
          <strong className="text-dark text-lg">$40.99</strong>
          <p className="px-3 py-1 rounded-full bg-[#56CA93] text-white text-sm font-medium">
            Dine-In
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Order;
