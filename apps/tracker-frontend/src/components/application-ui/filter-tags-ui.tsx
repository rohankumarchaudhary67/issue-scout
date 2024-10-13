import { useRecoilState } from "recoil";
import { Button } from "../ui/button";
import { tagAtom } from "@/atoms/tag-atom";

interface FilterTagProps {
    tag: string;
}

export default function FilterTagsUI({ tag }: FilterTagProps) {
    // Recoil state for tags
    const [tags, setTags] = useRecoilState(tagAtom);

    // Function to remove a tag from the Recoil state
    const handleRemoveTag = () => {
        setTags(tags.filter((t) => t !== tag)); // Filter out the tag
    };

    return (
        <>
            <div className="px-2 py-2">
                <div className="flex items-center space-x-2">
                    {/* Filter Button */}
                    <Button variant={"secondary"} size={"sm"}>
                        <span className="pr-2">{tag}</span>
                        {/* Cross Icon */}
                        <svg
                            onClick={handleRemoveTag} // Remove the tag when clicked
                            className="w-4 h-4 text-gray-500 hover:text-gray-200 cursor-pointer"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </Button>
                </div>
            </div>
        </>
    );
}
