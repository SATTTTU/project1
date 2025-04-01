import {Link} from "react-router-dom"
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
		<div className="absolute top-0 left-0 right-0 z-50">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center h-16 md:h-20   bg-opacity-20 rounded-b-lg px-4 md:px-6">
					<div className="flex items-center">
						<Link to="/" className="flex items-center justify-center">
							<span className="text-[#426B1F] text-xl md:text-2xl font-bold flex items-center">
								<img src={Logo} alt="logo" className="h-8 md:h-10 lg:w-10  w-auto " />
								<div className="pt-2 text-xl lg:text-4xl">KhajaBox</div>
							</span>
						</Link>
					</div>

					<div className="hidden md:flex items-center space-x-8">
						<ScrollLink
							smooth={true}
							duration={500}
							to="about"
							className=" text-[#426B1F] cursor-pointer text-sm lg:text-xl hover:text-green-400 transition-colors font-medium tracking-wide"
						>
							About Us
						</ScrollLink>
						<Link
							to="/authpage"
							className="text-white bg-[#426B1F] hover:bg-green-800 px-5 py-2 rounded-lg shadow-lg transition-all duration-300 text-sm lg:text-xl font-medium tracking-wide border "
						>
							Login/Register
						</Link>
					</div>

					<div className="md:hidden flex items-center">
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="text-[#426B1F] p-2 rounded-md shadow-lg hover:bg-green-600 transition-colors duration-300"
							aria-label={isMenuOpen ? "Close menu" : "Open menu"}
							aria-expanded={isMenuOpen}
						>
							{isMenuOpen ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
						</button>
					</div>
				</div>

				<div
					className={`md:hidden transition-all bg-slate-100 bg-opacity-70 backdrop-blur-md rounded-xl duration-300 overflow-hidden mt-2 ${
						isMenuOpen
							? "max-h-60 opacity-100 py-4 shadow-xl"
							: "max-h-0 opacity-0 py-0"
					}`}
				>
					<div className="flex flex-col space-y-4 pb-4 p-5">
						<ScrollLink
							to="about"
							smooth={true}
							duration={500}
							className="text-center text-[#426B1F] hover:text-green-400 transition-colors text-sm font-medium tracking-wide"
							onClick={() => setIsMenuOpen(false)}
						>
							About Us
						</ScrollLink>

						<Link
							to="/authpage"
							className=" hover:bg-green-600 text-[#426B1F] rounded-md transition-all duration-300 text-sm font-medium inline-block w-full text-center "
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