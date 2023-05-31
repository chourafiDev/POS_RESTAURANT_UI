"use client";
import CategoryItem from "./CategoryItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { FC } from "react";
import { Category } from "../../../types";

interface CategoriesListProps {
  data: Category[];
}

const Index: FC<CategoriesListProps> = ({ data }) => {
  return (
    <div>
      <Swiper spaceBetween={10} slidesPerView={10}>
        {data.map((category) => (
          <SwiperSlide key={category.id}>
            <CategoryItem category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Index;
