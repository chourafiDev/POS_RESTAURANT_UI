"use client";

import React, { useState } from "react";
import Order from "./Order";
import { motion } from "framer-motion";
import { DatePicker } from "antd";
import { useGetOrdersQuery } from "@/redux/services/orderApiSlice";
import { Order as TOrder } from "@/types";
import { ClipLoader } from "react-spinners";

const { RangePicker } = DatePicker;

const Orders = () => {
  const [orderSelected, setOrderSelected] = useState("");

  const hundleClickOrder = (orderId: string) => {
    setOrderSelected(orderId);
  };

  // handle change date
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleOnChangeDateRange = (dates: any) => {
    if (dates && dates[0] && dates[1]) {
      const startDateFormatted = dates[0].format("YYYY-MM-DD");
      const endDateFormatted = dates[1].format("YYYY-MM-DD");

      setStartDate(startDateFormatted);
      setEndDate(endDateFormatted);
    } else {
      setStartDate("");
      setEndDate("");
    }
  };

  // Fetch history tables
  const { data: orders, isLoading } = useGetOrdersQuery({
    startDate,
    endDate,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-5 bg-white p-4 rounded-xl">
        <h1 className="text-dark font-medium text-[17px]">List Orders</h1>
        <RangePicker size="middle" onChange={handleOnChangeDateRange} />
      </div>

      <motion.div className="space-y-2 min-h-[350px]">
        {isLoading ? (
          <div className="h-[350px] flex justify-center items-center">
            <ClipLoader color="#FFCA40" size={30} />
          </div>
        ) : (
          orders &&
          orders.map((order: TOrder, i: number) => (
            <Order
              key={order.orderId}
              index={i}
              order={order}
              orderSelected={orderSelected}
              hundleClickOrder={hundleClickOrder}
            />
          ))
        )}
      </motion.div>
    </div>
  );
};

export default Orders;
