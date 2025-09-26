"use client";
import { useState, useEffect, useMemo } from "react";
import ListingsGrid from "./ListingsGrid";
import Pagination from "./Pagination";
import { getAllListings } from "@/lib/api/listings";
export default function PaginatedListings({
  searchQuery = "",
  sortBy = "new",
}) {
  const [allListings, setAllListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 6;
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const listings = await getAllListings();
        setAllListings(listings);
        setError(null);
      } catch (err) {
        setError("Failed to fetch listings");
        console.error("Error fetching listings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);
  const filteredAndSortedListings = useMemo(() => {
    let filtered = allListings;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = allListings.filter(
        (listing) =>
          listing.title.toLowerCase().includes(query) ||
          listing.description.toLowerCase().includes(query)
      );
    }
    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      if (sortBy === "new") {
        return dateB - dateA;
      } else if (sortBy === "old") {
        return dateA - dateB;
      }
      return 0;
    });
    return sorted;
  }, [allListings, searchQuery, sortBy]);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedListings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentListings = filteredAndSortedListings.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">Loading listings...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }
  if (filteredAndSortedListings.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600 text-2xl font-medium w-[60%] text-center">
          {searchQuery.trim()
            ? "No listings found matching your search. Try different keywords or check your spelling."
            : "No listings found."}
        </div>
      </div>
    );
  }
  return (
    <>
      <ListingsGrid listings={currentListings} />
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}
