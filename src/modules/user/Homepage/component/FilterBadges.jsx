import React from "react";
// import { Badge } from "../../../../components/ui/badge/Badge";
import Category1 from "../../../../assets/UserImages/Category/Cato1.jpg";
import Grand from "../../../../assets/UserImages/Ai.jpeg";
import Lunch from "../../../../assets/UserImages/Lunch.jpeg";

// export const FilterBadges = () => {
//   return (
//     // <div className="flex flex-wrap gap-2 mb-6">
//     //   <Badge variant="outline" className="px-3 py-1 rounded-full">
//     //     Vegan
//     //   </Badge>
//     //   <Badge variant="outline" className="px-3 py-1 rounded-full">
//     //     Sushi
//     //   </Badge>
//     //   <Badge variant="outline" className="px-3 py-1 rounded-full text-green-500 border-green-500">
//     //     Pizza & Fast food
//     //   </Badge>
//     //   <Badge variant="outline" className="px-3 py-1 rounded-full">
//     //     Others
//     //   </Badge>
//     // </div>
//   );
// };

export const PromotedRestaurants = () => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <RestaurantCard 
        image={Category1}
        discount="-40%"
        category="BURGERS"
        name="Chef Burgers"
        location="London"
      />

      <RestaurantCard 
        image={Grand}
        discount="-30%"
        category="CAFÉ"
        name="Grand Al Café"
        location="London"
      />

      <RestaurantCard 
        image={Lunch}
        discount="-17%"
        category="CAFÉ"
        name="Buttered Café"
        location="London"
      />
    </div>
  );
};

const RestaurantCard = ({ image, discount, category, name, location }) => {
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-md">
      <div className="relative">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          width={400}
          height={400}
          className="object-cover w-full h-60"
        />
        <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
          {discount}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
          <span className="text-xs font-medium text-white">{category}</span>
          <h3 className="text-lg font-bold text-white">{name}</h3>
          <p className="text-sm text-white">{location}</p>
        </div>
      </div>
    </div>
  );
};