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
      <div className="w-[80px] h-[70px] relative">
        <Image
          src={`/assets/imgs/orders/${image}`}
          fill
          alt={title}
          className="rounded-lg object-cover"
        />
      </div>

      <div className="w-full">
        <h5 className="text-dark font-medium">{title}</h5>
        <p className="text-gray text-sm font-light">{desc}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="text-gray text-sm">{total}x</p>
          <p className="text-brand font-medium">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default Order;
