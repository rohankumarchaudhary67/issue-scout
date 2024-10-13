import { useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";
import { useRecoilState } from "recoil";
import { recommendations_tags } from "@/data/tag";
import { tagAtom } from "@/atoms/tag-atom";
import { toast } from "sonner";

export default function SearchUI() {
    const [inputValue, setInputValue] = useState("");
    const [tags, setTags] = useRecoilState(tagAtom);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const inputRef = useRef<HTMLDivElement>(null);

    // Function to get filtered recommendations
    const getFilteredRecommendations = (input: string) => {
        const trimmedInput = input.trim();
        const inputChars = Array.from(new Set(trimmedInput.split("").filter(char => char.length > 0)));

        if (trimmedInput.length < 2) {
            return recommendations_tags
                .filter((rec: string) =>
                    rec.toLowerCase().includes(trimmedInput.toLowerCase())
                )
                .filter((rec: string) => !tags.includes(rec)) // Exclude already selected tags
                .slice(0, 7); // Limit to 7 recommendations
        }

        // Filter recommendations based on any characters in the input
        return recommendations_tags
            .filter((rec: string) => {
                const recLower = rec.toLowerCase();
                // Check if the recommendation contains any of the characters in the input
                return inputChars.some(char => recLower.includes(char));
            })
            .filter((rec: string) => !tags.includes(rec)) // Exclude already selected tags
            .slice(0, 7); // Limit to 7 recommendations
    };

    // Filtered recommendations based on user input
    const filteredRecommendations = getFilteredRecommendations(inputValue);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            if (highlightedIndex >= 0) {
                handleRecommendationClick(filteredRecommendations[highlightedIndex]);
            } else {
                if (filteredRecommendations.includes(inputValue)) {
                    setTags((prevTags) => [...prevTags, inputValue]);
                } else {
                    toast("Invalid Keyword");
                }
                setInputValue("");
            }
        } else if (e.key === "ArrowUp") {
            setHighlightedIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : filteredRecommendations.length - 1
            );
        } else if (e.key === "ArrowDown") {
            setHighlightedIndex((prevIndex) =>
                prevIndex < filteredRecommendations.length - 1 ? prevIndex + 1 : 0
            );
        }
    };

    const handleRecommendationClick = (rec: string) => {
        setTags((prevTags) => [...prevTags, rec]);
        setInputValue("");
        setIsDropdownOpen(false);
        setHighlightedIndex(-1);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setIsDropdownOpen(true);
        setHighlightedIndex(-1);
    };

    return (
        <div ref={inputRef} className="relative w-full">
            <Input
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder="Find issues according to you..."
                className="pl-10 pr-4"
            />

            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                </svg>
            </div>

            {/* Recommendation dropdown */}
            {inputValue && isDropdownOpen && filteredRecommendations.length > 0 && (
                <div className="absolute z-10 w-full mt-2 bg-background border rounded-md shadow-lg">
                    {filteredRecommendations.map((rec, index) => (
                        <div
                            key={index}
                            className={`px-4 text-muted-foreground py-2 hover:bg-secondary cursor-pointer ${highlightedIndex === index ? "bg-secondary" : ""
                                }`}
                            onClick={() => handleRecommendationClick(rec)}
                        >
                            {rec}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
