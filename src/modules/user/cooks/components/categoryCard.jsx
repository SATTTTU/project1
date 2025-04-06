import { BiCategory } from "react-icons/bi"

export const CategoryCard = ({ category, onClick }) => {
  return (
		<div
			onClick={onClick}
			className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
		>
			<div className="relative h-40">
				<img
					src={category.dishes[0]?.img || "/placeholder.svg"}
					alt={category?.name}
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
					<div className="text-center">
						<BiCategory className="mx-auto text-white text-3xl mb-2" />
						<h3 className="text-white font-bold text-lg">{category?.name}</h3>
						<p className="text-white text-sm">
							{category.count} {category.count === 1 ? "dish" : "dishes"}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}