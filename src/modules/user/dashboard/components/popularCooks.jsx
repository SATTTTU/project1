import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { usePopularCooks } from "../api/getAllCooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import defaultAvatar from "../../../../assets/defaultProfile.jpg"; 



export const PopularCooks = () => {
  const { data: popularCooks } = usePopularCooks();
  const imageBaseUrl = "https://khajabox-bucket.s3.ap-south-1.amazonaws.com/";

  return (
    <section className="p-10 bg-slate-100 mb-12 relative group">
      <h2 className="mb-6 text-2xl font-semibold text-center text-[#426B1F] tracking-wide">
        Popular Cooks
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={5}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
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
              className="flex flex-col items-center justify-center border border-gray-200 p-4 bg-white rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative mb-4 overflow-hidden rounded-full w-40 h-40 md:w-48 md:h-48 border-1 border-green-600">
                <img
                  src={cook.image_url ? `${imageBaseUrl}${cook.image_url}` : defaultAvatar}
                  alt={cook.name}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = defaultAvatar; // Fallback to default avatar
                  }}
                />
              </div>
              <span className="text-sm font-bold text-gray-800 text-center sm:text-base mb-2">
                {cook.name}
              </span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="custom-pagination absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 flex space-x-2"></div>

      <button
        className="swiper-button-prev flex items-center justify-center !w-12 !h-12 md:!w-14 md:!h-16 !left-[-20px] sm:!left-[-30px] md:!left-[-20px] opacity-100 group-hover:opacity-100 transition-opacity duration-300 rounded-full shadow-lg absolute top-1/2 transform -translate-y-1/2 z-10"
      >
      </button>

      <button
        className="swiper-button-next flex items-center justify-center !w-12 !h-12 md:!w-14 md:!h-16 !right-[-20px] sm:!right-[-30px] md:!right-[-30px] opacity-100 group-hover:opacity-100 transition-opacity duration-300 rounded-full shadow-lg absolute top-1/2 transform -translate-y-1/2 z-10"
      >
      </button>
    </section>
  );
};
