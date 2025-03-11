// components/Pagination.jsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({
  currentPage,
  totalPages,
  startIndex,
  itemsPerPage,
  filteredDataLength,
  handlePrevPage,
  handleNextPage,
}) => {
  return (
    <div className="flex items-center justify-between border-t px-4 py-3">
      <div className="text-sm text-gray-500">
        {filteredDataLength > 0 ? (
          <>
            Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(startIndex + itemsPerPage, filteredDataLength)}
            </span>{" "}
            of <span className="font-medium">{filteredDataLength}</span> results
          </>
        ) : (
          "No results"
        )}
      </div>
      <div className="flex gap-1">
        <button
          className={`inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 ${
            currentPage > 1
              ? "hover:bg-gray-50"
              : "opacity-50 cursor-not-allowed"
          }`}
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </button>
        <button
          className={`inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 ${
            currentPage < totalPages
              ? "hover:bg-gray-50"
              : "opacity-50 cursor-not-allowed"
          }`}
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
