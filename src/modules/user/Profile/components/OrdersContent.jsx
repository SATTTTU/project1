import EmptyOrderState from "./EmptyOrder";
import { OrderItem } from "./OrderItem";

const OrdersContent = () => {
  const orders = [
    {
      id: "ORD-12345",
      date: "March 10, 2025",
      total: "$45.97",
      status: "Delivered",
      items: [
        { name: "Cheese Burger", quantity: 2, price: "$23.76" },
        { name: "Crispy Sandwich", quantity: 1, price: "$13.99" },
      ],
    },
    {
      id: "ORD-12344",
      date: "March 5, 2025",
      total: "$32.98",
      status: "Delivered",
      items: [
        { name: "Veggie Bowl", quantity: 1, price: "$10.99" },
        { name: "Pancake", quantity: 1, price: "$11.99" },
      ],
    },
    {
      id: "ORD-12343",
      date: "February 28, 2025",
      total: "$15.99",
      status: "Delivered",
      items: [{ name: "Steak Sandwich", quantity: 1, price: "$15.99" }],
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
        <EmptyOrderState />
      )}
    </div>
  );
};

export default OrdersContent;