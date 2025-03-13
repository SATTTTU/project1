// cookData.js
export const cookData = [
  {
    id: 1,
    name: "Bluenose",
    status: "Verified",
    rating: 4.8,
    productsSold: 400,
    email: "bluenose@example.com",
    phone: "+1 234 567 890",
    address: "123 Ocean Street, New York, NY",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
    specialties: ["Seafood", "Grilled Dishes"],
    experience: "5 years",
    video: "https://assets.mixkit.co/videos/preview/mixkit-cooking-meat-on-a-pan-23480-large.mp4",
    earnings: {
      total: 25000,
      monthly: 3500
    },
    documents: {
      passportPhoto: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      citizenshipFront: "https://images.unsplash.com/photo-1580482802964-b1d432b9f1a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      citizenshipBack: "https://images.unsplash.com/photo-1580482802964-b1d432b9f1a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    availability: {
      monday: { available: true, hours: "9AM - 5PM" },
      tuesday: { available: true, hours: "9AM - 5PM" },
      wednesday: { available: true, hours: "9AM - 5PM" },
      thursday: { available: true, hours: "9AM - 5PM" },
      friday: { available: true, hours: "9AM - 5PM" },
      saturday: { available: false, hours: "" },
      sunday: { available: false, hours: "" }
    },
    cuisine: ["Italian", "Mediterranean"],
    certifications: ["Food Safety", "Culinary Arts Diploma"],
    averageRating: 4.8,
    totalReviews: 127,
    joinedDate: "2023-05-12"
  },
  {
    id: 2,
    name: "Pennywise",
    status: "Pending",
    rating: 4.2,
    productsSold: 200,
    email: "pennywise@example.com",
    phone: "+1 987 654 321",
    address: "456 Clown Alley, Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
    specialties: ["Pastries", "Desserts"],
    experience: "3 years",
    video: "https://assets.mixkit.co/videos/preview/mixkit-making-chocolate-cake-in-a-professional-kitchen-135-large.mp4",
    earnings: {
      total: 15000,
      monthly: 2500
    },
    documents: {
      passportPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      citizenshipFront: "https://images.unsplash.com/photo-1580482802964-b1d432b9f1a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      citizenshipBack: "https://images.unsplash.com/photo-1580482802964-b1d432b9f1a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    availability: {
      monday: { available: true, hours: "10AM - 6PM" },
      tuesday: { available: true, hours: "10AM - 6PM" },
      wednesday: { available: true, hours: "10AM - 6PM" },
      thursday: { available: true, hours: "10AM - 6PM" },
      friday: { available: true, hours: "10AM - 6PM" },
      saturday: { available: true, hours: "12PM - 8PM" },
      sunday: { available: false, hours: "" }
    },
    cuisine: ["French", "Bakery"],
    certifications: ["Pastry Arts Certificate"],
    averageRating: 4.2,
    totalReviews: 89,
    joinedDate: "2023-08-03"
  },
  {
    id: 3,
    name: "Flotsam",
    status: "Verified",
    rating: 4.9,
    productsSold: 1200,
    email: "flotsam@example.com",
    phone: "+1 555 666 777",
    address: "789 Fisherman's Wharf, San Francisco, CA",
    image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
    specialties: ["Sushi", "Japanese Cuisine"],
    experience: "10 years",
    video: "https://assets.mixkit.co/videos/preview/mixkit-making-sushi-rolls-with-fresh-ingredients-4785-large.mp4",
    earnings: {
      total: 75000,
      monthly: 6000
    },
    documents: {
      passportPhoto: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      citizenshipFront: "https://images.unsplash.com/photo-1580482802964-b1d432b9f1a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      citizenshipBack: "https://images.unsplash.com/photo-1580482802964-b1d432b9f1a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    availability: {
      monday: { available: false, hours: "" },
      tuesday: { available: true, hours: "11AM - 9PM" },
      wednesday: { available: true, hours: "11AM - 9PM" },
      thursday: { available: true, hours: "11AM - 9PM" },
      friday: { available: true, hours: "11AM - 10PM" },
      saturday: { available: true, hours: "11AM - 10PM" },
      sunday: { available: true, hours: "12PM - 8PM" }
    },
    cuisine: ["Japanese", "Fusion"],
    certifications: ["Sushi Master Certificate", "Advanced Culinary Techniques"],
    averageRating: 4.9,
    totalReviews: 356,
    joinedDate: "2022-01-15"
  },
  {
    id: 4,
    name: "Gregautsch",
    status: "Unverified",
    rating: 0,
    productsSold: 0,
    email: "gregautsch@example.com",
    phone: "+1 321 654 987",
    address: "101 Unknown Street, Unknown City",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
    specialties: ["Unknown"],
    experience: "Less than 1 year",
    video: "https://assets.mixkit.co/videos/preview/mixkit-stirring-a-pot-while-cooking-22810-large.mp4",
    earnings: {
      total: 0,
      monthly: 0
    },
    documents: {
      passportPhoto: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      citizenshipFront: "https://images.unsplash.com/photo-1580482802964-b1d432b9f1a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      citizenshipBack: "https://images.unsplash.com/photo-1580482802964-b1d432b9f1a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    availability: {
      monday: { available: true, hours: "9AM - 5PM" },
      tuesday: { available: true, hours: "9AM - 5PM" },
      wednesday: { available: true, hours: "9AM - 5PM" },
      thursday: { available: true, hours: "9AM - 5PM" },
      friday: { available: true, hours: "9AM - 5PM" },
      saturday: { available: false, hours: "" },
      sunday: { available: false, hours: "" }
    },
    cuisine: ["American", "Home Style"],
    certifications: [],
    averageRating: 0,
    totalReviews: 0,
    joinedDate: "2024-02-28"
  },
  {
    id: 5,
    name: "ElPistolero",
    status: "Pending",
    rating: 3.5,
    productsSold: 30,
    email: "elpistolero@example.com",
    phone: "+1 444 555 666",
    address: "222 Cowboy Road, Texas",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
    specialties: ["Mexican Cuisine", "BBQ"],
    experience: "6 years",
    video: "https://assets.mixkit.co/videos/preview/mixkit-mexican-cook-making-tacos-5348-large.mp4",
    earnings: {
      total: 8000,
      monthly: 1200
    },
    documents: {
      passportPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      citizenshipFront: "https://images.unsplash.com/photo-1580482802964-b1d432b9f1a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      citizenshipBack: "https://images.unsplash.com/photo-1580482802964-b1d432b9f1a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    availability: {
      monday: { available: true, hours: "11AM - 7PM" },
      tuesday: { available: true, hours: "11AM - 7PM" },
      wednesday: { available: true, hours: "11AM - 7PM" },
      thursday: { available: true, hours: "11AM - 7PM" },
      friday: { available: true, hours: "11AM - 9PM" },
      saturday: { available: true, hours: "12PM - 9PM" },
      sunday: { available: false, hours: "" }
    },
    cuisine: ["Mexican", "Tex-Mex", "BBQ"],
    certifications: ["Grill Master Certificate"],
    averageRating: 3.5,
    totalReviews: 22,
    joinedDate: "2023-11-05"
  }
];