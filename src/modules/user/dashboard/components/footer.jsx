import React from "react";
import Logo from "../../../../assets/unnamed.png";
import { Link } from "react-router-dom";
import {
	FaFacebookF,
	FaTwitter,
	FaInstagram,
	FaLinkedinIn,
} from "react-icons/fa";

export const Footer = () => {
	return (
		<div>
			<footer className="bg-gray-100 border-t border-gray-200 pt-12 pb-6">
				<div className="container mx-auto text-center px-4 md:px-2">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<div className="col-span-1 lg: flex flex-col ">
							<Link
								to="/"
								className="flex items-center justify-center mb-4 lg:text-left"
							>
								<img
									src={Logo}
									alt="KhanaBox Logo"
									width={25}
									height={25}
									className=""
								/>
								<span className="text-2xl font-bold text-[#426B1F] ">
									KhajaBox
								</span>
							</Link>
							<p className="text-sm text-gray-600 mb-4">Company # 000000-445</p>
							<p className="text-sm text-gray-600">Copyright 2023</p>
							<div className="flex space-x-4 mt-4">
								{/* Social media icons would go here */}
							</div>
						</div>

						<div className="col-span-1">
							<h3 className="text-xl font-semibold mb-4 text-[#426B1F]">
								Legal Pages
							</h3>
							<ul className="space-y-2">
								<li>
									<Link to="#" className="text-gray-600 hover:text-green-600">
										Terms and Conditions
									</Link>
								</li>
								<li>
									<Link to="#" className="text-gray-600 hover:text-green-600">
										Privacy
									</Link>
								</li>
							</ul>
						</div>

						<div className="col-span-1">
							<h3 className="text-xl font-semibold text-[#426B1F] mb-4">
								Important Links
							</h3>
							<ul className="space-y-2">
								<li>
									<Link to="#" className="text-gray-600 hover:text-green-600">
										FAQ
									</Link>
								</li>
								<li>
									<Link to="#" className="text-gray-600 hover:text-green-600">
										Sign up to deliver
									</Link>
								</li>
								<li>
									<Link
										to="/register"
										className="text-gray-600 hover:text-green-600"
									>
										Create a business account
									</Link>
								</li>
							</ul>
						</div>
						<div className="col-span-1 lg:text-center">
							<h3 className="text-xl font-semibold  text-[#426B1F]">
								Contact Us
							</h3>
							<p className="mt-2 text-gray-600">Email: support@Khajabox.com</p>
							<p className="text-gray-600">Phone: +1 (234) 567-890</p>

							<div className="flex   space-x-4 mt-4 lg:justify-center lg:items-center">
								<a href="#" className="hover:text-green-300">
									<FaFacebookF size={20} />
								</a>
								<a href="#" className="hover:text-green-300">
									<FaTwitter size={20} />
								</a>
								<a href="#" className="hover:text-green-300">
									<FaInstagram size={20} />
								</a>
								<a href="#" className="hover:text-green-300">
									<FaLinkedinIn size={20} />
								</a>
							</div>
						</div>
					</div>

					<div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-600">
						<p>Copyright © 2025 KHAJABOX. All Rights Reserved.</p>
						<div className="flex flex-wrap gap-4 mt-4 md:mt-0">
							<Link to="#" className="hover:text-green-600">
								Privacy Policy
							</Link>
							<Link to="#" className="hover:text-green-600">
								Terms
							</Link>
							<Link to="#" className="hover:text-green-600">
								Pricing
							</Link>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};
