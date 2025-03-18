// import Image from "next/image"
import React from "react";
import AboutImage from "../../../../assets/About.jpg";

export const About = () => {
	return (
		<section id="/about" className="py-12 md:py-16 bg-white">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:gap-20 gap-6 items-center">
					<div className="relative h-[300px] md:h-[400px]">
						<img
							src={AboutImage}
							alt="Chef preparing food"
							fill
							className="object-cover rounded-lg"
						/>
					</div>
					<div>
						<h2 className="text-4xl font-bold text-green-600 mb-4">About Us</h2>
						<p className="text-gray-700 text-xl mb-4">
							At KhajaBox, we bring restaurant-quality meals to your doorstep
							with the convenience of a cloud kitchen. Whether you’re craving
							local flavors, international cuisines, or healthy meal options, we
							have something for everyone. Our goal is simple – to deliver
							fresh, hygienic, and mouth-watering food whenever you need it.
						</p>
						<p className="text-gray-700 text-xl mb-4">
							KhajaBox was founded with a passion for good food and convenience.
							We saw a gap in the market where people wanted high-quality meals
							but didn’t always have time to cook or visit a restaurant. With
							busy schedules, work commitments, and family responsibilities,
							ordering food should be easy and reliable.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};
