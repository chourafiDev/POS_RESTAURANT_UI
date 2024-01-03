import { FC, useState } from "react";
import { motion } from "framer-motion";
import OrderDetails from "./OrderDetails";
import { Order } from "@/types";
import moment from "moment";

interface OrderProps {
  order: Order;
  hundleClickOrder: (orderId: string) => void;
  orderSelected: string;
  index: number;
}

const Order: FC<OrderProps> = ({
  order: {
    orderId,
    table_order,
    amountPaid,
    items,
    payment_status,
    createdAt,
    customerId,
  },
  hundleClickOrder,
  orderSelected,
  index,
}) => {
  // handle opne drawer
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const hideDrawer = () => {
    setOpen(false);
  };

  const cardVariant = (delay: number) => {
    return {
      active: {
        opacity: 1,
        y: 0,
        transition: {
          type: "tween",
          duration: 0.8,
          delay: 0.3 * delay,
          ease: [0.25, 0.25, 0.25, 0.75],
        },
      },
      inactive: {
        opacity: 0,
        y: 10,
        transition: {
          type: "tween",
          duration: 0.8,
          delay: 0.3 * delay,
          ease: [0.25, 0.25, 0.25, 0.75],
        },
      },
    };
  };

  const tablesList = table_order.tables.map((table) => `T${table}`);
  const totalQyt = items.reduce((acc, item) => acc + item.qty, 0);

  return (
    <>
      <motion.div
        key={orderId}
        className={`flex justify-between items-center rounded-xl bg-white py-3 px-4 cursor-pointer ${
          orderId === orderSelected
            ? "border border-brand"
            : "border border-gray-light/50"
        }`}
        variants={cardVariant(index)}
        initial="inactive"
        animate="active"
        onClick={() => {
          showDrawer(), hundleClickOrder(orderId);
        }}
      >
        <div className="space-y-1">
          <h1 className="text-dark font-semibold text-[15px]">
            Order: #{orderId}
          </h1>
          <p className="text-dark/70 font-semibold text-sm">
            Table: {tablesList.join(", ")}
          </p>
          <span className="block text-gray text-sm">Quantity: {totalQyt}</span>
        </div>
        <div className="space-y-2">
          <p className="text-gray text-right text-sm">
            {moment(createdAt).format("l")} / {moment(createdAt).format("LT")}
          </p>
          <div className="flex items-center gap-2">
            <strong className="text-dark text-lg">${amountPaid}</strong>
            <p className="px-3 py-1 rounded-full bg-[#56CA93] text-white text-sm font-medium">
              {payment_status}
            </p>
          </div>
        </div>
      </motion.div>

      <OrderDetails
        hideDrawer={hideDrawer}
        open={open}
        orderId={orderId}
        tables={tablesList}
        amountPaid={amountPaid}
        totalQyt={totalQyt}
        customer={customerId}
        items={items}
      />
    </>
  );
};

export default Order;
