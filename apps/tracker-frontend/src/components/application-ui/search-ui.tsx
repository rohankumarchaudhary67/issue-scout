import { useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";
import { useRecoilState } from "recoil";
import { recommendations_tags } from "@/data/tag";
import { tagAtom } from "@/atoms/tag-atom";
import { toast } from "sonner"


export default function SearchUI() {
    const [inputValue, setInputValue] = useState("");
    const [tags, setTags] = useRecoilState(tagAtom);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // To manage dropdown visibility
    const [highlightedIndex, setHighlightedIndex] = useState(-1); // To manage which recommendation is highlighted
    const inputRef = useRef<HTMLDivElement>(null); // Ref for input and dropdown container

    // Filtered recommendations based on user input and excluding already selected tags
    const filteredRecommendations = recommendations_tags
        .filter((rec: any) =>
            rec.toLowerCase().includes(inputValue.toLowerCase())
        )
        .filter((rec: any) => !tags.includes(rec)); // Exclude already selected tags

    // Function to handle the key press event
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            if (highlightedIndex >= 0) {
                // If there's a highlighted recommendation, select it
                handleRecommendationClick(filteredRecommendations[highlightedIndex]);
            } else {
                // Only add if the input matches a recommendation
                if (filteredRecommendations.includes(inputValue)) {
                    setTags((prevTags) => [...prevTags, inputValue]);
                } else {
                    // Show toast notification for invalid input
                    toast("Invalid Keyword");
                }
                setInputValue(""); // Clear input after adding
            }
        } else if (e.key === "ArrowUp") {
            // Move the highlight up
            setHighlightedIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : filteredRecommendations.length - 1
            );
        } else if (e.key === "ArrowDown") {
            // Move the highlight down
            setHighlightedIndex((prevIndex) =>
                prevIndex < filteredRecommendations.length - 1 ? prevIndex + 1 : 0
            );
        }
    };
    

    // Function to handle recommendation click
    const handleRecommendationClick = (rec: string) => {
        setTags((prevTags) => [...prevTags, rec]);
        setInputValue(""); // Clear input after selection
        setIsDropdownOpen(false); // Close the dropdown
        setHighlightedIndex(-1); // Reset highlight
    };

    // Close the dropdown if the user clicks outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false); // Close the dropdown
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Handle input change and open the dropdown
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setIsDropdownOpen(true); // Open the dropdown when user types
        setHighlightedIndex(-1); // Reset highlight on new input
    };

    return (
        <>
            <div ref={inputRef} className="relative w-full">
                {/* Input field */}
                <Input
                    value={inputValue}
                    onChange={handleInputChange} // Update input value and show dropdown
                    onKeyDown={handleKeyPress} // Handle Enter, ArrowUp, and ArrowDown key press
                    placeholder="Find issues according to you..."
                    className="pl-10 pr-4"
                />

                {/* Search icon */}
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
                                className={`px-4 text-muted-foreground py-2 hover:bg-secondary cursor-pointer ${
                                    highlightedIndex === index ? "bg-secondary" : ""
                                }`}
                                onClick={() => handleRecommendationClick(rec)} // Add the tag when clicked
                            >
                                {rec}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
