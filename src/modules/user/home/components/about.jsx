import React from "react";
import AboutImage from "../../../../assets/About.jpg";
import { motion } from "framer-motion"; 

export const About = () => {
	return (
		<section id="about" className="py-12 md:py-16 bg-white">
			<div className="container mx-auto px-6 lg:px-12">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-20 items-center">
					
					{/* Image Section with Animation */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						className="relative w-full h-[280px] sm:h-[320px] md:h-[400px] lg:h-[450px]"
					>
						<img
							src={AboutImage}
							alt="Chef preparing food"
							className="w-full h-[450px] md:w-[600px] md:h-[400px] object-cover lg:rounded-xl shadow-lg"
						/>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
					>
						<h2 className="text-3xl  font-bold text-[#0e9300] mt-44 md:mt-22 mb-6 lg:mt-0">
							About Us
						</h2>
						<p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-4">
							At <span className="font-semibold text-[#0e9300]">KhajaBox</span>, we bring restaurant-quality meals to your doorstep with 
							the convenience of a cloud kitchen. Whether you’re craving local flavors, 
							international cuisines, or healthy meal options, we have something for everyone.
						</p>
						<p className="text-gray-700 text-lg md:text-xl leading-relaxed">
							Founded with a passion for good food and convenience, we saw a gap in the 
							market where people wanted high-quality meals but didn’t always have time to 
							cook or visit a restaurant. Our mission is to deliver fresh, delicious meals 
							that make your life easier.
						</p>
					</motion.div>
				</div>
			</div>
		</section>
	);
};
