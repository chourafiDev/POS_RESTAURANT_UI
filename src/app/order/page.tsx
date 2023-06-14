"use client";

import Orders from "@/components/orders/Orders";
import OrdersCompleted from "@/components/orders/OrdersCompleted";
import OrdersOnProcess from "@/components/orders/OrdersOnProcess";

const tabs = [
  {
    title: "On-process",
    id: "on-process",
    content: OrdersOnProcess,
  },
  {
    title: "Completed",
    id: "completed",
    content: OrdersCompleted,
  },
];

export default function Order() {
  return (
    <div className="p-4 md:p-6 bg-[#fafafa] min-h-screen">
      <Orders tabs={tabs} />
    </div>
  );
}
