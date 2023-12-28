import Image from "next/image";
import { FC } from "react";
import { Category } from "../../../types";

interface CategoryItemProps {
  category: Category;
  selectedCategory: string;
  handleSelectCategory: (tem: string) => void;
}

const Index: FC<CategoryItemProps> = ({
  category: { name, icon, totalProducts },
  selectedCategory,
  handleSelectCategory,
}) => {
  return (
    <div
      className={`flex items-center gap-3 border border-gray-light rounded-xl p-3 shadow-lg shadow-gray-light/50 cursor-pointer  hover:-translate-y-1 duration-300 ease-in ${
        name.toLocaleLowerCase() === selectedCategory.toLocaleLowerCase()
          ? "bg-brand"
          : "bg-white"
      }`}
      onClick={() => handleSelectCategory(name)}
    >
      <Image
        src={icon?.url}
        alt={name}
        // className="w-full h-full"
        width={45}
        height={45}
        className={`rounded-md p-2 ${
          name.toLocaleLowerCase() === selectedCategory.toLocaleLowerCase()
            ? "bg-white"
            : "bg-gray-light/30"
        }`}
      />
      <div>
        <p
          className={`${
            name.toLocaleLowerCase() === selectedCategory.toLocaleLowerCase()
              ? "text-white"
              : "text-dark/80"
          } text-sm font-medium`}
        >
          {name}
        </p>
        <p
          className={`${
            name.toLocaleLowerCase() === selectedCategory.toLocaleLowerCase()
              ? "text-white"
              : "text-gray/50"
          } text-[13px] font-normal mt-1`}
        >
          {totalProducts && totalProducts > 1
            ? `${totalProducts} items`
            : `${totalProducts} item`}
        </p>
      </div>
    </div>
  );
};

export default Index;
