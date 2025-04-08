import { usegetAllHistory } from "@/modules/cook/history/api/listcookinghistory"
import { useOrderHistory } from "@/modules/cook/history/hooks/useorderhistory"
import { OrderStats } from "@/modules/cook/history/component/orderstatus"
import { OrderTable } from "@/modules/cook/history/component/ordertable"
import { SearchAndFilter } from "@/modules/cook/history/component/searchandfilter"
import { Pagination } from "@/modules/cook/history/component/pagination"

 export const OrderHistoryPage = () => {
  const { data, isLoading, isError } = usegetAllHistory()
  console.log("API response:", data)

  // Extract orders array from the response
  const orders = data?.data || []
  console.log("Orders array:", orders)

  const {
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
  } = useOrderHistory(orders)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#426B1F] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order history...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        <p className="font-medium">Error loading order history</p>
        <p className="text-sm mt-1">Please try refreshing the page or contact support if the problem persists.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <SearchAndFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
      />
      <OrderStats {...stats} />
      <OrderTable paginatedData={paginatedData} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        itemsPerPage={itemsPerPage}
        filteredDataLength={orders.length}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
    </div>
  )
}


