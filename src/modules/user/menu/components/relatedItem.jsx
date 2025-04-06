import React from 'react'
import { Link } from "react-router-dom"
import { FiStar } from "react-icons/fi"

const RelatedItems = ({ items }) => {
  return (
		<div className="mb-12">
			<h2 className="text-xl font-bold mb-6">You May Also Like</h2>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{items.map((item) => (
					<Link
						to={`/food/${item.id}`}
						key={item.id}
						className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
					>
						<div className="relative h-48">
							<img
								src={item.img || "/placeholder.svg"}
								alt={item?.name}
								className="w-full h-full object-cover"
							/>
							<div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full shadow-md flex items-center">
								<FiStar className="text-yellow-500 fill-current mr-1" />
								<span className="font-medium">{item.rating}</span>
							</div>
						</div>

						<div className="p-4">
							<h3 className="font-bold text-lg mb-1">{item?.name}</h3>
							<p className="text-gray-600 text-sm mb-3">By {item.cook?.name}</p>

							<div className="flex justify-between items-center">
								<span className="text-xl font-bold">Rs. {item.price}</span>
								<span className="text-sm text-gray-500">
									{item.preparationTime}
								</span>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

export default RelatedItems