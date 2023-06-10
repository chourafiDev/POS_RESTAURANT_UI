import Image from "next/image";
import { FC } from "react";
import { Category } from "../../../types";

interface CategoryItemProps {
  category: Category;
  selectedCategory: string;
  handleSelectCategory: (tem: string) => void;
}

const Index: FC<CategoryItemProps> = ({
  category: { name, icon, total },
  selectedCategory,
  handleSelectCategory,
}) => {
  return (
    <div
      className={`flex items-center gap-3 border border-gray-light rounded-md p-3 shadow-lg shadow-gray-light/50 cursor-pointer mb-10 mt-2 hover:-translate-y-1 duration-300 ease-in ${
        name === selectedCategory ? "bg-brand" : "bg-white"
      }`}
      onClick={() => handleSelectCategory(name)}
    >
      <Image
        src={`/assets/imgs/icons/${icon}`}
        alt={name}
        // className="w-full h-full"
        width={45}
        height={45}
        className={`rounded-md p-2 ${
          name === selectedCategory ? "bg-white" : "bg-gray-light/30"
        }`}
      />
      <div>
        <p
          className={`${
            name === selectedCategory ? "text-white" : "text-dark/80"
          } text-sm font-medium`}
        >
          {name}
        </p>
        <p
          className={`${
            name === selectedCategory ? "text-white" : "text-gray/50"
          } text-[13px] font-normal mt-1`}
        >
          {total} item
        </p>
      </div>
    </div>
  );
};

export default Index;
