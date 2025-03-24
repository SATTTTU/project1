import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api-client"

// API function to fetch search results based on query
export const search = async ({ query }) => {
  if (!query) return [] // Avoid calling API with an empty query

  try {
    const response = await api.get(`/api/search/${query}`) // Query is part of the URL
    return response.data
  } catch (error) {
    console.error("Error fetching search results:", error)
    throw new Error("Failed to fetch search results")
  }
}

// Define query options for fetching search results
export const searchQueryOptions = ({ query }) => ({
  queryKey: ["search", query], // Unique cache key based on query
  queryFn: () => search({ query }),
  enabled: Boolean(query), // Fetch only when query exists
})

// Hook to fetch search results
export const useSearch = ({ query, queryConfig = {} }) => {
  return useQuery({
    ...searchQueryOptions({ query }),
    ...queryConfig,
  })
}

