

const FoodImageSection = ({ food }) => {
	console.log("food****",food)
	const imageUrl = "https://khajabox-bucket.s3.ap-south-1.amazonaws.com/";

	return (
		<div className="md:w-1/2 p-6 flex flex-col justify-center items-center">
			<div className="relative w-full h-72 md:h-full rounded-lg shadow-lg overflow-hidden">
				<img
					src={`${imageUrl}${food[0].image_url}`}
					alt={food.name}
					className="w-full h-full object-cover transform transition duration-500 hover:scale-105"
				/>

				<div className="absolute top-4 right-4 flex space-x-2 z-10"></div>
			</div>
		</div>
	);
};

export default FoodImageSection;
