import Link from "next/link";
import { createContext, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import SearchPreview from "./SearchPreview/SearchPreview";

export const SearchContext = createContext<any>(null);

export default function Navbar() {
    const [searchString, setSearchString] = useState("");

    return (
        <div className="flex items-center justify-between w-full px-6 mt-6 dark:text-white animate-fadeIn">
            <div className="flex items-center flex-none">
                <Link href="/">
                    <a className="relative text-3xl font-black transition-opacity duration-300 hover:opacity-70 radarAnimation">
                        Rarity Radar
                    </a>
                </Link>
            </div>
            <div className="relative flex items-center flex-1 mx-12">
                <svg
                    className="absolute w-5 h-5 text-white left-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                    />
                </svg>

                <DebounceInput
                    className="w-full h-full py-2 pr-3 font-medium text-white transition-colors duration-300 rounded-lg outline-none pl-9 bg-moreLight focus:bg-moreLight hover:bg-slightDark"
                    minLength={2}
                    debounceTimeout={500}
                    onChange={(e) => setSearchString(e.target.value)}
                    placeholder="Search for a collection"
                />

                <SearchPreview
                    searchString={searchString}
                    setSearchString={setSearchString}
                />
            </div>
            <div className="flex items-center flex-none space-x-3 text-lg font-semibold">
                <Link href="/upcoming">
                    <a className="transition-colors duration-300 border-b-2 border-transparent hover:border-white py-0.5">
                        upcoming
                    </a>
                </Link>
                <Link href="/getListed">
                    <a className="transition-colors duration-300 border-b-2 border-transparent hover:border-white py-0.5">
                        get listed
                    </a>
                </Link>
                <Link href="/#about">
                    <a className="transition-colors duration-300 border-b-2 border-transparent hover:border-white py-0.5">
                        about
                    </a>
                </Link>
            </div>
        </div>
    );
}
