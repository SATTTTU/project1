import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import Category1 from "../../../../../../assets/UserImages/Category/Cato1.jpg";
import Logo from "../../../../../../assets/logo.jpg";
import Cook1 from "../../../../../../assets/UserImages/cook/cook1.png";
import Cook2 from "../../../../../../assets/UserImages/cook/cook2.jpeg";
import Cook3 from "../../../../../../assets/UserImages/cook/cook3.jpeg";
import Cook4 from "../../../../../../assets/UserImages/cook/cook5.jpeg";
import Cook5 from "../../../../../../assets/UserImages/cook/cook1.png";
import Cook6 from "../../../../../../assets/UserImages/cook/cook1.png";
import Burger from "../../../../../../assets/UserImages/burger.jpg";
import Grand from "../../../../../../assets/UserImages/Ai.jpeg";
import Lunch from "../../../../../../assets/UserImages/Lunch.jpeg";
import { Badge } from "../../../../../../components/ui/badge/Badge";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Profile } from "../../Profile/Profile";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const Homepage = () => {
	return (
		<div className="min-h-screen bg-white">
			<header className="sticky top-0 z-50 bg-white shadow">
				<div className="container flex items-center justify-between h-20 px-4 mx-auto">
					<Link href="/" className="flex items-center justify-center">
						<div className="relative w-10 h-10">
							<img src={Logo} alt="logo" />
						</div>
						<span className="text-2xl font-bold text-green-500">KhanaBox</span>
					</Link>

					<div className="hidden md:flex items-center space-x-4">
						<Link href="#" className="text-sm font-medium text-gray-700">
							Special Offers
						</Link>
						<Link
							href="#"
							className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full"
						>
							Orders
						</Link>
						<Link href="#" className="text-sm font-medium text-gray-700">
							Track Order
						</Link>
					</div>

					<div className="flex items-center space-x-4">
						<Link to="/user/cart" className="relative">
							<AiOutlineShoppingCart className="w-8 h-8 text-gray-700" />
							<Badge className="absolute -top-3 -right-4   text-xs bg-red-500 text-white rounded-full">
								2
							</Badge>
						</Link>
						<div className="">
							<Profile />
						</div>
					</div>
				</div>
			</header>
	
			<main className="container px-4 py-6 mx-auto">
				<section className="mb-8">
					<div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
						<h2 className="text-xl font-bold">Up to -40% deals</h2>
						<div className="relative mt-2 md:mt-0 md:w-72">
							<input
								type="text"
								placeholder="Search from menu..."
								className="pl-10 pr-4 py-2 w-full border rounded-full"
							/>
							<CiSearch className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
						</div>
					</div>

					<div className="flex flex-wrap gap-2 mb-6">
						<Badge variant="outline" className="px-3 py-1 rounded-full">
							Vegan
						</Badge>
						<Badge variant="outline" className="px-3 py-1 rounded-full">
							Sushi
						</Badge>
						<Badge
							variant="outline"
							className="px-3 py-1 rounded-full text-green-500 border-green-500"
						>
							Pizza & Fast food
						</Badge>
						<Badge variant="outline" className="px-3 py-1 rounded-full">
							Others
						</Badge>
					</div>

					<div className="grid grid-cols-1 gap-4  lg:grid-cols-3">
						{/* Restaurant Card 1 */}
						<div className="overflow-hidden bg-white rounded-lg shadow-md">
							<div className="relative">
								<img
									src={Category1}
									alt="Chef Burgers"
									width={400}
									height={400}
									className="object-cover w-full h-60"
								/>
								<div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs font-bold rounded">
									-40%
								</div>
								<div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
									<span className="text-xs font-medium text-white">
										BURGERS
									</span>
									<h3 className="text-lg font-bold text-white">Chef Burgers</h3>
									<p className="text-sm text-white">London</p>
								</div>
							</div>
						</div>

						{/* Restaurant Card 2 */}
						<div className="overflow-hidden bg-white rounded-lg shadow-md">
							<div className="relative">
								<img
									src={Grand}
									alt="Grand Al Café"
									width={400}
									height={400}
									className="object-cover w-full h-60"
								/>
								<div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs font-bold rounded">
									-30%
								</div>
								<div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
									<span className="text-xs font-medium text-white">CAFÉ</span>
									<h3 className="text-lg font-bold text-white">
										Grand Al Café
									</h3>
									<p className="text-sm text-white">London</p>
								</div>
							</div>
						</div>

						{/* Restaurant Card 3 */}
						<div className="overflow-hidden bg-white rounded-lg shadow-md">
							<div className="relative">
								<img
									src={Lunch}
									alt="Buttered Café"
									width={400}
									height={400}
									className="object-cover w-full h-60"
								/>
								<div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs font-bold rounded">
									-17%
								</div>
								<div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
									<span className="text-xs font-medium text-white">CAFÉ</span>
									<h3 className="text-lg font-bold text-white">
										Buttered Café
									</h3>
									<p className="text-sm text-white">London</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Popular Categories */}
				<section className="mb-12">
					<h2 className="mb-6 text-2xl text-center font-bold text-gray-800">
						Popular Categories{" "}
					</h2>
					<div className="grid grid-cols-1 gap-6  md:grid-cols-2 lg:grid-cols-6">
						{categories.map((category, index) => (
							<Link
								href="#"
								key={index}
								className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
							>
								<div className="w-40 h-40 mb-3 overflow-hidden rounded-full bg-gray-100 shadow-md">
									<img
										src={category.img}
										alt={category.name}
										className="object-cover w-full h-full"
									/>
								</div>
								<span className="text-sm font-medium text-gray-700 sm:text-base">
									{category.name}
								</span>
							</Link>
						))}
					</div>
				</section>

				{/* Popular Cooks */}
				<section className="p-6 mb-12 rounded-lg bg-white">
					<h2 className="mb-6 text-2xl font-bold text-center text-green-600">
						Popular Cooks
					</h2>

					<div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-5">
						{cooks.map((cook, index) => (
							<Link
								href="#"
								key={index}
								className="flex flex-col items-center p-4 transition-transform transform bg-blue rounded-sm w-40 md:w-50 shadow-md hover:scale-105 hover:shadow-lg"
							>
								<div className="relative mb-3 overflow-hidden w-40 h-40  md:w-50 md:h-50 ">
									<img
										src={cook.img || "/placeholder.svg"}
										alt={cook.name}
										className="w-full h-full object-cover "
									/>
								</div>
								<span className="text-sm font-medium text-gray-800 sm:text-base">
									{cook.name}
								</span>
							</Link>
						))}
					</div>
				</section>

				<section className="mb-8">
					<h2 className="mb-4 text-xl font-bold text-center">Popular Items</h2>
					<div className="relative">
						<Swiper
							modules={[Navigation, Pagination, Autoplay]}
							spaceBetween={30}
							slidesPerView={1}
							breakpoints={{
								640: { slidesPerView: 1 },
								768: { slidesPerView: 2 },
								1024: { slidesPerView: 3 },
							}}
							navigation
							pagination={{ clickable: true }}
							autoplay={{ delay: 3000 }}
							className="pb-30"
							style={{
								paddingBottom: "50px", // Space for pagination dots
							}}
						>
							{popularItems.map((item, index) => (
								<SwiperSlide key={index}>
									<div className="overflow-hidden bg-white rounded-lg shadow-md">
										<div className="relative">
											<img
												src={item.img || "/placeholder.svg"}
												alt={item.name}
												width={600}
												height={200}
												className="object-cover w-full h-48 md:h-56 lg:h-64"
											/>
										</div>
										<div className="p-3">
											<h3 className="text-lg font-medium">{item.name}</h3>
											<p className="mb-3 text-lg font-bold">${item.price}</p>
											<button className="w-full bg-green-600 py-3 rounded-xl text-white hover:bg-green-700">
												Order Now
											</button>
										</div>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</section>
				<footer className="bg-gray-100 border-t border-gray-200 pt-12 pb-6">
					<div className="container mx-auto px-4 md:px-8">
						<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
							<div className="col-span-1">
								<Link href="/" className="flex items-center mb-4">
									<img
										src={Logo}
										alt="KhanaBox Logo"
										width={40}
										height={40}
										className="mr-2"
									/>
									<span className="text-2xl font-bold text-green-600">
										KhanaBox
									</span>
								</Link>
								<p className="text-sm text-gray-600 mb-4">
									Company # 000000-445
								</p>
								<p className="text-sm text-gray-600">Copyright 2023</p>
								<div className="flex space-x-4 mt-4">
									{/* <Link href="#" aria-label="Facebook">
                  <Facebook className="h-5 w-5 text-gray-600 hover:text-green-600" />
                </Link>
                <Link href="#" aria-label="Twitter">
                  <Twitter className="h-5 w-5 text-gray-600 hover:text-green-600" />
                </Link>
                <Link href="#" aria-label="Instagram">
                  <Instagram className="h-5 w-5 text-gray-600 hover:text-green-600" />
                </Link>
                <Link href="#" aria-label="Snapchat">
                  <Snapchat className="h-5 w-5 text-gray-600 hover:text-green-600" />
                </Link>
                */}
								</div>
							</div>

							<div className="col-span-1">
								<h3 className="text-lg font-semibold mb-4">
									Get Exclusive Deals in your Inbox
								</h3>
								{/* <NewsletterForm /> */}
							</div>

							<div className="col-span-1">
								<h3 className="text-lg font-semibold mb-4">Legal Pages</h3>
								<ul className="space-y-2">
									<li>
										<Link
											href="#"
											className="text-gray-600 hover:text-green-600"
										>
											Terms and Conditions
										</Link>
									</li>
									<li>
										<Link
											href="#"
											className="text-gray-600 hover:text-green-600"
										>
											Privacy
										</Link>
									</li>
								</ul>
							</div>

							<div className="col-span-1">
								<h3 className="text-lg font-semibold mb-4">Important Links</h3>
								<ul className="space-y-2">
									<li>
										<Link
											href="#"
											className="text-gray-600 hover:text-green-600"
										>
											FAQ
										</Link>
									</li>
									<li>
										<Link
											href="#"
											className="text-gray-600 hover:text-green-600"
										>
											Sign up to deliver
										</Link>
									</li>
									<li>
										<Link
											href="#"
											className="text-gray-600 hover:text-green-600"
										>
											Create a business account
										</Link>
									</li>
								</ul>
							</div>
						</div>

						<div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-600">
							<p>© Order Copyright 2023. All Rights Reserved.</p>
							<div className="flex flex-wrap gap-4 mt-4 md:mt-0">
								<Link href="#" className="hover:text-green-600">
									Privacy Policy
								</Link>
								<Link href="#" className="hover:text-green-600">
									Terms
								</Link>
								<Link href="#" className="hover:text-green-600">
									Pricing
								</Link>
								<span>Do not sell or share my personal information</span>
							</div>
						</div>
					</div>
				</footer>
			</main>
		</div>
	);
};

// Sample data
const categories = [
	{ name: "Burgers & Fast", img: Category1 },
	{ name: "Salads", img: Category1 },
	{ name: "Pasta & Cousous", img: Category1 },
	{ name: "Pizza", img: Category1 },
	{ name: "Breakfast", img: Category1 },
	{ name: "Soups", img: Category1 },
];

const cooks = [
	{ name: "Ram Singh", img: Cook1 },
	{ name: "Sushma Singh", img: Cook2 },
	{ name: "Arpita Thapa", img: Cook3 },
	{ name: "Tawas Mom", img: Cook4 },
	{ name: "Rupger Ki", img: Cook1 },
];

const popularItems = [
	{ name: "Cheese Burger", price: "11.88", img: Burger },
	{ name: "Pancake", price: "11.99", img: Burger },
	{ name: "Crispy Sandwich", price: "13.99", img: Burger },
	{ name: "Crispy Sandwich", price: "13.99", img: Burger },
	{ name: "Crispy Sandwich", price: "13.99", img: Burger },
	{ name: "Crispy Sandwich", price: "13.99", img: Burger },
];
