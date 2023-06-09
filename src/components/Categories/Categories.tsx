"use client";
import CategoryItem from "./CategoryItem";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import { FC, useRef, useState } from "react";
import { Category } from "../../../types";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

SwiperCore.use([Navigation]);

interface CategoriesProps {
  categories: Category[];
}

const Index: FC<CategoriesProps> = ({ categories }) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const handleSelectCategory = (item: string) => {
    return setSelectedCategory(item);
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
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <CategoryItem
              category={category}
              handleSelectCategory={handleSelectCategory}
              selectedCategory={selectedCategory}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Index;
