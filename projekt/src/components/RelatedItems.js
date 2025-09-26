"use client";
import { useState, useEffect } from "react";
import { getAllListings } from "@/lib/api/listings";
import ListingCard from "@/components/listings/ListingCard";
export default function RelatedItems({ currentListing }) {
  const [relatedItems, setRelatedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRelatedItems = async () => {
      try {
        const allListings = await getAllListings();
        const related = allListings.filter(
          (item) => item.id !== currentListing.id
        );
        setRelatedItems(related.slice(0, 4));
      } catch (error) {
        console.error("Error fetching related items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRelatedItems();
  }, [currentListing]);
  if (loading) {
    return (
      <div className="py-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-48"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (relatedItems.length === 0) {
    return null;
  }
  return (
    <div className="py-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        More items {currentListing.swapperName}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedItems.map((singleListing) => (
          <ListingCard key={singleListing.id} singleListing={singleListing} />
        ))}
      </div>
    </div>
  );
}
