import React from 'react'
import { FiInfo } from "react-icons/fi"

const IngredientsTab = ({ food }) => {
  return (
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
  )
}

export default IngredientsTab