"use client";

import MenuItem from "@/components/menu/MenuItem";
import Loading from "@/components/ui/Loading";
import { useGetMenuQuery } from "@/redux/services/productApiSlice";
import { noResults } from "@/utils/assets";
import Image from "next/image";
import React, { FC } from "react";
import { Product } from "@/types";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface PageProps {
  params: { term: string };
  searchParams: {
    category: string;
    min_price: string;
    max_price: string;
  };
}

const Page: FC<PageProps> = ({ searchParams, params: { term } }) => {
  const lng = localStorage.getItem("i18nextLng");
  const { category, min_price, max_price } = searchParams;

  // Fetch all products
  const data = {
    title: term ? term : "all",
    category: category ? category : "",
    min_price: min_price ? min_price : "",
    max_price: max_price ? max_price : "",
  };

  const { data: products, isLoading: isLoadingProducts } =
    useGetMenuQuery(data);

  return (
    <div className="mt-8 bg-white rounded-lg px-4 pt-3 pb-6">
      <Link
        href={`/${lng}/menu`}
        className="text-dark underline text-[15px] font-medium"
      >
        Back To Menu
      </Link>

      <div className="my-3 space-y-1">
        {isLoadingProducts ? (
          <Skeleton count={1} width={200} height={20} />
        ) : (
          <h2 className="text-dark font-medium text-xl">
            Search Results{" "}
            <span className="text-brand">
              {products && products?.length > 1
                ? `${products?.length} items`
                : `${products?.length} item`}
            </span>
          </h2>
        )}
        {term != "all" && (
          <p className="text-dark/60">Showing results for &apos;{term}&apos;</p>
        )}
      </div>

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
            <div className="h-[440px] w-full bg-white rounded-xl  flex justify-center items-center">
              <Image src={noResults} width={300} height={400} alt="no-result" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
