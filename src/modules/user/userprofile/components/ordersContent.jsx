import  { EmptyOrder } from "./emptyOrder";
import { OrderItem } from "./orderItem";
 const OrdersContent = () => {
	const orders = [
		{
			id: "ORD-12345",
			date: "March 10, 2025",
			total: "Rs.497",
			status: "Delivered",
			items: [
				{ name: "Cheese Burger", quantity: 2, price: "Rs. 23.76" },
				{ name: "Crispy Sandwich", quantity: 1, price: "Rs. 13.99" },
			],
		},
		{
			id: "ORD-12344",
			date: "March 5, 2025",
			total: "Rs. 3298",
			status: "Delivered",
			items: [
				{ name: "Veggie Bowl", quantity: 1, price: "Rs.10.99" },
				{ name: "Pancake", quantity: 1, price: "Rs.11.99" },
			],
		},
		{
			id: "ORD-12343",
			date: "February 28, 2025",
			total: "Rs.15.99",
			status: "Delivered",
			items: [{ name: "Steak Sandwich", quantity: 1, price: "Rs.15.99" }],
		},
	];

	return (
		<div>
			<h2 className="text-2xl font-bold mb-6">Your Orders</h2>

			{orders.length > 0 ? (
				<div className="space-y-6">
					{orders.map((order) => (
						<OrderItem key={order.id} order={order} />
					))}
				</div>
			) : (
				<EmptyOrder/>
			)}
		</div>
	);
};
export default OrdersContent;