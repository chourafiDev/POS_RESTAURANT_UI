import { FC } from "react";
import { Menu } from "../../../types";
import Image from "next/image";
import { useDisclosure } from "@mantine/hooks";
import Cart from "../cart/Cart";

interface MenuItemProps {
  menu: Menu;
}

const MenuItem: FC<MenuItemProps> = ({ menu: { title, price, image } }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <div onClick={open} className="cursor-pointer">
        <Image
          src={`/assets/imgs/menu/${image}`}
          alt={title}
          width={300}
          height={100}
          className="rounded-md"
        />

        <div className="mt-2">
          <h1 className="text-gray/80 mb-2 text-[14px] font-normal tracking-wide">
            {title}
          </h1>
          <strong className="text-dark font-medium">${price}</strong>
        </div>
      </div>
      <Cart opened={opened} close={close} />
    </>
  );
};

export default MenuItem;
