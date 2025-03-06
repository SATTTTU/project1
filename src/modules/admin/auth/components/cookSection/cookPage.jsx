import { useState } from "react";
import { Sidebar } from "../homepage/aside/aside";
import { useNavigate } from "react-router-dom";

const Input = ({ placeholder, value, onChange }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="border p-2 rounded-md w-full"
  />
);

const Button = ({ children, onClick, active }) => (
  <button
    className={`px-4 py-2 rounded-md transition duration-300 ${
      active ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const Select = ({ options, value, onChange }) => (
  <select value={value} onChange={onChange} className="border p-2 rounded-md w-full">
    {options.map(({ label, value }) => (
      <option key={value} value={value}>
        {label}
      </option>
    ))}
  </select>
);

const cooksData = [
  { id: 1, name: "Bluenose", status: "Verified", rating: 40, productsSold: 400 },
  { id: 2, name: "Pennywise", status: "Pending", rating: 57, productsSold: 200 },
  { id: 3, name: "Flotsam", status: "Verified", rating: 89, productsSold: 40000 },
  { id: 4, name: "Gregautsch", status: "Unverified", rating: null, productsSold: 0 },
  { id: 5, name: "ElPistolero", status: "Pending", rating: 50, productsSold: 30 },
  { id: 6, name: "ElPistolero", status: "Verified", rating: 50, productsSold: 30 },

  { id: 7, name: "ElPistolero", status: "Verified", rating: 50, productsSold: 30 },

];

export const AdminCooksTable = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const ratingRanges = {
    "no-rating": (cook) => cook.rating === null,
    low: (cook) => cook.rating < 50,
    medium: (cook) => cook.rating >= 50 && cook.rating < 75,
    high: (cook) => cook.rating >= 75,
  };

  const filteredCooks = cooksData
    .filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))
    .filter(({ status }) => (statusFilter === "all" ? true : status === statusFilter))
    .filter((cook) => (ratingFilter === "all" ? true : ratingRanges[ratingFilter]?.(cook)))
    .sort((a, b) => {
      const comparison = sortBy === "name" ? a.name.localeCompare(b.name) : (a[sortBy] || 0) - (b[sortBy] || 0);
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const totalPages = Math.ceil(filteredCooks.length / itemsPerPage);
  const paginatedCooks = filteredCooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col md:flex-row justify-around p-4">
      <Sidebar />
      <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-5xl">
        <h2 className="text-xl font-semibold mb-6">All Cooks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input placeholder="Search cooks" value={search} onChange={(e) => setSearch(e.target.value)} />
          <Select
            options={[{ label: "All Status", value: "all" }, { label: "Verified", value: "Verified" }, { label: "Pending", value: "Pending" }, { label: "Unverified", value: "Unverified" }]}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
          <Select
            options={[{ label: "All Ratings", value: "all" }, { label: "No Rating", value: "no-rating" }, { label: "Low (<50%)", value: "low" }, { label: "Medium (50-75%)", value: "medium" }, { label: "High (75%+)", value: "high" }]}
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
          />
        </div>
        <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">Name</th>
              <th className="p-3">Status</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Products Sold</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCooks.map(({ id, name, status, rating, productsSold }) => (
              <tr key={id} className="border-b hover:bg-gray-100">
                <td className="p-3">{name}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${status === "Verified" ? "bg-green-100 text-green-800" : status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>{status}</span>
                </td>
                <td className="p-3">{rating ? `${rating}%` : "No ratings"}</td>
                <td className="p-3">{productsSold}</td>
                <td className="p-3">
                  <button onClick={() => navigate(`/admin/cook-profile/${id}`)} className="text-blue-500 hover:underline">Profile</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-6 space-x-2">
          <Button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} active={false}>Previous</Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button key={i + 1} active={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>{i + 1}</Button>
          ))}
          <Button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} active={false}>Next</Button>
        </div>
      </div>
    </div>
  );
};


export { cooksData };
