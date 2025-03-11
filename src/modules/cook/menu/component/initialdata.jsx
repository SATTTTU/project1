// data/initialData.js
import foodimage from "../../../../assets/butterchicken.png";

export const initialCategories = [
  {
    id: 1,
    name: "Momo",
    isExpanded: true,
    items: [
      {
        id: 101,
        name: "Chicken Momo",
        price: 150,
        description: "Steamed dumplings filled with spiced chicken",
        image: foodimage,
        available: true,
      },
      {
        id: 102,
        name: "Paneer Momo",
        price: 140,
        description: "Steamed dumplings with cottage cheese filling",
        image: foodimage,
        available: true,
      },
    ],
  },
  {
    id: 2,
    name: "Chowmein",
    isExpanded: false,
    items: [
      {
        id: 201,
        name: "Veg Chowmein",
        price: 120,
        description: "Stir-fried noodles with mixed vegetables",
        image: foodimage,
        available: true,
      },
    ],
  },
];
