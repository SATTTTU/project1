import { useState, useEffect } from "react";

const Cart = () => {
  const [cart, setCart] = useState(null);
  console.log("cart", cart)

  useEffect(() => {
    // Simulating an API call, replace with your actual API call
    fetch("/api/baskets/index") // Replace with your actual API endpoint
    .then((response) => response.json())
    .then((data) => setCart(data.data)) // Assuming the response structure is as provided
    .catch((error) => console.error("Error fetching cart:", error));
    // console.log(response.data)
  }, []);

  if (!cart) return <p>Loading...</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="space-y-4">
        {cart.items.map((item) => (
          <div key={item.item_id} className="flex items-center border p-4 rounded-lg">
            <img
              src={item.menu_item.image_url}
              alt={item.menu_item.name}
              className="w-20 h-20 object-cover rounded-md mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold">{item.menu_item.name}</h3>
              <p className="text-sm text-gray-600">{item.menu_item.description}</p>
              <p className="text-md font-bold">${item.price}</p>
              <p className="text-sm">Quantity: {item.quantity}</p>
              <p className="text-md font-semibold">Total: ${item.total}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-lg font-bold">Cart Status: {cart.status}</p>
    </div>
  );
};

export default Cart;
