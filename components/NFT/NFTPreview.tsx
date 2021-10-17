import { useContext, useState } from "react";
import Loader from "../Loader";
import Modal from "../Modal/Modal";

/* eslint-disable @next/next/no-img-element */
interface INFT {
    name: string;
    rank: number;
    externalURL: string;
    image: string;
    attributes: Array<any>;
    meanPercentage: number;
}

export default function NFTPreview({
    name,
    rank,
    externalURL,
    image,
    attributes,
    meanPercentage,
}: INFT) {
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    async function toggleModal() {
        setShowModal(!showModal);
    }

    const imageLoaded = () => {
        setLoading(false);
    };

    return (
        <>
            <Modal isOpen={showModal} onClose={toggleModal}>
                <div
                    className={`z-10 flex w-11/12 md:w-3/4 lg:w-1/2 relative bg-white shadow-lg dark:bg-dark-bg rounded-xl square-aspect`}
                >
                    <NFTPreview
                        key={name}
                        name={name}
                        rank={rank}
                        externalURL={externalURL}
                        image={image}
                        attributes={attributes}
                        meanPercentage={meanPercentage}
                    />
                </div>
            </Modal>
            <button
                style={{ maxWidth: "600px" }}
                onClick={toggleModal}
                className="flex flex-col overflow-hidden duration-200 transform bg-white rounded-xl hover:scale-105"
            >
                <img
                    className={`w-full shadow-md rounded-b-xl ${
                        loading ? "hidden" : "block"
                    }`}
                    src={image}
                    alt={name}
                    onLoad={imageLoaded}
                />
                <div
                    className={`${
                        loading ? "block" : "hidden"
                    } h-56 flex items-center justify-center w-full`}
                >
                    <Loader color={"border-slightDark"} />
                </div>
                <div className="flex flex-col items-center w-full p-1">
                    <p className="font-semibold my-0.5 self-start">{name}</p>
                    <div className="flex items-end self-end justify-end w-full px-1">
                        <div className="flex items-end mr-1">
                            <p className="text-sm opacity-70 mr-0.5">mean</p>
                            <p className="text-lg font-black leading-tight text-transparent bg-gradient-to-br from-blue-500 to-cyan-400 bg-clip-text">
                                {meanPercentage.toFixed(2)}%
                            </p>
                        </div>
                        <div className="flex items-end">
                            <p className="text-sm opacity-70 mr-0.5">rank</p>
                            <p className="text-lg font-black leading-tight text-transparent bg-gradient-to-br from-blue-500 to-cyan-400 bg-clip-text">
                                {rank}
                            </p>
                        </div>
                    </div>
                </div>
            </button>
        </>
    );
}
