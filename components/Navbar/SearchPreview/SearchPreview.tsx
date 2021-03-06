import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { SearchContext } from "../Navbar";

import { CSSTransition, SwitchTransition } from "react-transition-group";

export default function SearchPreview({
    searchString,
    setSearchString,
    setSearchExpanded,
}: any) {
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    async function fetchSearchResults() {
        setIsLoading(true);
        const res = await fetch(`/api/collections/search/${searchString}`);

        if (res.status === 200) {
            const resData = await res.json();
            console.log(resData);

            setSearchResults(resData);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (searchString.length > 0) {
            fetchSearchResults();
        }
    }, [searchString]);

    return (
        <>
            <CSSTransition
                in={searchString.length > 0}
                timeout={300}
                classNames="fade"
                unmountOnExit
            >
                <div
                    className="absolute z-10 flex flex-col w-full overflow-y-auto text-white rounded-lg min-h-12 max-h-96 bg-moreLight"
                    style={{ top: "calc(100% + 12px)" }}
                >
                    <SwitchTransition>
                        <CSSTransition
                            key={isLoading ? "true" : "false"}
                            addEndListener={(node, done) =>
                                node.addEventListener(
                                    "transitionend",
                                    done,
                                    false
                                )
                            }
                            classNames="fade"
                        >
                            {isLoading ? (
                                <p>loading</p>
                            ) : (
                                <>
                                    {searchResults.length === 0 ? (
                                        <div className="flex items-center justify-center w-full py-2 font-semibold">
                                            no results
                                        </div>
                                    ) : (
                                        <>
                                            {searchResults.map(
                                                (result: any) => {
                                                    return (
                                                        <ASearchResultRow
                                                            key={result.name}
                                                            collectionName={
                                                                result.name
                                                            }
                                                            searchString={
                                                                searchString
                                                            }
                                                            setSearchString={
                                                                setSearchString
                                                            }
                                                            setSearchExpanded={
                                                                setSearchExpanded
                                                            }
                                                        />
                                                    );
                                                }
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </CSSTransition>
                    </SwitchTransition>
                </div>
            </CSSTransition>
        </>
    );
}

interface IASearchResultRow {
    collectionName: string;
    searchString: string;
    setSearchString: any;
    setSearchExpanded?: any;
}

function ASearchResultRow({
    collectionName,
    searchString,
    setSearchString,
    setSearchExpanded,
}: IASearchResultRow) {
    const stringParts = collectionName.split(
        new RegExp(`(${searchString})`, "gi")
    );

    async function handleClick(e: any) {
        setSearchString("");
        if (setSearchExpanded) {
            setSearchExpanded(false);
        }
    }

    return (
        <Link href={`/collections/${collectionName}`}>
            <a
                onClick={handleClick}
                className="flex items-center w-full px-2 py-2 transition-colors duration-300 hover:bg-slightDark"
            >
                <span>
                    {stringParts.map((part, i) => (
                        <span
                            key={i}
                            className={`${
                                part.toLowerCase() ===
                                searchString.toLowerCase()
                                    ? "font-extrabold"
                                    : ""
                            }`}
                        >
                            {part}
                        </span>
                    ))}
                </span>
            </a>
        </Link>
    );
}
