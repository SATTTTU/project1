import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

const fetchReports = async () => {
  try {
    const { data } = await api.get(`/api/admins/generate-report`);
    return { reports: data };
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    throw new Error("Unable to fetch reports. Please try again later.");
  }
};

export const UsefetchReports = () => {
  return useQuery({
    queryKey: ["all-reports"],
    queryFn: fetchReports,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false, // Prevent unnecessary refetching when switching tabs
  });
};
