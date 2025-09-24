"use client";
import { useState } from "react";
import SearchForm from "@/components/forms/SearchForm";
import PaginatedListings from "@/components/listings/PaginatedListings";
export default function ListingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("new");
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  const handleSort = (sortType) => {
    setSortBy(sortType);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <main className="flex-1 min-w-0">
            <div className="mb-6 space-y-4">
              <SearchForm
                onSearch={handleSearch}
                onSort={handleSort}
                searchQuery={searchQuery}
                selectedSort={sortBy}
              />
            </div>
            <PaginatedListings searchQuery={searchQuery} sortBy={sortBy} />
          </main>
        </div>
      </div>
    </div>
  );
}
