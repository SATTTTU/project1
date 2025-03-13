import { HeroSlider } from "@/modules/user/LandingPage/components/HeroSlider";
import { About } from "@/modules/user/LandingPage/components/About";
import { Footer } from "@/modules/user/LandingPage/components/Footer";
import { TestimonialSlider } from "@/modules/user/LandingPage/components/TestimonialSlider";

export const Layout = () => {
	return (
		<>
			<div className="overflow-y-hidden">
				<HeroSlider />

				<About />

				<TestimonialSlider />

				<Footer />
			</div>
		</>
	);
};
