import FilterTagsUI from "@/components/application-ui/filter-tags-ui";
import IssueCardUI from "@/components/application-ui/issue-card-ui";
import PaginationDemo from "@/components/application-ui/pagination-ui";
import SearchUI from "@/components/application-ui/search-ui";

export default function Issues() {
    return (
        <>
            <div className="px-32 py-6">
                <SearchUI />
                <div className="flex">
                    <FilterTagsUI tag={"2024"} />
                    <FilterTagsUI tag={"Bugs"} />
                    <FilterTagsUI tag={"Good First Issues"} />
                    <FilterTagsUI tag={"Chromium"} />
                    <FilterTagsUI tag={"2022"} />
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
