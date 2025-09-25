"use client";
import { useState } from "react";
import SearchForm from "@/components/forms/SearchForm";
import PaginatedListings from "@/components/listings/PaginatedListings";
import NewsletterForm from "@/components/forms/NewsletterForm";
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
    <div className="min-h-screen bg-gray-50 scroll-smooth">
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
            <section id="contact" className="mt-16">
              <div className="rounded-2xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-6 sm:p-10">
                <div className="max-w-2xl mx-auto">
                  <NewsletterForm />
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
