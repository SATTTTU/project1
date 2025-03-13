import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CookFilters from "@/modules/admin/cook/components/cookFilter"; // Assuming you have this component
import CookTable from "@/modules/admin/cook/components/cookTable"; // Assuming you have this component
import { cookData } from "@/modules/admin/cook/components/data"; // Assuming you have this data
import Pagination from "@/components/ui/pagination/pagination";
import { FaArrowLeft } from "react-icons/fa";
import { Sidebar } from "@/components/ui/admin/aside/aside";

export const CooksRoute = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter cooks based on search, status, and rating
  const filteredCooks = cookData
    .filter(({ name }) =>
      name.toLowerCase().includes(search.toLowerCase())
    )
    .filter(({ status }) =>
      statusFilter === "all" ? true : status === statusFilter
    )
    .filter(({ rating }) =>
      ratingFilter === "all" ? true :
      ratingFilter === "no-rating" ? rating === null :
      ratingFilter === "low" ? rating < 40 :
      ratingFilter === "medium" ? rating >= 40 && rating < 80 :
      rating >= 80
    );

  const totalPages = Math.ceil(filteredCooks.length / itemsPerPage);
  const paginatedCooks = filteredCooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="flex h-screen font-sans bg-gray-100">
      <Sidebar />
      <div className="p-6 w-full">
        <Link
          to="/admin/dashboard"
          className="mr-2 p-1 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer"
        >
          <FaArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold mb-6 text-gray-900">All Cooks</h1>
       
        <div className="bg-white p-6 shadow-md rounded-lg">
          <CookFilters
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            ratingFilter={ratingFilter}
            setRatingFilter={setRatingFilter}
          />
          <CookTable cooks={paginatedCooks} navigate={navigate} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </section>
  );
};
