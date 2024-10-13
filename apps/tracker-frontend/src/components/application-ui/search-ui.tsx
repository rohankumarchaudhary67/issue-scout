import { Input } from "../ui/input";

export default function SearchUI() {
    return (
        <>
            <div className="relative w-full">
                {/* Input field */}
                <Input
                    placeholder="Find issues according to you..."
                    className="pl-10 pr-4" // Adding padding for the icon
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
            </div>
        </>
    )
}