// data/mockHistoryData.js
export const mockHistoryData = [
  {
    id: "ORD-7829",
    customerName: "Rahul Sharma",
    items: [
      { name: "Butter Chicken", quantity: 1 },
      { name: "Naan", quantity: 2 },
    ],
    status: "Delivered",
    date: "Today, 2:30 PM",
    total: 350,
    timestamp: new Date().getTime(),
  },
  {
    id: "ORD-7823",
    customerName: "Priya Patel",
    items: [
      { name: "Paneer Tikka", quantity: 1 },
      { name: "Jeera Rice", quantity: 1 },
    ],
    status: "Delivered",
    date: "Today, 1:15 PM",
    total: 280,
    timestamp: new Date().getTime() - 3600000, // 1 hour ago
  },
  {
    id: "ORD-7814",
    customerName: "Amit Kumar",
    items: [
      { name: "Veg Biryani", quantity: 1 },
      { name: "Raita", quantity: 1 },
    ],
    status: "Delivered",
    date: "Today, 12:45 PM",
    total: 220,
    timestamp: new Date().getTime() - 7200000, // 2 hours ago
  },
  {
    id: "ORD-7809",
    customerName: "Sneha Gupta",
    items: [
      { name: "Chicken Biryani", quantity: 2 },
      { name: "Raita", quantity: 2 },
    ],
    status: "Delivered",
    date: "Yesterday, 7:30 PM",
    total: 480,
    timestamp: new Date().getTime() - 86400000, // 1 day ago
  },
  {
    id: "ORD-7798",
    customerName: "Vikram Singh",
    items: [
      { name: "Dal Makhani", quantity: 1 },
      { name: "Butter Naan", quantity: 3 },
    ],
    status: "Delivered",
    date: "Yesterday, 6:15 PM",
    total: 270,
    timestamp: new Date().getTime() - 90000000, // ~1 day ago
  },
  {
    id: "ORD-7785",
    customerName: "Neha Kapoor",
    items: [
      { name: "Paneer Butter Masala", quantity: 1 },
      { name: "Garlic Naan", quantity: 2 },
    ],
    status: "Delivered",
    date: "2 days ago, 8:20 PM",
    total: 310,
    timestamp: new Date().getTime() - 172800000, // 2 days ago
  },
  {
    id: "ORD-7772",
    customerName: "Rajesh Khanna",
    items: [
      { name: "Chicken Tikka", quantity: 2 },
      { name: "Rumali Roti", quantity: 4 },
    ],
    status: "Delivered",
    date: "2 days ago, 7:45 PM",
    total: 420,
    timestamp: new Date().getTime() - 176400000, // ~2 days ago
  },
  {
    id: "ORD-7761",
    customerName: "Ananya Desai",
    items: [
      { name: "Veg Pulao", quantity: 1 },
      { name: "Raita", quantity: 1 },
      { name: "Gulab Jamun", quantity: 2 },
    ],
    status: "Delivered",
    date: "3 days ago, 1:30 PM",
    total: 340,
    timestamp: new Date().getTime() - 259200000, // 3 days ago
  },
];
