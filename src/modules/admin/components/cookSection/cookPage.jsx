import { useState } from "react";
import { Sidebar } from "../homepage/aside/aside";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../../../../components/ui/pagination/pagination";
import { Table } from "../../../../components/ui/tables/tables";

const Input = ({ placeholder, value, onChange }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="border p-2 rounded-md w-full"
  />
);

const Select = ({ options, value, onChange }) => (
  <select
    value={value}
    onChange={onChange}
    className="border p-2 rounded-md w-full"
  >
    {options.map(({ label, value }) => (
      <option key={value} value={value}>
        {label}
      </option>
    ))}
  </select>
);

const cooksData = [
  {
    id: 1,
    name: "Bluenose",
    status: "Verified",
    rating: 40,
    productsSold: 400,
  },
  {
    id: 2,
    name: "Pennywise",
    status: "Pending",
    rating: 57,
    productsSold: 200,
  },
  {
    id: 3,
    name: "Flotsam",
    status: "Verified",
    rating: 89,
    productsSold: 40000,
  },
  {
    id: 4,
    name: "Gregautsch",
    status: "Unverified",
    rating: null,
    productsSold: 0,
  },
  {
    id: 5,
    name: "ElPistolero",
    status: "Pending",
    rating: 50,
    productsSold: 30,
  },
  {
    id: 6,
    name: "ElPistolero",
    status: "Verified",
    rating: 50,
    productsSold: 30,
  },
  {
    id: 7,
    name: "ElPistolero",
    status: "Verified",
    rating: 50,
    productsSold: 30,
  },
];

// Helper function to render star ratings
const renderStarRating = (rating) => {
  if (rating === null) return "No ratings";

  const totalStars = 5;
  const filledStars = Math.round(rating / 20); // Convert percentage to stars (e.g., 40% = 2 stars)
  const emptyStars = totalStars - filledStars;

  return (
    <div className="flex justify-center">
      {[...Array(filledStars)].map((_, index) => (
        <span key={`filled-${index}`} className="text-yellow-500">★</span>
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={`empty-${index}`} className="text-gray-300">☆</span>
      ))}
    </div>
  );
};

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
    low: (cook) => cook.rating !== null && cook.rating < 40, // Less than 2 stars (<40%)
    medium: (cook) => cook.rating >= 40 && cook.rating < 80, // 2 to 4 stars (40% to <80%)
    high: (cook) => cook.rating >= 80, // 4+ stars (80%+)
  };

  const filteredCooks = cooksData
    .filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))
    .filter(({ status }) =>
      statusFilter === "all" ? true : status === statusFilter
    )
    .filter((cook) =>
      ratingFilter === "all" ? true : ratingRanges[ratingFilter]?.(cook)
    )
    .sort((a, b) => {
      const comparison =
        sortBy === "name"
          ? a.name.localeCompare(b.name)
          : (a[sortBy] || 0) - (b[sortBy] || 0);
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const totalPages = Math.ceil(filteredCooks.length / itemsPerPage);
  const paginatedCooks = filteredCooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Define columns for the Table with explicit widths for alignment
  const columns = [
    { header: "Name", width: "25%", align: "left" },
    { header: "Status", width: "20%", align: "center" },
    { header: "Rating", width: "20%", align: "center" },
    { header: "Products Sold", width: "20%", align: "center" },
    { header: "Actions", width: "15%", align: "center" },
  ];

  // Define the renderRow function with aligned cells and star ratings
  const renderRow = ({ id, name, status, rating, productsSold }) => (
    <tr key={id} className="border-b hover:bg-gray-100">
      <td className="p-3 text-left align-middle" style={{ width: "25%" }}>
        {name}
      </td>
      <td className="p-3 text-center align-middle" style={{ width: "20%" }}>
        <span
          className={`inline-block px-2 py-1 rounded-full text-xs whitespace-nowrap ${
            status === "Verified"
              ? "bg-green-100 text-green-800"
              : status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
      </td>
      <td className="p-3 text-center align-middle" style={{ width: "20%" }}>
        {renderStarRating(rating)}
      </td>
      <td className="p-3 text-center align-middle" style={{ width: "20%" }}>
        {productsSold}
      </td>
      <td className="p-3 text-center align-middle" style={{ width: "15%" }}>
        <button
          onClick={() => navigate(`/admin/cook-profile/${id}`)}
          className="text-blue-500 hover:underline"
        >
          Profile
        </button>
      </td>
    </tr>
  );

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-5xl">
        <h2 className="text-xl font-semibold mb-6">All Cooks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input
            placeholder="Search cooks"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            options={[
              { label: "All Status", value: "all" },
              { label: "Verified", value: "Verified" },
              { label: "Pending", value: "Pending" },
              { label: "Unverified", value: "Unverified" },
            ]}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
          <Select
            options={[
              { label: "All Ratings", value: "all" },
              { label: "No Rating", value: "no-rating" },
              { label: "Less than 2 stars", value: "low" },
              { label: "2 to 4 stars", value: "medium" },
              { label: "4+ stars", value: "high" },
            ]}
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed border-collapse">
            <thead>
              <tr className="bg-gray-200">
                {columns.map((col) => (
                  <th
                    key={col.header}
                    className={`p-3 font-semibold text-gray-700 ${
                      col.align === "center" ? "text-center" : "text-left"
                    } align-middle`}
                    style={{ width: col.width }}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{paginatedCooks.map((cook) => renderRow(cook))}</tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export { cooksData };