import { HeroSlider } from "./components/HeroSlider";
import { TestimonialSlider } from "./components/TestimonialSlider";
import { Footer } from "./components/Footer";
import { About } from "./components/About";

export const HomePage = () => {
	return (
		<>
			<HeroSlider />

			<About />

			<TestimonialSlider />

			<Footer />
		</>
	);
};
