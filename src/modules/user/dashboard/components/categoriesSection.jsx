import React from "react";
import { Link } from "react-router-dom";
import { useCategoryItems } from "../api/getCategories";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const CategorySection = () => {
  const { data: popularCategory, isLoading, error } = useCategoryItems();

  if (isLoading) {
    return <div className="text-center py-8">Loading categories...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error loading categories</div>;
  }

  if (!popularCategory || popularCategory.length === 0) {
    return <div className="text-center py-8">No categories available</div>;
  }

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl text-center font-bold text-gray-800">Popular Categories</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 6 },
        }}
        className="rounded-2xl"
      >
        {popularCategory.map((category, index) => (
          <SwiperSlide key={category.id || index}>
            <Link
              to={`/category/${category.id}`}
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <div className="w-40 h-40 mb-3 overflow-hidden bg-gray-100 shadow-md">
                <img
                  src={category.img}
                  alt={category.name}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 sm:text-base">{category.name}</span>
            </Link>
          </SwiperSlide>
        ))}
        {/* Custom pagination dots */}
        <div className="mb-12"></div>
      </Swiper>
    </section>
  );
};
