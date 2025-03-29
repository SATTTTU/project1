import { useAllOrders } from "../api/getAllOrders";
import { EmptyOrder } from "./emptyOrder";
import { OrderItem } from "./orderItem";
const OrdersContent = () => {
	const { data: orders } = useAllOrders();

	return (
		<div>
			<h2 className="text-2xl font-bold mb-6">Your Orders</h2>

			{orders?.length > 0 ? (
				<div className="space-y-6">
					{orders.map((order) => (
						<OrderItem key={order.id} order={order} />
					))}
				</div>
			) : (
				<EmptyOrder />
			)}
		</div>
	);
};
export default OrdersContent;
