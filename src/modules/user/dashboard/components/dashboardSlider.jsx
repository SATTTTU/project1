import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import Category1 from "../../../../assets/imageee.jpg";
import Grand from "../../../../assets/UserImages/Category1.jpg";
import Lunch from "../../../../assets/nepali.jpeg";

export const DashSlider = () => {
	const [swiperInstance, setSwiperInstance] = useState(null);

	const heroSlides = [
		{
			id: 1,
			title: "Experience Culinary Excellence",
			subtitle:
				"Savor gourmet meals crafted by expert chefs, delivered to your doorstep..",
			image: Category1,
			buttonText: "Explore Our Menu",
		},
		{
			id: 2,
			title: "State-of-the-Art Kitchen Facilities",
			subtitle:
				"Professional-grade equipment and expert chefs creating culinary masterpieces.",
			image: Grand,
			buttonText: "Our Process",
		},
		{
			id: 3,
			title: "Fast & Reliable Delivery",
			subtitle: "Hot, fresh meals delivered within 30 minutes of preparation.",
			image: Lunch,
			buttonText: "Order Now",
		},
	];

	return (
		<header className="relative w-full h-[60vh] lg:h-[70vh] overflow-hidden ">
			<div className="relative w-full h-full">
				<button
					className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/60 text-white rounded-full p-3 md:p-4 transition-all"
					onClick={() => swiperInstance?.slidePrev()}
					aria-label="Previous slide"
				>
					<ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
				</button>

				<button
					className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/60 text-white rounded-full p-3 md:p-4 transition-all"
					onClick={() => swiperInstance?.slideNext()}
					aria-label="Next slide"
				>
					<ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
				</button>

				<Swiper
					onSwiper={setSwiperInstance}
					spaceBetween={0}
					centeredSlides={true}
					effect={"fade"}
					autoplay={{
						delay: 5000, // Adjusted delay for a smoother experience
						disableOnInteraction: false,
					}}
					pagination={{
						clickable: true,
						el: ".swiper-custom-pagination",
					}}
					modules={[Autoplay, Pagination, Navigation, EffectFade]}
					className="h-full w-full" // Full width for responsiveness
				>
					{heroSlides.map((slide) => (
						<SwiperSlide key={slide.id} className="relative">
							<img
								src={slide.image || "/placeholder.svg"}
								alt={slide.title}
								className="absolute inset-0 w-full h-[500px] object-cover"
							/>
						</SwiperSlide>
					))}
				</Swiper>

				{/* Custom Pagination */}
				<div className="swiper-custom-pagination absolute bottom-6 left-0 right-0 z-20 flex justify-center space-x-3"></div>
			</div>
		</header>
	);
};
