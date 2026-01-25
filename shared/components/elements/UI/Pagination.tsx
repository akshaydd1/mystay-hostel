"use client";

import React from "react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  canPrevious: boolean;
  canNext: boolean;
  maxVisiblePages?: number;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
  canPrevious,
  canNext,
  maxVisiblePages = 5,
  className = "",
}) => {
  // Generate page numbers array with ellipsis logic
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than or equal to maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Calculate dynamic boundaries based on maxVisiblePages
      const halfVisible = Math.floor((maxVisiblePages - 2) / 2); // Reserve 2 spots for first/last

      // Always show first page
      pages.push(1);

      // Determine range around current page
      let rangeStart = Math.max(2, currentPage - halfVisible);
      let rangeEnd = Math.min(totalPages - 1, currentPage + halfVisible);

      // Adjust if we're near the start
      if (currentPage <= halfVisible + 1) {
        rangeEnd = Math.min(totalPages - 1, maxVisiblePages - 1);
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - halfVisible) {
        rangeStart = Math.max(2, totalPages - maxVisiblePages + 2);
      }

      // Add leading ellipsis if needed
      if (rangeStart > 2) {
        pages.push("...");
      }

      // Add page range
      for (let i = rangeStart; i <= rangeEnd; i++) {
        pages.push(i);
      }

      // Add trailing ellipsis if needed
      if (rangeEnd < totalPages - 1) {
        pages.push("...");
      }

      // Always show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`flex items-center justify-end gap-1 ${className}`}>
      {/* Previous Button */}
      <button
        onClick={onPrevious}
        disabled={!canPrevious}
        className="px-3 py-1.5 text-xs font-light text-mo-text-dark bg-white border border-mo-gray-border rounded hover:bg-mo-primary hover:text-white hover:border-mo-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-mo-text-dark disabled:hover:border-mo-gray-border cursor-pointer transition-colors"
        aria-label="Previous page"
      >
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-xs text-mo-text-muted"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`
                min-w-8 px-2.5 py-1.5 text-xs font-light rounded transition-colors cursor-pointer
                ${
                  isActive
                    ? "bg-mo-primary text-white border border-mo-primary"
                    : "text-mo-text-dark bg-white border border-mo-gray-border hover:bg-mo-primary hover:text-white hover:border-mo-primary"
                }
              `}
              aria-label={`Go to page ${pageNum}`}
              aria-current={isActive ? "page" : undefined}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={!canNext}
        className="px-3 py-1.5 text-xs font-light text-mo-text-dark bg-white border border-mo-gray-border rounded hover:bg-mo-primary hover:text-white hover:border-mo-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-mo-text-dark disabled:hover:border-mo-gray-border cursor-pointer transition-colors"
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
