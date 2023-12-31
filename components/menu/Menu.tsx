"use client";

import MenuItem from "./MenuItem";
import Loading from "@/components/ui/Loading";
import { Product } from "@/types";
import { noResults } from "@/utils/assets";
import Image from "next/image";
import { useGetProductsQuery } from "@/redux/services/productApiSlice";

const Menu = () => {
  // Fetch all products
  const { data: products, isLoading: isLoadingProducts } =
    useGetProductsQuery(null);
  return (
    <div className="mt-4 bg-white px-4 pt-2 pb-4 rounded-xl">
      <h2 className="text-dark font-medium text-xl mb-3">
        Special menu for you
      </h2>

      {isLoadingProducts ? (
        <Loading type="menu" />
      ) : (
        <>
          {products?.length >= 1 ? (
            <div className="grid grid-cols-5 gap-6">
              {products?.map((product: Product) => (
                <MenuItem product={product} key={product._id} />
              ))}
            </div>
          ) : (
            <div className="h-[320px] w-full bg-white rounded-xl  flex justify-center items-center">
              <Image src={noResults} width={300} height={400} alt="no-result" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Menu;
