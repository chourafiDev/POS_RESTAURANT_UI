import Image from "next/image";
import { FC } from "react";
import { Category } from "../../../types";

interface CategoryItemProps {
  category: Category;
}

const Index: FC<CategoryItemProps> = ({ category: { name, icon, total } }) => {
  return (
    <div className="border border-gray-light rounded-md py-3 px-3 shadow-zinc-500 inline-block w-28">
      <div style={{ width: 30, height: 30 }}>
        <img src={`/assets/imgs/icons/${icon}`} alt={name} className="w-full h-full" />
      </div>

      <p className="mt-3 text-gray/60 text-sm font-medium">{name}</p>
      <p className="text-dark/80 text-[14px] font-medium mt-1">{total} item</p>
    </div>
  );
};

export default Index;
