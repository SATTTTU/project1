import { CartItem } from "./cartitem";
import { useDeleteBasket } from "../api/deleteBasket";
import { toast } from "react-toastify";

export const CartItems = ({
	items,
	onQuantityChange,
	onRemoveItem,
	isUpdating,
	isDeleting,
}) => {
	const { mutate: deleteBasket, isLoading: isDeletingBasket } =
		useDeleteBasket();

	const handleDeleteBasket = () => {
		deleteBasket(
			{},
			{
				onSuccess: () => {
					console.log("delete basket");
					toast.success("Basket deleted successfully!");
				},
				onError: (error) => {
					toast.error(`Failed to delete basket: ${error.message}`);
				},
			}
		);
	};

	return (
		<>
			<div className="flex justify-between">
				<h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
				<button
					className="text-end bg-red-500 mb-10  text-white py-2 px-4 rounded-md hover:bg-red-700 transition disabled:opacity-50"
					onClick={handleDeleteBasket}
					disabled={isDeletingBasket}
				>
					{isDeletingBasket ? "Deleting..." : "Delete Basket"}
				</button>
			</div>

			<div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
				<div className="p-6">
					{items[0]?.items?.map((item) => (
						<CartItem
							key={item.item_id}
							item={item}
							onQuantityChange={onQuantityChange}
							onRemoveItem={onRemoveItem}
							isUpdating={isUpdating}
							isDeleting={isDeleting}
						/>
					))}
				</div>
			</div>
		</>
	);
};
