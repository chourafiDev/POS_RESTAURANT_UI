"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { useRef } from "react";

SwiperCore.use([Navigation]);

const SwiperSlider = () => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  return (
    <div className="h-screen p-6 bg-[#F5F4F3]">
      <h1 className="text-dark/20 text-md font-bold text-center">
        Point of Sale
      </h1>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        pagination={true}
        modules={[Pagination]}
        className="h-full w-full relative"
        loop
      >
        <SwiperSlide>
          <div className="flex items-center justify-center flex-col h-full">
            <Image
              src="/assets/imgs/login-1.png"
              alt="management"
              width={350}
              height={800}
              className=""
            />
            <h2 className="text-dark font-medium text-xl mt-8 text-center">
              Manage sales, inventory <br /> and other transactions
            </h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center flex-col h-full">
            <Image
              src="/assets/imgs/login-2.png"
              alt="management"
              width={350}
              height={900}
              className=""
            />
            <h2 className="text-dark font-medium text-xl mt-8 text-center">
              Manage sales, inventory <br /> and other transactions
            </h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center flex-col h-full">
            <Image
              src="/assets/imgs/login-3.png"
              alt="management"
              width={350}
              height={800}
              className=""
            />
            <h2 className="text-dark font-medium text-xl mt-8 text-center">
              Manage sales, inventory <br /> and other transactions
            </h2>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperSlider;
