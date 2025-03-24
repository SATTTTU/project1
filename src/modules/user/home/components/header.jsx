import {Link }from "react-router-dom"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Link as ScrollLink } from "react-scroll";
import Logo from "../../../../assets/logo.jpg";

export const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setIsMenuOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	return (
		<div className="absolute top-0 left-0 right-0 z-50 ">
			<div className="container mx-auto px-4">
				<div className="flex justify-between  items-center h-16 md:h-20">
					<div className="flex items-center">
						<Link to="/" className="flex items-center justify-center ">
							<span className=" text-2xl md:text-4xl text-white font-bold flex justify-center items-center">
								<span className="inline-block">
									<img src={Logo} alt="logo" className="lg:w-12 w-12  " />
								</span>
								KhajaBox
							</span>
						</Link>
					</div>

					<div className="hidden md:flex items-center space-x-8">
						<ScrollLink
							smooth={true}
							duration={500}
							to="/about"
							className="text-white cursor-pointer lg:text-xl hover:text-green-400 transition-colors text-sm font-medium"
						>
							About Us
						</ScrollLink>
						<Link
							to="/authpage"
							className="text-white lg:text-xl hover:text-green-400 transition-colors text-sm font-medium"
						>
							Login/Register
						</Link>
					</div>

					<div className="md:hidden flex items-center">
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="text-white focus:outline-none"
							aria-label={isMenuOpen ? "Close menu" : "Open menu"}
							aria-expanded={isMenuOpen}
						>
							{isMenuOpen ? (
								<X className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</button>
					</div>
				</div>

				<div
					className={`md:hidden transition-all bg-white rounded-xl  duration-300 overflow-hidden ${
						isMenuOpen
							? "max-h-60 opacity-100 py-4  backdrop-blur-sm"
							: "max-h-0 opacity-0 py-0"
					}`}
				>
					<div className="flex flex-col space-y-4 pb-4 p-5">
						<ScrollLink
							to="/about"
							smooth={true}
							duration={500}
							className=" hover:text-bg-[#426B1F] transition-colors text-sm font-medium"
							onClick={() => setIsMenuOpen(false)}
						>
							About Us
						</ScrollLink>

						<Link
							to="/authpage"
							className="bg-[#426B1F] hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium inline-block w-full text-center"
							onClick={() => setIsMenuOpen(false)}
						>
							Login/Signup
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

