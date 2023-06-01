import { FC } from "react";
import { Menu } from "../../../types";
import Image from "next/image";

interface MenuItemProps {
  menu: Menu;
}

const MenuItem: FC<MenuItemProps> = ({ menu: { title, price, image } }) => {
  return (
    <div>
      <Image
        src={`/assets/imgs/menu/${image}`}
        alt={title}
        width={300}
        height={100}
        className="rounded-md"
      />

      <div className="mt-2">
        <h1 className="text-gray/80 mb-2 text-[14px] font-normal tracking-wide">{title}</h1>
        <strong className="text-dark font-medium">${price}</strong>
      </div>
    </div>
  );
};

export default MenuItem;
