import Hamburger from "hamburger-react";
import Link from "next/link";
import { useState } from "react";
import { DebounceInput } from "react-debounce-input";

import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useDisableBodyScroll } from "../../../hooks/disableScroll";
import SearchPreview from "../SearchPreview/SearchPreview";

export default function MobileNavbar() {
    const [searchExpanded, setSearchExpanded] = useState(false);
    const [searchString, setSearchString] = useState("");

    const [menuOpen, setMenuOpen] = useState(false);

    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    useDisableBodyScroll(menuOpen);

    return (
        <>
            <CSSTransition
                in={menuOpen}
                timeout={300}
                classNames="fade"
                unmountOnExit
            >
                <div className="absolute top-0 left-0 z-10 flex flex-col items-center justify-center w-screen h-screen text-2xl text-white bg-mainDark">
                    <div className="flex flex-col items-center justify-between h-1/2">
                        <Link href="/upcoming">
                            <a
                                onClick={toggleMenu}
                                className="transition-colors duration-300 border-b-2 border-transparent hover:border-white py-0.5"
                            >
                                upcoming
                            </a>
                        </Link>
                        <Link href="/getListed">
                            <a
                                onClick={toggleMenu}
                                className="transition-colors duration-300 border-b-2 border-transparent hover:border-white py-0.5"
                            >
                                get listed
                            </a>
                        </Link>
                        <Link href="/#about">
                            <a
                                onClick={toggleMenu}
                                className="transition-colors duration-300 border-b-2 border-transparent hover:border-white py-0.5"
                            >
                                about
                            </a>
                        </Link>
                    </div>
                </div>
            </CSSTransition>
            <div className="flex items-center justify-between w-full px-3 mt-6 dark:text-white animate-fadeIn">
                <CSSTransition
                    in={!searchExpanded}
                    timeout={100}
                    classNames="fade"
                    unmountOnExit
                >
                    <div className="z-20 flex items-center flex-none">
                        <Link href="/">
                            <a className="relative text-3xl font-black transition-opacity duration-300 hover:opacity-70 radarAnimation">
                                RR
                            </a>
                        </Link>
                    </div>
                </CSSTransition>
                <div className="relative flex items-center justify-end w-full ">
                    <SearchPreview
                        searchString={searchString}
                        setSearchString={setSearchString}
                        setSearchExpanded={setSearchExpanded}
                    />
                    <div
                        className={`${
                            searchExpanded ? "w-full" : ""
                        } flex items-center transition-all justify-end rounded-lg bg-moreLight`}
                    >
                        <button
                            onClick={() => {
                                if (searchExpanded) {
                                    setSearchString("");
                                }
                                setSearchExpanded(!searchExpanded);
                            }}
                            className="p-2"
                        >
                            <SwitchTransition>
                                <CSSTransition
                                    key={searchExpanded ? "true" : "false"}
                                    timeout={150}
                                    classNames="fade"
                                >
                                    {searchExpanded ? (
                                        <svg
                                            className="w-5 h-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="w-5 h-5 text-white left-3"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                </CSSTransition>
                            </SwitchTransition>
                        </button>
                        <DebounceInput
                            className={`${
                                searchExpanded
                                    ? "w-full py-2 pr-3 h-full"
                                    : "w-0 h-0"
                            } font-medium transition-all duration-300 rounded-lg outline-none bg-transparent`}
                            minLength={2}
                            debounceTimeout={500}
                            onChange={(e) => setSearchString(e.target.value)}
                            placeholder="Search for a collection"
                            value={searchString}
                        />
                    </div>
                    {/* <div className="flex items-center justify-center w-10 bg-moreLight"> */}
                    {/* <Hamburger toggle={toggleMenu} toggled={menuOpen} size={19} /> */}
                    {/* </div> */}

                    <button
                        onClick={toggleMenu}
                        className="relative z-20 flex items-center justify-center flex-none w-10 ml-1 rounded-lg h-9 bg-moreLight"
                    >
                        <span
                            className={`${
                                menuOpen ? "rotate-45" : "translate-y-[-7px]"
                            } block absolute h-0.5 w-6 bg-current transform transition duration-500 ease-in-out`}
                        />
                        <span
                            className={`${
                                menuOpen ? "opacity-0" : ""
                            } block absolute h-0.5 w-6 bg-current transform transition duration-500 ease-in-out`}
                        />
                        <span
                            className={`${
                                menuOpen ? "-rotate-45" : "translate-y-[7px]"
                            } block absolute h-0.5 w-6 bg-current transform transition duration-500 ease-in-out`}
                        />
                    </button>
                </div>
            </div>
        </>
    );
}
