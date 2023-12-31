"use client";

import { FC, useState } from "react";
import { Product } from "@/types";
import Image from "next/image";
import { useGetCategoryByIdQuery } from "@/redux/services/categoryApiSlice";
import ModalOrder from "./ModalOrder";

interface MenuItemProps {
  product: Product;
}

const MenuItem: FC<MenuItemProps> = ({
  product: { _id, title, price, image, category, options, description },
}) => {
  // Fetch single category
  const { data: cat } = useGetCategoryByIdQuery(category);

  // handle open modal
  const [openModalDeatil, setOpenModalDeatil] = useState(false);

  const handleOpenMoadlDetail = () => {
    setOpenModalDeatil(true);
  };
  const handleCloseMoadlDetail = () => {
    setOpenModalDeatil(false);
  };

  return (
    <>
      <div
        onClick={handleOpenMoadlDetail}
        className="cursor-pointer bg-white p-2 rounded-xl border border-gray/10 shadow-lg shadow-gray-light/50 hover:-translate-y-1 duration-200 ease-in"
      >
        <div>
          <Image
            src={image?.url}
            alt={title}
            width={300}
            height={100}
            className="rounded-xl object-cover"
            style={{ maxHeight: "200px" }}
          />
        </div>

        <div className="mt-2">
          <h1 className="text-gray mb-2 text-[15px] font-medium tracking-wide">
            {title}
          </h1>
          <div className="flex justify-between items-center">
            <strong className="text-dark font-medium">${price}</strong>
            <p className="bg-yellow rounded-full px-3 py-1 text-white font-medium">
              {cat?.name}
            </p>
          </div>
        </div>
      </div>

      <ModalOrder
        handleCloseMoadlDetail={handleCloseMoadlDetail}
        openModalDeatil={openModalDeatil}
        id={_id}
        title={title}
        price={price}
        image={image}
        options={options}
        description={description}
      />
    </>
  );
};

export default MenuItem;
