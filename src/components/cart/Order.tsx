import React, { FC } from "react";
import { Order } from "../../../types";
import Image from "next/image";

interface OrderProps {
  order: Order;
}

const Order: FC<OrderProps> = ({
  order: { title, image, price, total, desc },
}) => {
  return (
    <div className="flex items-center gap-3 w-full">
      <Image
        src={`/assets/imgs/orders/${image}`}
        width={100}
        height={100}
        alt={title}
        className="rounded-lg"
      />
      <div className="w-full">
        <h5 className="text-dark font-medium">{title}</h5>
        <p className="text-gray text-sm font-light">{desc}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="text-gray text-sm">x{total}</p>
          <p className="text-brand font-medium">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default Order;
