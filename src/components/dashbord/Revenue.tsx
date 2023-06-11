import { BsArrowUpRight } from "react-icons/bs";
import { MdOutlineFastfood } from "react-icons/md";
import { BiDish, BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { HiShoppingCart } from "react-icons/hi";
import { MdFastfood, MdFoodBank } from "react-icons/md";
import { ImArrowUpRight2 } from "react-icons/im";

const Revenue = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-white p-3 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <h5 className="text-dark/80 font-semibold text-[15px]">Revenue</h5>
          <p className="text-red flex items-center text-[14px] font-medium">
            <BiDownArrowAlt className="font-semibold" size={20} /> 10%
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full flex justify-center items-center bg-brand p-2">
            <ImArrowUpRight2 className="text-white" size={24} />
          </div>

          <h2 className="text-dark/60 font-semibold text-[18px]">$2.045</h2>
        </div>
      </div>
      <div className="bg-white p-3 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <h5 className="text-dark/80 font-semibold text-[15px]">Orders</h5>
          <p className="text-brand flex items-center text-[14px] font-medium">
            <BiUpArrowAlt className="font-semibold" size={20} /> 10%
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full flex justify-center items-center bg-green-400 p-2">
            <HiShoppingCart className="text-white" size={24} />
          </div>

          <h2 className="text-dark/60 font-semibold text-[18px]">345</h2>
        </div>
      </div>
      <div className="bg-white p-3 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <h5 className="text-dark/80 font-semibold text-[15px]">Din in</h5>
          <p className="text-brand flex items-center text-[14px] font-medium">
            <BiUpArrowAlt className="font-semibold" size={20} /> 10%
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full flex justify-center items-center bg-red p-2">
            <MdFoodBank className="text-white" size={32} />
          </div>

          <h2 className="text-dark/60 font-semibold text-[18px]">220</h2>
        </div>
      </div>
      <div className="bg-white p-3 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <h5 className="text-dark/80 font-semibold text-[15px]">Take away</h5>
          <p className="text-red flex items-center text-[14px] font-medium">
            <BiDownArrowAlt className="font-semibold" size={20} /> 5%
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full flex justify-center items-center bg-yellow p-2">
            <MdFastfood className="text-white" size={24} />
          </div>

          <h2 className="text-dark/60 font-semibold text-[18px]">135</h2>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
