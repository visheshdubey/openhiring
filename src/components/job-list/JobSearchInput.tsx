"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";

interface JobSearchInputProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    buttonText?: string;
    className?: string;
}

const JobSearchInput: React.FC<JobSearchInputProps> = ({
    onSearch,
    placeholder = "Search ...",
    buttonText = "Search",
    className = "",
}) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        onSearch(query);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className={`flex w-full gap-2 mt-5 ${className}`}>
            <input
                type="text"
                placeholder={placeholder}
                className="px-4 py-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
            />
            <Button
                className="bg-orange-500 h-full text-lg rounded-lg hover:bg-orange-600 text-white"
                onClick={handleSearch}
            >
                {buttonText}
            </Button>
        </div>
    );
};

export default JobSearchInput;
