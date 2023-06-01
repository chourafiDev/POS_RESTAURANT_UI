import Image from "next/image";
import { FC } from "react";
import { Category } from "../../../types";

interface CategoryItemProps {
  category: Category;
}

const Index: FC<CategoryItemProps> = ({ category: { name, icon, total } }) => {
  return (
    <div
      className={`border border-gray-light rounded-md py-3 px-3 shadow-lg shadow-gray-light/50 inline-block w-28 cursor-pointer mb-10 mt-4 hover:-translate-y-1 duration-300 ease-in ${
        name === "All" && "bg-brand"
      }`}
    >
      <div style={{ width: 35, height: 35 }}>
        <img
          src={`/assets/imgs/icons/${icon}`}
          alt={name}
          className="w-full h-full"
        />
      </div>

      <p
        className={`mt-3 ${
          name === "All" ? "text-white" : "text-gray/60"
        } text-sm font-medium`}
      >
        {name}
      </p>
      <p
        className={`${
          name === "All" ? "text-white" : "text-gray/80"
        } text-[14px] font-medium mt-1`}
      >
        {total} item
      </p>
    </div>
  );
};

export default Index;
