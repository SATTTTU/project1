import React from "react";
import { FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";
import { usePopularCooks } from "../api/getAllCooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const PopularCooks = () => {
  const { data: popularCooks } = usePopularCooks();

  return (
    <section className="p-6 mb-12 rounded-lg bg-white relative">
      <h2 className="mb-6 text-2xl font-bold text-center text-green-600">Popular Cooks</h2>
      
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true, el: ".custom-pagination" }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="rounded-2xl"
      >
        {popularCooks?.map((cook, index) => (
          <SwiperSlide key={index}>
            <Link
              to={`/cook/${cook.id}`}
              className="flex flex-col items-center border border-slate-300 p-4 transition-transform transform bg-blue rounded-sm w-40 md:w-50 shadow-md hover:scale-105 hover:shadow-xl"
            >
              <div className="relative mb-3 overflow-hidden w-40 h-40 md:w-50 md:h-50">
                <img 
                  src={cook.img_url} 
                  alt={cook.name} 
                  className="w-full h-full object-cover rounded-full" 
                />
              </div>
              <span className="text-sm font-medium text-gray-800 sm:text-base">{cook.name}</span>
              
              <div className="flex items-center text-yellow-500 mr-2">
                <FiStar className="fill-current" />
                <span className="ml-1 font-medium">{cook.rating}</span>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination dots positioned slightly lower */}
      <div className="custom-pagination absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 flex space-x-2"></div>
    </section>
  );
};
