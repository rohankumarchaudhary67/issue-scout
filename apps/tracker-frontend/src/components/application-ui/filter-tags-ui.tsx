import { Button } from "../ui/button";

interface FilterTagProps{
    tag: string
}

export default function FilterTagsUI({tag}: FilterTagProps) {
    return (
        <>
            <div className="py-4 px-2">
                <div className="flex items-center space-x-2">
                    {/* Filter Button */}
                    <Button variant={"secondary"} size={"sm"}>
                        <span className="pr-2">{tag}</span>
                        <svg
                            className="w-4 h-4 text-gray-500 hover:text-gray-700"
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
