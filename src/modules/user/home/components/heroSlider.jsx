
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Header } from "./header"
import MainImage from "../../../../assets/Main.jpg"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-fade"
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules"

export const HeroSlider = () => {
  const [swiperInstance, setSwiperInstance] = useState(null)

  const heroSlides = [
    {
      id: 1,
      title: "Premium Cloud Kitchen Services",
      subtitle: "Delicious, chef-crafted meals delivered straight to your door.",
      image: MainImage,
      buttonText: "Explore Our Menu",
    },
    {
      id: 2,
      title: "State-of-the-Art Kitchen Facilities",
      subtitle: "Professional-grade equipment and expert chefs creating culinary masterpieces.",
      image: MainImage,
      buttonText: "Our Process",
    },
    {
      id: 3,
      title: "Fast & Reliable Delivery",
      subtitle: "Hot, fresh meals delivered within 30 minutes of preparation.",
      image: MainImage,
      buttonText: "Order Now",
    },
  ]

  return (
    <header className="relative w-full h-screen overflow-hidden">
      <div className="absolute top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-2">
          <Header />
        </div>
      </div>

      <div className="relative w-full h-full">
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
          onClick={() => swiperInstance?.slidePrev()}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
          onClick={() => swiperInstance?.slideNext()}
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <Swiper
          onSwiper={setSwiperInstance}
          spaceBetween={0}
          centeredSlides={true}
          effect={"fade"}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: ".swiper-custom-pagination",
            bulletClass: "swiper-custom-bullet",
            bulletActiveClass: "swiper-custom-bullet-active",
            renderBullet: (index, className) =>
              `<button class="${className}" aria-label="Go to slide ${index + 1}"></button>`,
          }}
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          className="h-full w-full"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id} className="relative">
              <div className="absolute inset-0 bg-black/50 z-0"></div>
              <img
                src={slide.image || "/placeholder.svg"}
                alt={`${slide.title}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#6fac3a] mb-4">{slide.title}</h1>
                    <p className="text-white text-lg md:text-xl mb-6">{slide.subtitle}</p>
                    <button className="bg-[#426B1F] hover:bg-green-900 text-white font-medium py-3 px-6 rounded-md transition-colors">
                      {slide.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-custom-pagination absolute bottom-6 left-0 right-0 z-20 flex justify-center space-x-2"></div>
      </div>

      <style jsx global>{`
        .swiper-custom-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 9999px;
          display: inline-block;
          margin: 0 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .swiper-custom-bullet-active {
          background: rgba(255, 255, 255, 1);
          width: 24px;
        }
      `}</style>
    </header>
  )
}

