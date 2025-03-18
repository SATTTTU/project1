import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../../../../store/cart/cart';
import { allFoodItems } from "@/modules/user/CategoriesSection/components/data";
import { Navbar } from "@/modules/user/CategoriesSection/components/navbar";

export const FoodDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    // Find the food item with the matching id
    const foodItem = allFoodItems.find((item) => item.id === Number.parseInt(id));
    if (foodItem) {
      setItem(foodItem);
    }
    setLoading(false);
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (addedToCart) {
      const timer = setTimeout(() => {
        setAddedToCart(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [addedToCart]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (item) {
      dispatch(
        addToCart({
          productId: item.id,
          quantity: quantity,
          name: item.name,
          price: item.price,
          img: item.img,
        })
      );

      setAddedToCart(true);
      
      toast.success(`${quantity} ${quantity === 1 ? 'item' : 'items'} added to cart!`, {
        position: 'bottom-right',
        autoClose: 2000,
      });
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Item Not Found</h1>
          <p className="text-gray-600 mb-8">The food item you're looking for doesn't exist.</p>
          <button
            onClick={handleGoBack}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <button
          onClick={handleGoBack}
          className="flex items-center text-blue-600 mb-6 hover:text-blue-800 transition-colors"
        >
       
          Back to Category
        </button>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden md:flex">
          {/* Image section */}
          <div className="md:w-1/2">
            <div className="relative h-64 md:h-full">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow">
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15.585l-5.657 2.974 1.079-6.294L.857 7.721l6.31-.917L10 1.146l2.833 5.658 6.31.917-4.565 4.544 1.079 6.294L10 15.585z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-semibold ml-1">{item.rating}</span>
                </span>
              </div>
            </div>
          </div>
          
          {/* Details section */}
          <div className="p-6 md:w-1/2">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
              <p className="text-gray-600 mb-4">{item.category}</p>
              <p className="text-gray-700 mb-6">{item.description}</p>
              
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold">${item.price}</span>
                {item.originalPrice && (
                  <span className="text-lg text-gray-500 line-through ml-2">
                    ${item.originalPrice}
                  </span>
                )}
              </div>
              
              {/* Nutrition info */}
              {item.nutritionInfo && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Nutrition Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(item.nutritionInfo).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Ingredients */}
              {item.ingredients && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                  <p className="text-gray-700">{item.ingredients.join(', ')}</p>
                </div>
              )}
              
              {/* Preparation time */}
              {item.prepTime && (
                <div className="flex items-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Preparation time: {item.prepTime}</span>
                </div>
              )}
            </div>
            
            {/* Add to cart section */}
            <div className="flex items-center">
              <div className="flex items-center border border-gray-300 rounded mr-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-1 text-lg hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1 text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-1 text-lg hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 rounded-full text-white font-medium ${
                  addedToCart ? 'bg-[#426B1F]' : 'bg-blue-600 hover:bg-blue-700'
                } transition-colors`}
              >
                {addedToCart ? 'Added to Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Related Items section - can be expanded */}
        {item.relatedItems && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">You might also like</h2>
            {/* Add related items grid here */}
          </div>
        )}
      </main>
    </div>
  );
};