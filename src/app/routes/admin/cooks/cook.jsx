import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Pagination from "@/components/ui/pagination/pagination";
import { FaArrowLeft } from "react-icons/fa";
import { Sidebar } from "@/components/ui/admin/aside/aside";
import CookFilters from "@/modules/admin/cook/components/cookFilter";
import CookTable from "@/modules/admin/cook/components/cookTable";
import { useGetAllCooks } from "@/modules/admin/cook/api/getallcooks";

export const CooksRoute = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCooks, setFilteredCooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  // Using the query hook to fetch all cooks
  const {
    mutateAsync: fetchCooks,
    isLoading,
    isError,
    error,
    data: apiResponse
  } = useGetAllCooks({
    mutationConfig: {
      onSuccess: (response) => {
        console.log("API Response:", response);
      },
    },
  });

  // Extract all cooks from the API response
  const allCooks = apiResponse?.data || [];

  // Fetch cooks on initial load
  useEffect(() => {
    fetchCooks();
  }, [fetchCooks]);

  // Apply filters whenever filter criteria or cooks data changes
  useEffect(() => {
    if (!allCooks.length) return;

    let result = [...allCooks];

    // Apply name search filter
    if (search) {
      result = result.filter(cook => 
        cook.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(cook => {
        const status = cook.available_status || cook.approval_status;
        
        if (statusFilter === "verified") {
          return status === "verified" || status === "online";
        } else if (statusFilter === "under-review") {
          return status === "under-review" || status === "offline";
        } else if (statusFilter === "rejected") {
          return status === "rejected";
        }
        return true;
      });
    }

    // Apply rating filter
    if (ratingFilter !== "all") {
      result = result.filter(cook => {
        const rating = cook.average_rating || 0;
        
        if (ratingFilter === "no-rating") {
          return rating === 0 || rating === null || rating === undefined;
        } else if (ratingFilter === "low") {
          return rating > 0 && rating < 2;
        } else if (ratingFilter === "medium") {
          return rating >= 2 && rating < 4;
        } else if (ratingFilter === "high") {
          return rating >= 4;
        }
        return true;
      });
    }

    // Update filtered cooks and pagination
    setFilteredCooks(result);
    setTotalPages(Math.ceil(result.length / itemsPerPage));
    
    // Reset to first page when filters change
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [allCooks, search, statusFilter, ratingFilter]);

  // Get current page items
  const currentCooks = filteredCooks.slice(
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
          {isError && (
            <div className="text-red-500 mb-4">
              Error: {error?.message || "Failed to fetch cooks"}
            </div>
          )}
          <CookTable
            cooks={currentCooks}
            navigate={navigate}
            isLoading={isLoading}
          />
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