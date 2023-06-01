"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

SwiperCore.use([Navigation]);

const SwiperSlider = () => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  return (
    <div className="h-screen p-6">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        className="h-full w-full relative"
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
        // breakpoints={{
        //   320: {
        //     slidesPerView: 1.5,
        //   },
        //   991: {
        //     slidesPerView: 3,
        //   },
        // }}
      >
        <SwiperSlide>
          <div className="w-full h-full relative overflow-hidden">
            <img
              src="/assets/imgs/login-img-1.jpg"
              alt="restauration"
              // fill
              className="rounded-lg h-full w-full object-cover"
            />

            <div className="bg-dark backdrop-filter backdrop-blur-sm bg-opacity-50 px-4 pt-4 pb-16 rounded-lg absolute bottom-0 left-0 w-full m-6">
              <h5 className="text-white font-normal mb-4 text-lg">
                Lorem ipsum dolor
              </h5>
              <p className="text-white/80 text-sm font-light pr-10 leading-relaxed tracking-wide">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde
                eum magnam maiores vel in perferendis, repudiandae sapiente
                quos, quisquam expedita corrupti voluptatibus ipsum obcaecati
                ipsa aut eveniet, veniam quis explicabo.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full relative overflow-hidden">
            <img
              src="/assets/imgs/login-img-2.jpg"
              alt="restauration"
              // fill
              className="rounded-lg h-full w-full object-cover"
            />

            <div className="bg-dark backdrop-filter backdrop-blur-sm bg-opacity-50 px-4 pt-4 pb-16 rounded-lg absolute bottom-0 left-0 w-full m-6">
              <h5 className="text-white font-normal mb-4 text-lg">
                Lorem ipsum dolor
              </h5>
              <p className="text-white/80 text-sm font-light pr-10 leading-relaxed tracking-wide">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde
                eum magnam maiores vel in perferendis, repudiandae sapiente
                quos, quisquam expedita corrupti voluptatibus ipsum obcaecati
                ipsa aut eveniet, veniam quis explicabo.
              </p>
            </div>
          </div>
        </SwiperSlide>

        <div className="absolute bottom-10 right-10 z-10 flex gap-4 items-center">
          <div
            ref={prevRef}
            className="w-10 h-10 flex cursor-pointer justify-center items-center rounded-full border border-white/30 bg-gray-light/10 text-white"
          >
            <FiChevronLeft />
          </div>
          <div
            ref={nextRef}
            className="w-10 h-10 flex cursor-pointer justify-center items-center rounded-full border border-white/30 bg-gray-light/10 text-white"
          >
            <FiChevronRight />
          </div>
        </div>
      </Swiper>
    </div>
  );
};

export default SwiperSlider;
