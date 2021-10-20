import { useContext, useState } from "react";
import { rainbowGradient } from "../../utils/client";
import Loader from "../Loader";
import Modal from "../Modal/Modal";
import NFTFull from "./NFTFull";

import { LazyLoadImage } from "react-lazy-load-image-component";

/* eslint-disable @next/next/no-img-element */
interface INFT {
    collectionName: string;
    tokenName: string;
    rank?: number;
    externalURL?: string;
    image: string;
    attributes: Array<any>;
    meanPercentage?: number;
    highestMeanPercentage?: number;
    lowestMeanPercentage?: number;
}

export default function NFTPreview({
    collectionName,
    tokenName,
    rank,
    externalURL,
    image,
    attributes,
    meanPercentage,
    highestMeanPercentage,
    lowestMeanPercentage,
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
                <NFTFull
                    key={tokenName}
                    collectionName={collectionName}
                    tokenName={tokenName}
                    highestMeanPercentage={highestMeanPercentage}
                    lowestMeanPercentage={lowestMeanPercentage}
                />
            </Modal>
            <button
                style={{ maxWidth: "600px" }}
                onClick={toggleModal}
                className="flex flex-col overflow-hidden duration-200 transform bg-white rounded-xl hover:scale-105"
            >
                <LazyLoadImage
                    className={`w-full shadow-md rounded-b-xl ${
                        loading ? "hidden" : "block"
                    }`}
                    src={image}
                    alt={tokenName}
                    afterLoad={imageLoaded}
                    effect="opacity"
                />
                <div
                    className={`${
                        loading ? "block" : "hidden"
                    } h-56 flex items-center justify-center w-full`}
                >
                    <Loader color={"border-slightDark"} />
                </div>
                <div className="flex flex-col items-center w-full p-1">
                    <p className="font-semibold my-0.5 self-start">
                        {tokenName}
                    </p>
                    <div className="flex items-end self-end justify-end w-full px-1">
                        {meanPercentage &&
                            lowestMeanPercentage &&
                            highestMeanPercentage && (
                                <div className="flex items-end mr-1">
                                    <p className="text-sm opacity-70 mr-0.5">
                                        mean
                                    </p>
                                    <p
                                        className="text-lg font-black leading-tight text-transparent bg-clip-text"
                                        style={{
                                            backgroundImage: rainbowGradient(
                                                meanPercentage,
                                                lowestMeanPercentage,
                                                highestMeanPercentage
                                            ),
                                        }}
                                    >
                                        {meanPercentage.toFixed(2)}%
                                    </p>
                                </div>
                            )}
                        {rank && (
                            <div className="flex items-end">
                                <p className="text-sm opacity-70 mr-0.5">
                                    rank
                                </p>
                                <p className="text-lg font-black leading-tight text-transparent bg-gradient-to-br from-blue-500 to-cyan-400 bg-clip-text">
                                    {rank}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </button>
        </>
    );
}
