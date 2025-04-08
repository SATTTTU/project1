"use client"

import { useState, useEffect, useMemo } from "react"

export const useOrderHistory = (orders = []) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [timeFilter, setTimeFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, timeFilter])

  // Filter data based on search query and time filter
  const filteredData = useMemo(() => {
    return orders.filter((order) => {
      if (!order) return false

      // Search filter
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch =
        !searchQuery ||
        (order.order_id?.toString() || "").toLowerCase().includes(searchLower) ||
        (order.user?.name || "").toLowerCase().includes(searchLower) ||
        (Array.isArray(order.items) &&
          order.items.some((item) => (item?.name || "").toLowerCase().includes(searchLower)))

      // Time filter - assuming there's a created_at or similar field
      // If there's no date field, we'll just return true for time filter
      let matchesTime = true
      if (timeFilter !== "all" && order.created_at) {
        const orderDate = new Date(order.created_at)
        const today = new Date()

        if (timeFilter === "today") {
          matchesTime =
            orderDate.getDate() === today.getDate() &&
            orderDate.getMonth() === today.getMonth() &&
            orderDate.getFullYear() === today.getFullYear()
        } else if (timeFilter === "week") {
          const startOfWeek = new Date(today)
          startOfWeek.setDate(today.getDate() - today.getDay())
          startOfWeek.setHours(0, 0, 0, 0)
          matchesTime = orderDate >= startOfWeek
        } else if (timeFilter === "month") {
          matchesTime = orderDate.getMonth() === today.getMonth() && orderDate.getFullYear() === today.getFullYear()
        }
      }

      return matchesSearch && matchesTime
    })
  }, [orders, searchQuery, timeFilter])

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  // Calculate stats
  const stats = useMemo(() => {
    const totalOrders = filteredData.length

    const totalItems = filteredData.reduce((sum, order) => {
      if (!order || !Array.isArray(order.items)) return sum
      return sum + order.items.reduce((itemSum, item) => itemSum + (Number.parseInt(item?.quantity) || 0), 0)
    }, 0)

    // Calculate total earnings - assuming there's a total field
    // If there's no total field, we'll just sum up item prices
    const totalEarnings = filteredData
      .reduce((sum, order) => {
        if (!order) return sum

        // If order has a total field, use it
        if (order.total) {
          return sum + (Number.parseFloat(order.total) || 0)
        }

        // Otherwise calculate from items
        if (Array.isArray(order.items)) {
          const orderTotal = order.items.reduce((itemSum, item) => {
            const price = Number.parseFloat(item?.price || 0)
            const quantity = Number.parseInt(item?.quantity || 0)
            return itemSum + price * quantity
          }, 0)
          return sum + orderTotal
        }

        return sum
      }, 0)
      .toFixed(2)

    return { totalOrders, totalItems, totalEarnings }
  }, [filteredData])

  // Pagination handlers
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return {
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
  }
}

