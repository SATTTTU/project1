// Main file: HistoryPage.jsx
import CookNavBAr from "@/components/ui/cooknavbar/cooknavbar";
import { OrderStats } from "@/modules/cook/history/component/orderstatus";
import { OrderTable } from "@/modules/cook/history/component/ordertable";
import { Pagination } from "@/modules/cook/history/component/pagination";
import { SearchAndFilter } from "@/modules/cook/history/component/searchandfilter";
import { useOrderHistory } from "@/modules/cook/history/hooks/useorderhistory";
import React from "react";
// Note: Component name should start with uppercase
export const HistoryPage = () => {
  const {
    filteredData,
    paginatedData,
    stats,
    searchQuery,
    setSearchQuery,
    timeFilter,
    setTimeFilter,
    currentPage,
    totalPages,
    startIndex,
    itemsPerPage,
    handlePrevPage,
    handleNextPage,
  } = useOrderHistory();

  return (
    <div className="flex h-screen flex-col">
      <CookNavBAr />

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Order History</h1>
            <p className="text-sm text-gray-500">View all your past orders</p>
          </div>

          <OrderStats
            totalOrders={stats.totalOrders}
            totalItems={stats.totalItems}
            totalEarnings={stats.totalEarnings}
          />

          <SearchAndFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
          />

          <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
            <OrderTable paginatedData={paginatedData} />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              startIndex={startIndex}
              itemsPerPage={itemsPerPage}
              filteredDataLength={filteredData.length}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
            />
          </div>
        </main>
      </div>
    </div>
  );
};
