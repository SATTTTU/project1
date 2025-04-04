import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

import { useAllReviews } from "../api/listAllReview";
import defaultAvatar from "../../../../assets/defaultProfile.jpg";

export const TestimonialSlider = () => {
  const { data: testimonials } = useAllReviews();
  const imageBaseUrl = "https://khajabox-bucket.s3.ap-south-1.amazonaws.com/";
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <section className="py-10 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-[#f5fff5] to-[#e1ffe1]">
      <div className="container mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-[#0e9300] mb-10">
          What Our Customers Say
        </h2>

        <div className="relative">
          {domLoaded && (
            <Swiper
              slidesPerView={1}
              spaceBetween={30} // Increased the space between the cards
              pagination={{
                clickable: true,
                dynamicBullets: true,
                el: ".testimonial-pagination",
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              modules={[Pagination, Navigation, Autoplay]}
              className="testimonial-swiper"
            >
              {testimonials?.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="h-full"
                  >
                    <div className="bg-white p-8 rounded-2xl border border-green-200 h-[250px] min-h-[250px] flex flex-col">
                      <div className="flex items-center mb-6">
                        <img
                          src={
                            testimonial.user.image_url
                              ? `${imageBaseUrl}${testimonial.user.image_url}`
                              : defaultAvatar
                          }
                          alt={testimonial.user.name}
                          width={90} // Increased size of avatar
                          height={90}
                          className="rounded-full mr-6 object-cover border-2 border-green-400 w-[90px] h-[90px]"
                        />
                        <div>
                          <h3 className="font-bold text-xl text-gray-800">
                            {testimonial.user.name}
                          </h3>
                          <h2 className="font-bold text-md text-green-500">To:  
                            {testimonial.cook.name}
                          </h2>
                          <div className="flex mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${
                                  i < testimonial.ratings
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 text-lg leading-relaxed flex-grow mb-4">
                        {testimonial.comment.length > 200
                          ? testimonial.comment.slice(0, 200) + "..."
                          : testimonial.comment}
                      </p>

                    
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* Navigation Arrows */}
          <div className="swiper-button-prev !absolute !top-1/2 !left-[-40px] !transform !-translate-y-1/2 !z-10  !w-12 !h-18 !rounded-full !flex !items-center !justify-center  !text-green-900 !text-4xl  after:!content-['‹']"></div>

          <div className="swiper-button-next !absolute !top-1/2 !right-[-40px] !transform !-translate-y-1/2 !z-10  !w-12 !h-18 !rounded-full !flex !items-center !justify-center  !text-green-900 !text-4xl  after:!content-['›']"></div>

          {/* Pagination Dots - Centered */}
          <div className="testimonial-pagination mt-8 absolute bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center space-x-4"></div>
        </div>
      </div>
    </section>
  );
};
