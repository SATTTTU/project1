export const OrderItem = ({ order }) => {
	console.log("orders items", order);

	const imageUrl = "https://khajabox-bucket.s3.ap-south-1.amazonaws.com/";

	return (
		<div className="bg-gray-50 rounded-lg overflow-hidden">
			<div className="bg-gray-100 p-4 flex flex-wrap justify-between items-center">
				<div>
					<span className="text-sm text-gray-500">Order ID:</span>
					<span className="ml-2 font-medium">{order?.order_id}</span>
				</div>
				{/* <div>
            <span className="text-sm text-gray-500">Date:</span>
            <span className="ml-2">{order.date}</span>
          </div> */}
				<div>
					{order?.items?.map((item) => (
						<div>
							<span className="text-sm text-gray-500">Total:</span>
							<span className="ml-2 font-medium">{item.total}</span>
						</div>
					))}
				</div>
				<div>
					<span
						className={`px-3 py-1 rounded-full text-sm ${
							order.status === "Delivered"
								? "bg-green-100 text-green-800"
								: order.status === "Processing"
								? "bg-blue-100 text-blue-800"
								: "bg-yellow-100 text-yellow-800"
						}`}
					>
						{order.status}
					</span>
				</div>
			</div>

			<div className="p-4">
				<h3 className="font-medium mb-3">Order Items</h3>
				<div className="space-y-2">
					{order.items.map((item, index) => (
						<div
							key={index}
							className="flex justify-around py-2 border-b last:border-b-0"
						>
							<img
								src={`${imageUrl}${item?.menu_item?.image_url}`}
								alt="image"
								className="w-full h-full object-cover"
							/>

							<div>
								<span className="font-medium">{item?.menu_item?.name}</span>
							</div>
							<div>
								<span className="text-gray-500 ml-2">x{item.quantity}</span>
							</div>
							<div>
								<span>{item.price}</span>
							</div>
						</div>
					))}
				</div>

				<div className="mt-4 flex justify-end">
					<button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
						Order Again
					</button>
				</div>
			</div>
		</div>
	);
};
