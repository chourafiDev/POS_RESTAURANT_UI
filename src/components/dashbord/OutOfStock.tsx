import Image from "next/image";
import { BsArrowRightShort } from "react-icons/bs";

const OutOfStock = () => {
  return (
    <div className="bg-white rounded-xl flex-1 p-5">
      <div className="flex justify-between items-center">
        <h2 className="text-dark font-semibold">Out of Stock</h2>
        <p className="text-brand text-[13px] flex items-center gap-1 font-medium">
          View All
          <BsArrowRightShort size={20} />
        </p>
      </div>

      <div className="mt-5">
        <p className="text-sm text-dark/60 font-semibold mb-4">Dishes</p>
        <div className="space-y-3 grid grid-cols-2">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 relative">
              <Image
                src="/assets/imgs/menu/meat-burger.jpg"
                alt="meat-burger"
                className="rounded-full absolute"
                fill
              />
            </div>
            <div className="space-y-1">
              <h2 className="text-dark text-sm font-medium">
                American Favorite
              </h2>
              <p className="text-gray text-[13px] font-medium">
                Order: <span className="text-brand">120</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 relative">
              <Image
                src="/assets/imgs/menu/meat-burger.jpg"
                alt="meat-burger"
                className="rounded-full absolute"
                fill
              />
            </div>
            <div className="space-y-1">
              <h2 className="text-dark text-sm font-medium">
                American Favorite
              </h2>
              <p className="text-gray text-[13px] font-medium">
                Order: <span className="text-brand">120</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 relative">
              <Image
                src="/assets/imgs/menu/meat-burger.jpg"
                alt="meat-burger"
                className="rounded-full absolute"
                fill
              />
            </div>
            <div className="space-y-1">
              <h2 className="text-dark text-sm font-medium">
                American Favorite
              </h2>
              <p className="text-gray text-[13px] font-medium">
                Order: <span className="text-brand">120</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 relative">
              <Image
                src="/assets/imgs/menu/meat-burger.jpg"
                alt="meat-burger"
                className="rounded-full absolute"
                fill
              />
            </div>
            <div className="space-y-1">
              <h2 className="text-dark text-sm font-medium">
                American Favorite
              </h2>
              <p className="text-gray text-[13px] font-medium">
                Order: <span className="text-brand">120</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutOfStock;
