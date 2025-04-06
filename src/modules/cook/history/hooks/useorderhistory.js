// hooks/useOrderHistory.js
import { useState, useMemo } from "react";
import { mockHistoryData } from "../component/mockdata";

export const useOrderHistory = () => {
  // State for search, filtering and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter data based on search query and time filter
  const filteredData = useMemo(() => {
    return mockHistoryData.filter((item) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
				searchQuery === "" ||
				item.id.toLowerCase().includes(searchLower) ||
				item.customerName.toLowerCase().includes(searchLower) ||
				item.items.some((food) =>
					food?.name.toLowerCase().includes(searchLower)
				);

      // Time filter
      let matchesTime = true;
      const now = new Date().getTime();

      if (timeFilter === "today") {
        // Today (last 24 hours)
        matchesTime = now - item.timestamp < 86400000;
      } else if (timeFilter === "week") {
        // This week (last 7 days)
        matchesTime = now - item.timestamp < 604800000;
      } else if (timeFilter === "month") {
        // This month (last 30 days)
        matchesTime = now - item.timestamp < 2592000000;
      }

      return matchesSearch && matchesTime;
    });
  }, [searchQuery, timeFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Calculate stats based on filtered data
  const stats = useMemo(() => {
    const totalOrders = filteredData.length;
    const totalEarnings = filteredData.reduce(
      (sum, item) => sum + item.total,
      0
    );
    const totalItems = filteredData.reduce(
      (sum, item) =>
        sum + item.items.reduce((itemSum, i) => itemSum + i.quantity, 0),
      0
    );

    return {
      totalOrders,
      totalEarnings,
      totalItems,
    };
  }, [filteredData]);

  // Handle pagination
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Reset to first page when filters change
  const setSearchQueryAndResetPage = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const setTimeFilterAndResetPage = (filter) => {
    setTimeFilter(filter);
    setCurrentPage(1);
  };

  return {
    filteredData,
    paginatedData,
    stats,
    searchQuery,
    setSearchQuery: setSearchQueryAndResetPage,
    timeFilter,
    setTimeFilter: setTimeFilterAndResetPage,
    currentPage,
    totalPages,
    startIndex,
    itemsPerPage,
    handlePrevPage,
    handleNextPage,
  };
};
