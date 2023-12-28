"use client";

import CategoryItem from "./CategoryItem";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import { useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useGetCategoriesQuery } from "@/redux/services/categoryApiSlice";
import Loading from "@/components/ui/Loading";
import { useRouter } from "next/navigation";

SwiperCore.use([Navigation]);

const Categories = () => {
  // Fetch all categories
  const { data: categories, isLoading } = useGetCategoriesQuery(null);

  const router = useRouter();

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleSelectCategory = (item: string) => {
    if (selectedCategory !== item) {
      setSelectedCategory(item);
    } else {
      setSelectedCategory("");
    }

    const params = new URLSearchParams();

    if (item) params.set("category", item.toString());

    const lng = localStorage.getItem("i18nextLng");
    router.push(`/${lng}/menu/all?${params.toString()}`);
  };

  return (
    <div className="pt-4">
      <div className="flex justify-between items-center">
        <h2 className="text-dark font-medium text-xl">Categories</h2>

        <div className="flex gap-3 items-center">
          <div
            ref={prevRef}
            className="w-9 h-9 flex cursor-pointer justify-center items-center rounded-full border border-gray/30 bg-gray-light/10 text-gray"
          >
            <FiChevronLeft />
          </div>
          <div
            ref={nextRef}
            className="w-9 h-9 flex cursor-pointer justify-center items-center rounded-full border border-gray/30 bg-gray-light/10 text-gray"
          >
            <FiChevronRight />
          </div>
        </div>
      </div>
      <div className="mb-4">
        {isLoading ? (
          <div className="mt-2">
            <Loading type="category" />
          </div>
        ) : (
          <Swiper
            spaceBetween={8}
            slidesPerView={7}
            loop
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              // eslint-disable-next-line no-param-reassign
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              // eslint-disable-next-line no-param-reassign
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.update();
            }}
            style={{ padding: "15px 0px" }}
          >
            {categories?.map((category) => (
              <SwiperSlide key={category._id}>
                <CategoryItem
                  category={category}
                  handleSelectCategory={handleSelectCategory}
                  selectedCategory={selectedCategory}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Categories;
