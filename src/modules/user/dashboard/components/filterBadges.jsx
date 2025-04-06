

import { useState } from "react"
import { useDiscountMenu } from "../api/specialOffers";
import { useParams } from "react-router-dom";
import { useGetSingleCook } from "../../cooks/api/getCookProfie";

export const  PromotedRestaurants = () => {
  const{ id }= useParams();
    const { data: cookData, isLoading, isError } = useGetSingleCook(id);
  console.log("cook ko data***", cookData)
  const {data: discountoffers}= useDiscountMenu(id);
  console.log("Discount offers", discountoffers)
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  // Restaurant and offer data - limited to 4
  const restaurants = [
    {
      id: 1,
      name: "Matka Biryani",
      location: "Tinkune",
      rating: 3.9,
      deliveryFee: 35,
      offer: {
        type: "percentage",
        value: 90,
        description: "on Mustang Aaloo",
        image: "/placeholder.svg?height=200&width=200",
      },
      menu: [
        {
          id: 101,
          name: "Mustang Aaloo",
          price: 120,
          discountedPrice: 12,
          description: "Spicy potato wedges with herbs and spices",
        },
        {
          id: 102,
          name: "Chicken Biryani",
          price: 350,
          discountedPrice: 350,
          description: "Fragrant rice with chicken and spices",
        },
        {
          id: 103,
          name: "Mutton Biryani",
          price: 450,
          discountedPrice: 450,
          description: "Fragrant rice with mutton and spices",
        },
      ],
    },
    {
      id: 2,
      name: "Sinka",
      location: "Koteshwor",
      rating: 3.8,
      deliveryFee: 35,
      offer: {
        type: "fixed",
        value: 299,
        description: "Combo at just",
        subtext: "Chicken Momo 6pcs + Mustang Aaloo (Plate) + Coke 250ml",
        image: "/placeholder.svg?height=200&width=200",
      },
      menu: [
        {
          id: 201,
          name: "Combo Meal",
          price: 299,
          discountedPrice: 299,
          description: "Chicken Momo 6pcs + Mustang Aaloo (Plate) + Coke 250ml",
        },
        {
          id: 202,
          name: "Chicken Momo",
          price: 180,
          discountedPrice: 180,
          description: "Steamed dumplings filled with chicken",
        },
        {
          id: 203,
          name: "Veg Momo",
          price: 150,
          discountedPrice: 150,
          description: "Steamed dumplings filled with vegetables",
        },
      ],
    },
    {
      id: 3,
      name: "Amore Pizza",
      location: "Koteshwor",
      rating: 3.9,
      deliveryFee: 35,
      offer: {
        type: "percentage",
        value: 40,
        description: "on all Pizza",
        image: "/placeholder.svg?height=200&width=200",
      },
      menu: [
        {
          id: 301,
          name: "Margherita Pizza",
          price: 350,
          discountedPrice: 210,
          description: "Classic pizza with tomato sauce and cheese",
        },
        {
          id: 302,
          name: "Pepperoni Pizza",
          price: 450,
          discountedPrice: 270,
          description: "Pizza with pepperoni slices",
        },
        {
          id: 303,
          name: "Veggie Delight Pizza",
          price: 400,
          discountedPrice: 240,
          description: "Pizza with assorted vegetables",
        },
      ],
    },
    {
      id: 4,
      name: "Indian Tadka",
      location: "Baneshwor",
      rating: 4.1,
      deliveryFee: 35,
      offer: {
        type: "fixed",
        value: 799,
        description: "Butter Tadka at just",
        image: "/placeholder.svg?height=200&width=200",
      },
      menu: [
        {
          id: 401,
          name: "Butter Tadka",
          price: 799,
          discountedPrice: 799,
          description: "Rich and creamy lentil dish with butter",
        },
        {
          id: 402,
          name: "Butter Chicken",
          price: 450,
          discountedPrice: 450,
          description: "Chicken in rich tomato and butter gravy",
        },
        { id: 403, name: "Butter Naan", price: 80, discountedPrice: 80, description: "Soft bread with butter" },
      ],
    },
  ]

  // Back to offers list
  const handleBackToOffers = () => {
    setSelectedRestaurant(null)
  }

  // Render percentage discount offer card
  const PercentageOfferCard = ({ restaurant }) => {
    return (
      <div
        className="bg-blue-50 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow h-full flex flex-col"
        onClick={() => setSelectedRestaurant(restaurant)}
      >
        <div className="relative h-32">
          <img
            src={restaurant.offer.image || "/placeholder.svg"}
            alt={restaurant.offer.description}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
            {restaurant.rating} ★
          </div>
        </div>
        <div className="p-3 flex-1 flex flex-col">
          <h3 className="text-2xl font-bold text-slate-700">{restaurant.offer.value}% OFF</h3>
          <p className="text-slate-600 text-sm">{restaurant.offer.description}</p>
          <div className="mt-2 text-sm text-gray-600">
            {restaurant?.name} - {restaurant.location}
          </div>
          <button className="bg-red-600 text-white px-3 py-1 rounded-md mt-auto text-sm font-medium uppercase w-full">
            ORDER NOW
          </button>
        </div>
      </div>
    )
  }

  // Render fixed price offer card
  const FixedPriceOfferCard = ({ restaurant }) => {
    return (
      <div
        className="bg-blue-50 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow h-full flex flex-col"
        onClick={() => setSelectedRestaurant(restaurant)}
      >
        <div className="relative h-32">
          <img
            src={restaurant.offer.image || "/placeholder.svg"}
            alt={restaurant?.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
            {restaurant.rating} ★
          </div>
        </div>
        <div className="p-3 flex-1 flex flex-col">
          <p className="text-sm text-slate-700">{restaurant.offer.description}</p>
          <h3 className="text-2xl font-bold text-slate-700">Rs. {restaurant.offer.value}</h3>
          {restaurant.offer.subtext && <p className="text-slate-600 text-xs">{restaurant.offer.subtext}</p>}
          <div className="mt-2 text-sm text-gray-600">
            {restaurant?.name} - {restaurant.location}
          </div>
          <button className="bg-red-600 text-white px-3 py-1 rounded-md mt-auto text-sm font-medium uppercase w-full">
            ORDER NOW
          </button>
        </div>
      </div>
    )
  }

  // Restaurant header component
  const RestaurantHeader = ({ restaurant }) => {
    return (
      <div className="flex items-center">
        <h2 className="text-xl font-bold text-gray-800">
          {restaurant?.name} - {restaurant.location}
        </h2>
        <div className="flex items-center ml-auto">
          <div className="flex items-center bg-orange-100 px-2 py-0.5 rounded">
            <span className="text-orange-500 mr-1">★</span>
            <span className="font-medium">{restaurant.rating}</span>
          </div>
          <div className="flex items-center ml-3 text-gray-600">
            <svg
              className="w-4 h-4 mr-1 text-green-600"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L4 5V11.09C4 16.14 7.41 20.85 12 22C16.59 20.85 20 16.14 20 11.09V5L12 2Z"
                fill="currentColor"
              />
            </svg>
            <span>₹{restaurant.deliveryFee}</span>
          </div>
        </div>
      </div>
    )
  }

  // Menu item component
  const MenuItem = ({ item }) => {
    const [quantity, setQuantity] = useState(0)

    const addToCart = () => {
      setQuantity(quantity + 1)
    }

    const removeFromCart = () => {
      if (quantity > 0) {
        setQuantity(quantity - 1)
      }
    }

    const isDiscounted = item.price !== item.discountedPrice

    return (
      <div className="border-b pb-6 mb-6">
        <div className="flex justify-between">
          <div className="flex-1 pr-4">
            <h3 className="text-lg font-bold">{item?.name}</h3>
            <p className="text-gray-600 text-sm mt-1">{item.description}</p>
            <div className="flex items-center mt-2">
              <span className="text-gray-900 font-bold">₹{item.discountedPrice}</span>
              {isDiscounted && <span className="text-gray-500 line-through ml-2">₹{item.price}</span>}
              {isDiscounted && (
                <div className="ml-2 bg-green-600 text-white px-2 py-0.5 rounded-md text-xs font-medium">
                  {Math.round((1 - item.discountedPrice / item.price) * 100)}% Off
                </div>
              )}
            </div>
          </div>
          {quantity === 0 ? (
            <button
              className="h-10 px-4 border border-green-500 rounded-lg text-green-500 flex items-center hover:bg-green-50 transition-colors"
              onClick={addToCart}
            >
              <span className="text-xl mr-1">+</span> ADD
            </button>
          ) : (
            <div className="flex items-center h-10 border border-green-500 rounded-lg overflow-hidden">
              <button
                className="w-10 h-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
                onClick={removeFromCart}
              >
                -
              </button>
              <span className="w-10 h-full flex items-center justify-center font-medium">{quantity}</span>
              <button
                className="w-10 h-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
                onClick={addToCart}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Render restaurant menu
  const RestaurantMenu = ({ restaurant }) => {
    return (
      <div className="mt-4">
        <button className="flex items-center text-blue-600 mb-4" onClick={handleBackToOffers}>
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to offers
        </button>

        <RestaurantHeader restaurant={restaurant} />

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Menu</h3>
          {restaurant.menu.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto bg-white p-4">
      {/* Content: Either Offers List or Restaurant Menu */}
      {selectedRestaurant ? (
        <RestaurantMenu restaurant={selectedRestaurant} />
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-6">Special Offers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id}>
                {restaurant.offer.type === "percentage" ? (
                  <PercentageOfferCard restaurant={restaurant} />
                ) : (
                  <FixedPriceOfferCard restaurant={restaurant} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


