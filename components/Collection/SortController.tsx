import { useContext, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { CollectionContext } from "../../pages/collections/[name]";

const sortTypes = ["rank", "-rank"];

export default function SortController() {
    const { sort, setSort } = useContext(CollectionContext);

    const [isOpen, setIsOpen] = useState(false);

    async function toggleOpen(e: any) {
        setIsOpen(!isOpen);
    }

    return (
        <div className="relative flex items-center">
            <div className="flex flex-col">
                <p className="mb-1 leading-none">sort</p>
                <button
                    onClick={toggleOpen}
                    className="flex items-center py-1 pl-3 pr-2 font-semibold text-black transition-opacity duration-300 bg-white rounded-lg hover:opacity-70"
                >
                    <p>{sort}</p>
                    <svg
                        className={`w-4 h-4  transform duration-300 ${
                            isOpen ? "rotate-180" : "mt-1"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            <CSSTransition
                in={isOpen}
                classNames="fade"
                timeout={300}
                unmountOnExit
            >
                <div
                    className="absolute z-10 flex min-w-full text-black bg-white rounded-lg shadow-lg"
                    style={{ top: "calc(100% + 12px)" }}
                >
                    {sortTypes.map((sortType) => {
                        if (sortType !== sort) {
                            return (
                                <button
                                    onClick={() => {
                                        setSort(sortType);
                                        setIsOpen(false);
                                    }}
                                    className="flex w-full px-3 py-1 font-semibold transition-opacity duration-300 hover:opacity-70"
                                >
                                    <p>{sortType}</p>
                                </button>
                            );
                        }
                    })}
                </div>
            </CSSTransition>
        </div>
    );
}
