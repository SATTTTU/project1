import React from 'react'

const NutritionTab = ({ food }) => {
  return (
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
  )
}

export default NutritionTab