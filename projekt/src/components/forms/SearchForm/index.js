"use client";
import { useState, useEffect } from "react";
export default function SearchForm({ onSearch, onSort, searchQuery: externalSearchQuery, selectedSort: externalSelectedSort }) {
  const [searchQuery, setSearchQuery] = useState(externalSearchQuery || "");
  const [selectedSort, setSelectedSort] = useState(externalSelectedSort || "new");
  useEffect(() => {
    if (externalSearchQuery !== undefined) {
      setSearchQuery(externalSearchQuery);
    }
  }, [externalSearchQuery]);
useEffect(() => {
    if (externalSelectedSort !== undefined) {
      setSelectedSort(externalSelectedSort);
    }
  }, [externalSelectedSort]);
const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };
const handleSortChange = (sortType) => {
    setSelectedSort(sortType);
    onSort?.(sortType);
  };
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };
return (
    <div className="flex items-center gap-4 w-full max-w-4xl">
      <div className="flex-1">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search"
              className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Search"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleSortChange("new")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            selectedSort === "new"
              ? "bg-[#95D6A4] text-black"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {selectedSort === "new" && (
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          )}
          New
        </button>

        <button
          onClick={() => handleSortChange("old")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            selectedSort === "old"
              ? "bg-[#95D6A4] text-black"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {selectedSort === "old" && (
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          )}
          Old
        </button>
      </div>
    </div>
  );
}
