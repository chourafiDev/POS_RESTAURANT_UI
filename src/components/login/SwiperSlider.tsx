"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const SwiperSlider = () => {
  return (
    <div>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        pagination={true}
        modules={[Pagination]}
      >
        <SwiperSlide>
          <div>
            <p>Test</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <p>Test</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperSlider;
