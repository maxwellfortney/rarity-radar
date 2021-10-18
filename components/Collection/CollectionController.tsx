import { useContext } from "react";
import { DebounceInput } from "react-debounce-input";
import { CollectionContext } from "../../pages/collections/[name]";
import SortController from "./SortController";

export default function CollectionController() {
    const { idFilter, setIdFilter, sort, setSort } =
        useContext(CollectionContext);

    return (
        <div className="flex items-center justify-between w-full px-2 py-2 mb-8 font-semibold text-white gap-x-3">
            <div className="flex flex-col">
                <p className="mb-1 leading-none">search id</p>

                <DebounceInput
                    value={idFilter}
                    debounceTimeout={400}
                    onChange={(e) => setIdFilter(parseInt(e.target.value))}
                    type="number"
                    min={10}
                    max={250}
                    className="w-full min-w-0 px-2 py-1 font-semibold text-black placeholder-black bg-white rounded-lg outline-none"
                    placeholder="id"
                />
            </div>
            <SortController />
            {/* <div className="flex flex-col">
                <p className="mb-1 leading-none">per page</p>
                <DebounceInput
                    value={perPage}
                    debounceTimeout={400}
                    onChange={(e) => setPerPage(parseInt(e.target.value))}
                    type="number"
                    min={10}
                    max={250}
                    className="w-full min-w-0 px-2 py-1 text-white rounded-lg outline-none bg-moreLight"
                    placeholder="per page"
                />
            </div> */}
            {/* <div className="flex flex-col">
                <p className="mb-1 leading-none">search id</p>
                <input
                    className="w-full min-w-0 px-2 py-1 text-white rounded-lg outline-none bg-moreLight"
                    placeholder="id"
                />
            </div> */}
        </div>
    );
}
