"use client"
import { Search } from "lucide-react"

export const SearchAndFilter = ({ searchQuery, setSearchQuery, timeFilter, setTimeFilter }) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search orders..."
          className="w-full rounded-md border border-gray-300 pl-10 py-2 focus:border-[#426B1F] focus:outline-none focus:ring-1 focus:ring-[#426B1F]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <select
        className="rounded-md border border-gray-300 py-2 px-3 focus:border-[#426B1F] focus:outline-none focus:ring-1 focus:ring-[#426B1F]"
        value={timeFilter}
        onChange={(e) => setTimeFilter(e.target.value)}
      >
        <option value="all">All Time</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
      </select>
    </div>
  )
}

