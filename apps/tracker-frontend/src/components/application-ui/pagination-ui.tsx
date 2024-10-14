import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

interface PaginationDemoProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function PaginationDemo({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationDemoProps) {

    // Handle page change
    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return; // Prevent out-of-bounds page changes
        onPageChange(page);
    };

    // Generate an array of page numbers with ellipsis for large page counts
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 6; // Number of visible pages before dots
        if (totalPages <= maxVisiblePages) {
            // Show all pages if total pages <= maxVisiblePages
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show the first, last, and the current page range
            if (currentPage <= 3) {
                // Show pages 1 to 4 and the last page
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Show the first page and the last 4 pages
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                // Show the first page, current page range, and the last page
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    // Prevent click if disabled
    const handleDisabledClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault(); // Prevent link action
    };

    return (
        <div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        {/* Handle disabled Previous button */}
                        {currentPage === 1 ? (
                            <PaginationPrevious
                                href="#"
                                onClick={handleDisabledClick}
                                style={{ pointerEvents: 'none', opacity: 0.5 }}
                            />
                        ) : (
                            <PaginationPrevious
                                href="#"
                                onClick={() => handlePageChange(currentPage - 1)}
                            />
                        )}
                    </PaginationItem>

                    {getPageNumbers().map((page, index) => (
                        <PaginationItem key={index}>
                            {typeof page === "number" ? (
                                <PaginationLink
                                    href="#"
                                    isActive={page === currentPage}
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </PaginationLink>
                            ) : (
                                <span>...</span>
                            )}
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        {/* Handle disabled Next button */}
                        {currentPage === totalPages ? (
                            <PaginationNext
                                href="#"
                                onClick={handleDisabledClick}
                                style={{ pointerEvents: 'none', opacity: 0.5 }}
                            />
                        ) : (
                            <PaginationNext
                                href="#"
                                onClick={() => handlePageChange(currentPage + 1)}
                            />
                        )}
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
