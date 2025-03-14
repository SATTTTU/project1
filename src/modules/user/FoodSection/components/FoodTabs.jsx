import React from 'react'
import DescriptionTab from './DescriptionTab'
import IngredientsTab from './IngredientsTab'
import NutritionTab from './NutritionTab'
import ReviewsTab from './ReviewsTab'

const FoodTabs = ({ food, activeTab, setActiveTab }) => {
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
        {activeTab === "description" && <DescriptionTab food={food} />}
        {activeTab === "ingredients" && <IngredientsTab food={food} />}
        {activeTab === "nutrition" && <NutritionTab food={food} />}
        {activeTab === "reviews" && <ReviewsTab food={food} />}
      </div>
    </div>
  )
}

export default FoodTabs