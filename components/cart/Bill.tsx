import { FC } from "react";

interface billProps {
  subtotal: number;
  totalSalesTax: number;
  totalPrice: number;
}

const bill: FC<billProps> = ({ subtotal, totalSalesTax, totalPrice }) => {
  return (
    <div className="bg-[#F2F3F7] rounded-lg p-6 mt-10 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-dark/60 font-normal">Subtotal</h4>
        <p className="text-dark font-medium">${subtotal}</p>
      </div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-dark/60 font-normal">Discount sales</h4>
        <p className="text-dark font-medium">-$3</p>
      </div>
      <div className="flex items-center justify-between">
        <h4 className="text-dark/60 font-normal">Total sales tax</h4>
        <p className="text-dark font-medium">${totalSalesTax}</p>
      </div>
      <div className="border-dashed-with-spacing relative mb-6 mt-7">
        <div className="absolute -bottom-3 -left-9 w-7 h-7 rounded-full bg-white"></div>
        <div className="absolute -bottom-3 -right-9 w-7 h-7 rounded-full bg-white"></div>
      </div>
      <div className="flex items-center justify-between">
        <h4 className="text-dark text-xl font-medium">Total</h4>
        <p className="text-dark text-xl font-medium">${totalPrice}</p>
      </div>
    </div>
  );
};

export default bill;
