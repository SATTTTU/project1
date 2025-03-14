import React from "react";
import { Link } from "react-router-dom";

export const CategorySection = ({ categories }) => {
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl text-center font-bold text-gray-800">Popular Categories</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6 rounded-2xl">
        {categories.map((category, index) => (
          <Link
            to={`/category/${category.id}`}
            key={index}
            className="flex flex-col items-center md:w-50 p-4 bg-white rounded-t-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <div className="md:w-50 md:h-50 w-40 h-40 mb-3 overflow-hidden  bg-gray-100 shadow-md">
              <img
                src={category.img || "/placeholder.svg"}
                alt={category.name}
                className="object-cover w-full h-full lg:rounded-t-xl"
              />
            </div>
            <span className="text-sm font-medium text-gray-700 sm:text-base">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

