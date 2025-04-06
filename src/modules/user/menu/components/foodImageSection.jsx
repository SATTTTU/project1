const FoodImageSection = ({ food }) => {
	const imageUrl = "https://khajabox-bucket.s3.ap-south-1.amazonaws.com/";
  
	return (
		<div className="md:w-1/2 p-6 flex justify-center items-center">
			<div className="relative w-full h-72 md:h-96 rounded-lg shadow-lg overflow-hidden">
				<img
					src={`${imageUrl}${food[0]?.image_url}`}
					alt={food?.name}
					className="w-full h-full object-cover transform transition duration-500 hover:scale-105"
				/>
			</div>
		</div>
	);
  };
  
  export default FoodImageSection;
  