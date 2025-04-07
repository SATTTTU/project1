import { useCurrentOrders } from "../../cart/api/currentOrders";
import { useAllOrders } from "../api/getAllOrders";
import { EmptyOrder } from "./emptyOrder";
import { OrderItem } from "./orderItem";
export const OrdersContent = () => {
	const { data: orders } = useAllOrders();
	console.log("orders",orders)
	const { data: currentorders } = useCurrentOrders();


	return (
		<div>
			<h2 className="text-2xl font-bold mb-6">Your Orders</h2>

			{currentorders?.length > 0 ? (
				<div className="space-y-6">
					{currentorders.map((order) => (
						<OrderItem key={order.id} order={order} />
					))}
				</div>
			) : (
				<EmptyOrder />
			)}
		</div>
	);
};
