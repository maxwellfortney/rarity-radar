import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { SearchContext } from "../Navbar";

import { CSSTransition, SwitchTransition } from "react-transition-group";

export default function SearchPreview() {
    const { searchString } = useContext(SearchContext);

    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    async function fetchSearchResults() {
        setIsLoading(true);
        const res = await fetch(`/api/collections/${searchString}`);

        if (res.status === 200) {
            const resData = await res.json();
            console.log(resData);

            setSearchResults(resData);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchSearchResults();
    }, [searchString]);

    return (
        <>
            <CSSTransition
                in={isLoading || searchString.length > 0}
                timeout={300}
                classNames="fade"
                unmountOnExit
            >
                <div
                    className="absolute flex w-full h-12 rounded-lg bg-moreLight"
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
                                        <div className="flex items-center justify-center w-full font-semibold">
                                            no results
                                        </div>
                                    ) : (
                                        <>
                                            {searchResults.map(
                                                (result: any) => {
                                                    return (
                                                        <ASearchResultRow
                                                            collectionName={
                                                                result.name
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
}

function ASearchResultRow({ collectionName }: IASearchResultRow) {
    const { searchString } = useContext(SearchContext);

    const stringParts = collectionName.split(
        new RegExp(`(${searchString})`, "gi")
    );

    return (
        <Link href={`/collections/${collectionName}`}>
            <a
                className="flex items-center w-full px-2 transition-colors duration-300 rounded-lg border-slightDark hover:bg-slightDark"
                style={{ borderBottomWidth: "1px" }}
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
