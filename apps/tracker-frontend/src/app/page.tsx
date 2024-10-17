"use client";
import React, { useEffect, useState } from 'react';
import FilterTagsUI from "@/components/application-ui/filter-tags-ui";
import IssueCardUI from "@/components/application-ui/issue-card-ui";
import PaginationDemo from "@/components/application-ui/pagination-ui";
import SearchUI from "@/components/application-ui/search-ui";
import { useRecoilValue } from 'recoil';
import { tagAtom } from '@/atoms/tag-atom';
import axios from 'axios';

interface Issue {
  githubId: number;
  issueNumber: number;
  issueURL: string;
  title: string;
  state: string;
  comments: number;
  repository: string;
}


export default function Home() {
  const tags = useRecoilValue(tagAtom);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18; // Adjust the number of items per page
  const [issues, setIssues] = useState<Issue[]>([]);
  const totalPages = Math.ceil(issues.length / itemsPerPage);

  const fetchIssues = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/get-issues`);
      setIssues(response.data.data); // Ensure this matches your API response structure
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  const recommendations_tags = Array.from(
    new Set(issues.flatMap(issue => issue.repository.split('/')))
  );
  

  // Get the issues for the current page
  const paginatedIssues = issues.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center gap-3 py-4">
        <img src="/logo/logo-wbg.png" className="h-8" alt="Logo" />
        <h1 className="text-2xl font-bold">Issue Scout</h1>
      </div>
      <div className="px-3 md:px-32 pb-6">
        <SearchUI recommendations_tags={recommendations_tags} />
        <div className="flex justify-start items-center overflow-x-auto md:overflow-hidden scrollbar-hide md:space-y-2 py-2">
          <div className="flex md:flex-wrap">
            {tags.map((tag, index) => (
              <FilterTagsUI key={index} tag={tag} />
            ))}
          </div>
        </div>

        {/* Display issues based on the current page */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {paginatedIssues.map((issue) => (
            <IssueCardUI
              key={issue.githubId} // Use a unique identifier from the issue
              organizationName={issue.repository}
              issue={issue.title}
              issueNumber={issue.issueNumber}
              issueLink={issue.issueURL} // Pass the issue URL if needed
              state={issue.state} 
              noOfComments={issue.comments} // Pass comments if you want to display them
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
