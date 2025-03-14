import { HeroSlider } from "@/modules/user/LandingPage/components/heroSlider";
import { About } from "@/modules/user/LandingPage/components/about";
import { Footer } from "@/modules/user/LandingPage/components/footer";
import { TestimonialSlider } from "@/modules/user/LandingPage/components/testimonialSlider";

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
