import React from "react";
import Input from "@/components/ui/input/input";
import Select from "@/components/ui/Select/select";

const CookFilters = ({ search, setSearch, statusFilter, setStatusFilter, ratingFilter, setRatingFilter }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Input
        placeholder="Search cooks"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Select
        options={[
          { label: "All Status", value: "all" },
          { label: "Approved", value: "approved" },
          { label: "Under Review", value: "under-review" },
          { label: "Rejected", value: "rejected" }
        ]}
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      />
      <Select
        options={[
          { label: "All Ratings", value: "all" },
          { label: "No Rating", value: "no-rating" },
          { label: "Less than 3 stars", value: "low" },
          { label: "3 to 4 stars", value: "medium" },
          { label: "4+ stars", value: "high" },
        ]}
        value={ratingFilter}
        onChange={(e) => setRatingFilter(e.target.value)}
      />
    </div>
  );
};

export default CookFilters;