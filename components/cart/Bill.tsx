import { FC } from "react";

interface billProps {
  itemsPrice: number;
  qty: number;
}

const bill: FC<billProps> = ({ itemsPrice, qty }) => {
  return (
    <div className="bg-[#F2F3F7] rounded-lg p-6 mt-10 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-dark/60 font-normal">Total price</h4>
        <p className="text-dark font-medium">${itemsPrice}</p>
      </div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-dark/60 font-normal">Quantity</h4>
        <p className="text-dark font-medium">{qty}</p>
      </div>
      <div className="border-dashed-with-spacing relative mb-6 mt-7">
        <div className="absolute -bottom-3 -left-9 w-7 h-7 rounded-full bg-white"></div>
        <div className="absolute -bottom-3 -right-9 w-7 h-7 rounded-full bg-white"></div>
      </div>
      <div className="flex items-center justify-between">
        <h4 className="text-dark text-xl font-medium">Total sales</h4>
        <p className="text-dark text-xl font-medium">${itemsPrice}</p>
      </div>
    </div>
  );
};

export default bill;
