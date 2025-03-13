import React from "react";
import { FiInfo, FiClock, FiStar } from "react-icons/fi";
import { BiRestaurant } from "react-icons/bi";
import { GiChiliPepper } from "react-icons/gi";

export const TabsSection = ({ food, activeTab, setActiveTab }) => {
  return (
    <div className="border-t">
      <div className="flex overflow-x-auto">
        <button
          onClick={() => setActiveTab("description")}
          className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
            activeTab === "description"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-600 hover:text-green-600"
          }`}
        >
          Description
        </button>

        <button
          onClick={() => setActiveTab("ingredients")}
          className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
            activeTab === "ingredients"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-600 hover:text-green-600"
          }`}
        >
          Ingredients
        </button>

        <button
          onClick={() => setActiveTab("nutrition")}
          className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
            activeTab === "nutrition"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-600 hover:text-green-600"
          }`}
        >
          Nutritional Info
        </button>

        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
            activeTab === "reviews"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-600 hover:text-green-600"
          }`}
        >
          Reviews ({food.reviews ? food.reviews.length : 0})
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* Description Tab */}
        {activeTab === "description" && (
          <div>
            <p className="text-gray-700">{food.description}</p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <FiClock className="text-green-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Preparation Time</p>
                  <p className="font-medium">{food.preparationTime}</p>
                </div>
              </div>

              <div className="flex items-center">
                <BiRestaurant className="text-green-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium">{food.category}</p>
                </div>
              </div>

              <div className="flex items-center">
                <GiChiliPepper className="text-green-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Spicy Level</p>
                  <p className="font-medium">{food.spicyLevel || "None"}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ingredients Tab */}
        {activeTab === "ingredients" && (
          <div>
            <h3 className="text-lg font-medium mb-4">Ingredients</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {food.ingredients &&
                food.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    {ingredient}
                  </li>
                ))}
            </ul>

            {food.allergens && food.allergens.length > 0 && (
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-medium flex items-center text-yellow-800">
                  <FiInfo className="mr-2" />
                  Allergen Information
                </h4>
                <p className="mt-2 text-yellow-800">Contains: {food.allergens.join(", ")}</p>
              </div>
            )}
          </div>
        )}

        {/* Nutrition Tab */}
        {activeTab === "nutrition" && (
          <div>
            <h3 className="text-lg font-medium mb-4">Nutritional Information</h3>

            {food.nutritionalInfo ? (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Calories</p>
                  <p className="text-xl font-bold">{food.nutritionalInfo.calories}</p>
                  <p className="text-xs text-gray-500">kcal</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Protein</p>
                  <p className="text-xl font-bold">{food.nutritionalInfo.protein}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Carbs</p>
                  <p className="text-xl font-bold">{food.nutritionalInfo.carbs}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Fat</p>
                  <p className="text-xl font-bold">{food.nutritionalInfo.fat}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Sodium</p>
                  <p className="text-xl font-bold">{food.nutritionalInfo.sodium}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">Nutritional information not available for this item.</p>
            )}

            <p className="mt-6 text-sm text-gray-500">
              * Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower
              depending on your calorie needs.
            </p>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Customer Reviews</h3>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Write a Review
              </button>
            </div>

            {food.reviews && food.reviews.length > 0 ? (
              <div className="space-y-6">
                {food.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{review.user}</h4>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={`${i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"} mr-1`}
                            />
                          ))}
                          <span className="text-gray-500 text-sm ml-2">{review.date}</span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No reviews yet. Be the first to review this item!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};