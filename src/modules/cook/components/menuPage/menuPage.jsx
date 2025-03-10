import React from "react";

import { useState } from "react";
import {
  Menu,
  User,
  Home,
  ShoppingBag,
  DollarSign,
  Clock,
  Utensils,
  Bell,
  Plus,
  Edit,
  Trash,
} from "lucide-react";
import { Sidebar } from "../../../../components/ui/sideBar/sidebar";
import foodimage from "../../../../assets/butterchicken.png";
import CookNavBAr from "@/components/ui/cooknavbar/cooknavbar";
export const MenuPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Sample food items
  const foodItems = [
    {
      id: 1,
      name: "Butter Chicken",
      price: 250,
      description: "Tender chicken in a rich, creamy tomato sauce",
      image: foodimage,
      category: "tharu dish",
    },
    {
      id: 2,
      name: "Paneer Tikka",
      price: 180,
      description: "Grilled cottage cheese with spices and vegetables",
      image: foodimage,
      category: "rai dish",
    },
    {
      id: 3,
      name: "Veg Biryani",
      price: 200,
      description: "Fragrant rice with mixed vegetables and spices",
      image: foodimage,
      category: "thakali dish",
    },
    {
      id: 4,
      name: "Chicken Biryani",
      price: 220,
      description: "Aromatic rice with tender chicken pieces",
      image: foodimage,
      category: "newari dish",
    },
    {
      id: 5,
      name: "Dal Makhani",
      price: 150,
      description: "Creamy black lentils cooked overnight",
      image: foodimage,
      category: "tharu dish",
    },
    {
      id: 6,
      name: "Naan",
      price: 40,
      description: "Soft leavened flatbread baked in tandoor",
      image: foodimage,
      category: "thakali dish",
    },
    {
      id: 7,
      name: "Gulab Jamun",
      price: 80,
      description: "Soft milk solids balls soaked in sugar syrup",
      image: foodimage,
      category: "thakali dish",
    },
  ];

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <CookNavBAr />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Menu</h1>
              <p className="text-sm text-gray-500">Manage your food items</p>
            </div>
            <button className="mt-4 md:mt-0 flex items-center rounded-md bg-[#426B1F] px-4 py-2 text-white hover:bg-[#365818]">
              <Plus className="mr-2 h-4 w-4" />
              Add New Category
            </button>
          </div>

          {/* Food Items Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {foodItems.map((item) => (
              <div
                key={item.id}
                className="rounded-lg  bg-white shadow-md overflow-hidden hover:scale-105 transition-all "
              >
                <div className="relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="h-48 w-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button className="rounded-full bg-white p-1.5 text-gray-700 hover:bg-gray-100 shadow-sm">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="rounded-full bg-white p-1.5 text-gray-700 hover:bg-gray-100 shadow-sm">
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <span className="inline-block text-xs font-medium text-[#426B1F] bg-[#426B1F]/10 rounded-full px-2 py-1 mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold">₹{item.price}</span>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                      Available
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add New Item Card */}
            <div className="rounded-lg  border-gray-300 bg-white shadow-sm overflow-hidden flex items-center justify-center h-[340px] cursor-pointer hover:border-[#426B1F] hover:border-solid">
              <div className="text-center p-6">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#426B1F]/10 mb-4">
                  <Plus className="h-6 w-6 text-[#426B1F]" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Add New Item
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Click to add a new food item to your menu
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
