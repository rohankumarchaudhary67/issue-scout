"use client";
import React, { useState } from 'react';
import FilterTagsUI from "@/components/application-ui/filter-tags-ui";
import IssueCardUI from "@/components/application-ui/issue-card-ui";
import PaginationDemo from "@/components/application-ui/pagination-ui";
import SearchUI from "@/components/application-ui/search-ui";
import { useRecoilValue } from 'recoil';
import { tagAtom } from '@/atoms/tag-atom';
import { issues } from '@/data/issue';

export default function Home() {
  const tags = useRecoilValue(tagAtom);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Adjust the number of items per page
  const totalPages = Math.ceil(issues.length / itemsPerPage);

  // Get the issues for the current page
  const paginatedIssues = issues.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="flex justify-center items-center gap-3 py-4">
        <img src="/logo/logo-wbg.png" className="h-8" alt="Logo" />
        <h1 className="text-2xl font-bold">Issue Scout</h1>
      </div>
      <div className="px-3 md:px-32 pb-6">
        <SearchUI />
        <div className="flex justify-start items-center overflow-x-auto md:overflow-hidden scrollbar-hide md:space-y-2 py-2">
          <div className="flex md:flex-wrap">
            {tags.map((tag, index) => (
              <FilterTagsUI key={index} tag={tag} />
            ))}
          </div>
        </div>

        {/* Display issues based on the current page */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {paginatedIssues.map((issue, index) => (
            <IssueCardUI
              key={index}
              organizationName={issue.organizationName}
              issue={issue.issue}
              issueNumber={issue.issueNumber}
              state={issue.state}
              assignees={issue.assignees}
              noOfComments={issue.noOfComments}
              issueLink={issue.issueLink}
            />
          ))}
        </div>

        {/* Pagination component */}
        <div className="flex justify-center items-center py-4">
          <PaginationDemo
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}
