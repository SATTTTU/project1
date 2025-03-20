import { HeroSlider } from "@/modules/user/home/components/heroSlider";
import { About } from "@/modules/user/home/components/about";
import { Footer } from "@/modules/user/home/components/footer";
import { TestimonialSlider } from "@/modules/user/home/components/testimonialSlider";

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
