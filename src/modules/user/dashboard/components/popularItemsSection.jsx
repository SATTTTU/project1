import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FiStar, FiClock } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const PopularItems = ({ popularItems, handleAddToCart, addedToCart }) => {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-xl font-bold text-center">Popular Items</h2>
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="pb-30"
          style={{
            paddingBottom: "50px", // Space for pagination dots
          }}
        >
          {popularItems.map((item) => (
            <SwiperSlide key={item.productId}>
              <FoodItemCard 
                item={item} 
                handleAddToCart={handleAddToCart} 
                addedToCart={addedToCart} 
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

const FoodItemCard = ({ item, handleAddToCart, addedToCart }) => {
  return (
    <Link to={`/food/${item.productId}`} className="block">
      <div className="overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="relative">
          <img
            src={item.img || "/placeholder.svg"}
            alt={item.name}
            width={600}
            height={200}
            className="object-cover w-full h-48 md:h-56 lg:h-64"
          />
          {item.rating && (
            <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md shadow-md flex items-center">
              <FiStar className="text-yellow-500 fill-current mr-1" />
              <span className="font-medium">{item.rating}</span>
            </div>
          )}
          {item.preparationTime && (
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 px-2 py-1 rounded-full text-white text-xs flex items-center">
              <FiClock className="mr-1" />
              <span>{item.preparationTime}</span>
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="text-lg font-medium">{item.name}</h3>
          <p className="mb-3 text-lg font-bold">Rs. {item.price}</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart(item);
            }}
            className={`w-full py-3 rounded-xl text-white transition-all duration-300 ${
              addedToCart === item.productId ? "bg-green-700" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {addedToCart === item.productId ? "Added to Cart!" : "Order Now"}
          </button>
        </div>
      </div>
    </Link>
  );
};