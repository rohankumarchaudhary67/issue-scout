'use client'
import React from 'react'; // Import React if using older versions of TypeScript
import FilterTagsUI from "@/components/application-ui/filter-tags-ui";
import IssueCardUI from "@/components/application-ui/issue-card-ui";
import PaginationDemo from "@/components/application-ui/pagination-ui";
import SearchUI from "@/components/application-ui/search-ui";
import { useRecoilValue } from 'recoil';
import { tagAtom } from '@/atoms/tag-atom';

export default function Home() {

  const tags = useRecoilValue(tagAtom);

  return (
    <>
      <div className="flex justify-center items-center gap-3 py-4">
        <img src="/logo/logo-wbg.png" className="h-8" alt="Logo" />
        <h1 className="text-2xl font-bold">Issue Scout</h1>
      </div>
      <div className="px-3 md:px-32 pb-6">
        <SearchUI />
        <div className="flex justify-start items-center overflow-x-auto md:overflow-hidden scrollbar-hide md:space-y-2 py-2">
          <div className='flex md:flex-wrap'>
            {tags.map((tag, index) => (
              <FilterTagsUI key={index} tag={tag} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <IssueCardUI />
          <IssueCardUI />
          <IssueCardUI />
          <IssueCardUI />
          <IssueCardUI />
          <IssueCardUI />
          <IssueCardUI />
          <IssueCardUI />
          <IssueCardUI />
        </div>
        <div className="flex justify-center items-center py-4">
          <PaginationDemo />
        </div>
      </div>
    </>
  );
}
