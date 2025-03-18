import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Pagination, Navigation, Autoplay } from "swiper/modules"
import Customer1 from "../../../../assets/UserImages/person1.jpg"
import Customer2 from "../../../../assets/UserImages/person2.jpg"
import Customer3 from "../../../../assets/UserImages/person3.jpg"
import Customer4 from "../../../../assets/UserImages/person3.jpg"

import Customer5 from "../../../../assets/UserImages/person3.jpg"




const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    image:Customer1,
    rating: 5,
    testimonialCount: 120,
    text: "The positive impact was undoubtedly the efficiency of the service. The speed moved me to tears. The delivery was fast and the food was up to the usual McDonald's standard – hot and satisfying.",
  },
  {
    id: 2,
    name: "Michael Chen",
    image: Customer2,
    rating: 5,
    testimonialCount: 245,
    text: "The positive impact was undoubtedly the efficiency of the service. The speed moved me to tears. The delivery was fast and the food was up to the usual McDonald's standard – hot and satisfying.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    image: Customer3,
    rating: 5,
    testimonialCount: 189,
    text: "The positive impact was undoubtedly the efficiency of the service. The speed moved me to tears. The delivery was fast and the food was up to the usual McDonald's standard – hot and satisfying.",
  },
  {
    id: 4,
    name: "David Wilson",
    image: Customer5,
    rating: 5,
    testimonialCount: 156,
    text: "Fresh, organic produce that tastes amazing! The delivery is always on time and the quality is consistently excellent. I've recommended KhanaBox to all my friends.",
  },
  {
    id: 5,
    name: "Priya Patel",
    image: Customer4,
    rating: 5,
    testimonialCount: 210,
    text: "I love that I can support local farmers while getting premium organic food. The subscription service is flexible and the mobile app makes ordering so convenient.",
  },
]

export const TestimonialSlider = () => {
  const [domLoaded, setDomLoaded] = useState(false)

  useEffect(() => {
    setDomLoaded(true)
  }, [])

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Customer Reviews</h2>
        <div className="relative px-4 py-4">
          {domLoaded && (
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
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
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              modules={[Pagination, Navigation, Autoplay]}
              className="testimonial-swiper"
            >
              <div className="swiper-wrapper equal-height-slides">
                {testimonials.map((testimonial) => (
                  <SwiperSlide key={testimonial.id} className="h-auto border border-slate-300 rounded-lg">
                    <div className="bg-white p-10 rounded-lg shadow-xl flex flex-col h-[400px] lg:h-[330px]">
                      <div className="flex items-center mb-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={50}
                          height={50}
                          className="rounded-full mr-4"
                        />
                        <div>
                          <h3 className="font-semibold">{testimonial.name}</h3>
                          <div className="flex items-center mt-1">
                            <div className="flex mr-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">{testimonial.testimonialCount} testimonials</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 flex-grow">{testimonial.text}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
          )}

          <div className="swiper-button-prev !absolute !left-0 !top-1/2 !-translate-y-1/2 !z-10 !bg-[#426B1F] !w-10 !h-10 !rounded-full !flex !items-center !justify-center !text-white after:!text-lg after:!content-['prev']  !shadow-md"></div>
          <div className="swiper-button-next !absolute !right-0 !top-1/2 !-translate-y-1/2 !z-10 !bg-[#426B1F] !w-10 !h-10 !rounded-full !flex !items-center !justify-center !text-white after:!text-lg after:!content-['next']  !shadow-md"></div>

          <div className="testimonial-pagination mx-auto space-x-4 text-center mt-16 flex justify-center"></div>
        </div>
      </div>
    </section>
  )
}

