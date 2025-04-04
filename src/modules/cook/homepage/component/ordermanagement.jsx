import React, { useState, useEffect } from "react";
import { useGetUserOrder } from "../api/getUserOrder";
import OrderRequestCard from "./orderrequest";
import { OrderCard } from "../../orders/component/ordercard";

const OrderManagement = () => {
	const [filterStatus, setFilterStatus] = useState("all");

	const { data: fetchedOrders, isLoading, isError } = useGetUserOrder();
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		if (fetchedOrders) {
			setOrders(fetchedOrders);
		}
	}, [fetchedOrders]);

	if (isLoading)
		return <div className="text-center p-4">Loading orders...</div>;
	if (isError)
		return (
			<div className="text-center p-4 text-red-500">Error fetching orders</div>
		);

	console.log("Current Orders*******:", orders);


	const filteredOrders =
		filterStatus === "all"
			? orders
			: orders.filter((order) => order.status === filterStatus);

	const updateOrderStatus = (order_id, newStatus) => {
		console.log(order_id, newStatus);
		setOrders((prevOrders) =>
			prevOrders.map((order) =>
				order.id === order_id ? { ...order, status: newStatus } : order
			)
		);
	};

	return (
		<div className="max-w-4xl mx-auto p-4">
			<h2 className="mb-4 text-xl font-bold">New Order Requests</h2>
			{filteredOrders.length > 0 ? (
				<div className="grid gap-4 mb-8">
					{filteredOrders.map((order) => (
						<OrderCard
							key={order.id}
							order={order}
							updateOrderStatus={updateOrderStatus} 
						/>
					))}
				</div>
			) : (
				<p className="text-center py-4">No orders available</p>
			)}
		</div>
	);
};

export default OrderManagement;
