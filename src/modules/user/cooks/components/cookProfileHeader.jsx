import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
	FiArrowLeft,
	FiStar,
	FiPhone,
	FiMail,
	FiMapPin,
	FiClock,
} from "react-icons/fi";

export const CookProfileHeader = ({ cook, isFavorite, toggleFavorite }) => {
	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
			<div className="relative h-48 bg-gradient-to-r from-green-400 to-green-600">
				<button
					onClick={toggleFavorite}
					className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
				>
					{isFavorite ? (
						<AiFillHeart className="text-red-500 text-xl" />
					) : (
						<AiOutlineHeart className="text-gray-600 text-xl" />
					)}
				</button>
			</div>

			<div className="relative px-6 pb-6">
				<div className="flex flex-col md:flex-row">
					<div className="md:w-1/4">
						<img
							src={cook.img}
							alt={cook?.name}
							className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg -mt-16 md:-mt-20 mx-auto md:mx-0"
						/>
					</div>

					<div className="md:w-3/4 mt-4 md:mt-0 text-center md:text-left">
						<h1 className="text-2xl md:text-3xl text-[#426B1F] font-bold">
							{cook?.name}
						</h1>

						<div className="flex items-center justify-center md:justify-start mt-2">
							<div className="flex items-center text-yellow-500 mr-2">
								<FiStar className="fill-current" />
								<span className="ml-1 font-medium">{cook.rating}</span>
							</div>
							<span className="text-gray-500">
								({cook.reviewCount} reviews)
							</span>
						</div>

						<div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
							{cook.specialties?.map((specialty, index) => (
								<span
									key={index}
									className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
								>
									{specialty}
								</span>
							))}
						</div>

						<p className="mt-4 text-gray-600">{cook.bio}</p>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
							<div className="flex items-center">
								<FiMapPin className="text-gray-500 mr-2" />
								<span className="text-gray-700">{cook.location}</span>
							</div>

							<div className="flex items-center">
								<FiClock className="text-gray-500 mr-2" />
								<span className="text-gray-700">{cook.workingHours}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
