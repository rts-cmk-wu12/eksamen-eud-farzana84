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
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                ? "bg-gray-900 text-white"
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

/*
"use client";
export default function Pagination({ page, total, onChange }) {
  const pagesToShow = (p, t) => {
    if (t <= 7) return Array.from({ length: t }, (_, i) => i + 1);
    if (p <= 4) return [1, 2, 3, 4, 5, "…", t];
    if (p >= t - 3) return [1, "…", t - 4, t - 3, t - 2, t - 1, t];
    return [1, "…", p - 1, p, p + 1, "…", t];
  };

  const items = pagesToShow(page, total);

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-2 text-sm border rounded-lg disabled:opacity-50"
      >
        ‹ Previous
      </button>

      <div className="flex items-center gap-1">
        {items.map((it, i) =>
          it === "…" ? (
            <span key={`e${i}`} className="px-2 select-none">…</span>
          ) : it === page ? (
            <span
              key={it}
              className="px-3 py-2 text-sm rounded-lg bg-gray-900 text-white"
            >
              {it}
            </span>
          ) : (
            <button
              key={it}
              onClick={() => onChange(it)}
              className="px-3 py-2 text-sm border rounded-lg"
            >
              {it}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === total}
        className="px-3 py-2 text-sm border rounded-lg disabled:opacity-50"
      >
        Next ›
      </button>
    </div>
  );
}
*/