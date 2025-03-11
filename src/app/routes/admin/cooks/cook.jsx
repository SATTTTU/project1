import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/modules/admin/components/homepage/aside/aside";
import CookFilters from "@/modules/admin/cook/components/cookFilter";
import CookTable from "@/modules/admin/cook/components/cookTable";
import { cookData } from "@/modules/admin/cook/components/data";
import Pagination from "@/components/ui/pagination/pagination";

export const CooksRoute = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredCooks = cookData
    .filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))
    .filter(({ status }) => statusFilter === "all" ? true : status === statusFilter)
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
    <div className="flex h-screen">
      <Sidebar />
      <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-5xl">
        <h2 className="text-xl font-semibold mb-6">All Cooks</h2>
        <CookFilters
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          ratingFilter={ratingFilter}
          setRatingFilter={setRatingFilter}
        />
        <CookTable cooks={paginatedCooks} navigate={navigate} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};