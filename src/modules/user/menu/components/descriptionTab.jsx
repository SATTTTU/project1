import React from 'react'
import { FiClock } from "react-icons/fi"
import { BiRestaurant } from "react-icons/bi"
import { GiChiliPepper } from "react-icons/gi"

const DescriptionTab = ({ food }) => {
  return (
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
  )
}

export default DescriptionTab