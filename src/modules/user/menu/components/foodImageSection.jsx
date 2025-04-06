const FoodImageSection = ({ food }) => {
	const imageUrl = "https://khajabox-bucket.s3.ap-south-1.amazonaws.com/";

	return (
		<div className="w-full md:w-1/2 p-4 flex justify-center items-center">
			<div className="relative w-full h-48 sm:h-60 md:h-80 rounded-xl shadow-md overflow-hidden">
				<img
					src={`${imageUrl}${food[0]?.image_url}`}
					alt={food?.name}
					className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
				/>
			</div>
		</div>
	);
};

export default FoodImageSection;
