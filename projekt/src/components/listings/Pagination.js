"use client";
export default function Pagination({ currentPage, totalPages, onPageChange }) {
const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;
     if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
    pages.push(1);
      if (currentPage <= 4) {
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages - 1);
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(2);
        pages.push(3);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(2);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages - 1);
        pages.push(totalPages);
      }
    }
    return pages;
  };
const handlePageChange = (page) => {
    if (typeof page === "number" && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>
     <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => (
            <button
            key={index}
            onClick={() => handlePageChange(page)}
            disabled={page === "..."}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              page === currentPage
                ? "bg-[#95D6A4]  text-black"
                : page === "..."
                ? "text-gray-500 cursor-default"
                : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}