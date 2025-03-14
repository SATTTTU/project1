// tabs/WishlistContent.jsx
import WishlistItem from "./wishlist/WishlistItem";
import EmptyWishlistState from "./wishlist/EmptyWishlistState";

const WishlistContent = () => {
  const wishlistItems = [
    {
      id: 1,
      name: "Cheese Burger",
      price: "$11.88",
      img: "/placeholder.svg?height=200&width=300",
      cook: "Ram Singh",
    },
    {
      id: 3,
      name: "Crispy Sandwich",
      price: "$13.99",
      img: "/placeholder.svg?height=200&width=300",
      cook: "Arpita Thapa",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <WishlistItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyWishlistState />
      )}
    </div>
  );
};

export default WishlistContent;