import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Header } from "./Header"
import MainImage from "../../../../assets/Main.jpg"


export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

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

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 1000) 

    return () => clearInterval(interval)
  }, [currentSlide])

  const nextSlide = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  const prevSlide = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return

    setIsTransitioning(true)
    setCurrentSlide(index)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

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
          onClick={prevSlide}
          aria-label="Previous slide"
          disabled={isTransitioning}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
          onClick={nextSlide}
          aria-label="Next slide"
          disabled={isTransitioning}
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="container mx-auto px-4">
            <div
              className={`max-w-2xl mx-auto text-center transition-opacity duration-500 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-600 mb-4">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-white text-lg md:text-xl mb-6">{heroSlides[currentSlide].subtitle}</p>
              <button className="bg-[#426B1F] hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors">
                {heroSlides[currentSlide].buttonText}
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-gray-200 w-6" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentSlide === index ? "true" : "false"}
            />
          ))}
        </div>

        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={currentSlide !== index}
          >
            <div className="absolute inset-0 bg-black/50 z-0"></div>

            <img
              src={slide.image || "/placeholder.svg"}
              alt={`${slide.title}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </header>
  )
}

