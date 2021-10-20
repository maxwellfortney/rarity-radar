import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { rainbowGradient } from "../../utils/client";
import Loader from "../Loader";

interface INFTFull {
    collectionName: string;
    tokenName: string;
    highestMeanPercentage?: number;
    lowestMeanPercentage?: number;
}

export default function NFTFull({
    collectionName,
    tokenName,
    highestMeanPercentage,
    lowestMeanPercentage,
}: INFTFull) {
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isLoadingImage, setIsLoadingImage] = useState(true);

    const [nftData, setnftData] = useState<any>(null);

    const imageLoaded = () => {
        setIsLoadingImage(false);
    };

    async function fetchFullNFT() {
        const res = await fetch(
            `/api/collections/${collectionName}/tokens/${encodeURIComponent(
                tokenName
            )}`
        );

        if (res.status === 200) {
            const nft = await res.json();
            setnftData(nft);
            setIsLoadingData(false);
        }
    }

    useEffect(() => {
        console.log(collectionName);
        console.log(tokenName);

        console.log(
            `/api/collections/${collectionName}/${encodeURIComponent(
                tokenName
            )}`
        );
        fetchFullNFT();
    }, []);

    return (
        <div
            className={`z-10 flex justify-center rounded-xl overflow-hidden items-center w-3/4 md:w-1/2 lg:w-1/3 relative shadow-lg bg-white`}
        >
            {isLoadingData ? (
                <Loader color={"border-slightDark"} />
            ) : (
                <>
                    {nftData ? (
                        <div className="flex flex-col w-full">
                            <LazyLoadImage
                                src={nftData.image}
                                className={`w-full shadow-md rounded-b-xl ${
                                    isLoadingImage ? "hidden" : "block"
                                }`}
                                afterLoad={imageLoaded}
                                effect="opacity"
                            />
                            <div
                                className={`${
                                    isLoadingImage ? "block" : "hidden"
                                } h-56 flex items-center justify-center w-full`}
                            >
                                <Loader color={"border-slightDark"} />
                            </div>
                            <div className="flex flex-col w-full p-3">
                                <div className="flex justify-between w-full">
                                    <h1 className="text-xl font-extrabold">
                                        {nftData.name}
                                    </h1>
                                    <div className="flex items-end self-end justify-end mb-0.5">
                                        {nftData.meanPercentage &&
                                            lowestMeanPercentage &&
                                            highestMeanPercentage && (
                                                <div className="flex items-end mr-1">
                                                    <p className="text-sm opacity-70 mr-0.5">
                                                        mean
                                                    </p>
                                                    <p
                                                        className="text-xl font-black leading-tight text-transparent bg-clip-text"
                                                        style={{
                                                            backgroundImage:
                                                                rainbowGradient(
                                                                    nftData.meanPercentage,
                                                                    lowestMeanPercentage,
                                                                    highestMeanPercentage
                                                                ),
                                                        }}
                                                    >
                                                        {nftData.meanPercentage.toFixed(
                                                            2
                                                        )}
                                                        %
                                                    </p>
                                                </div>
                                            )}
                                        <div className="flex items-end">
                                            <p className="text-sm opacity-70 mr-0.5">
                                                rank
                                            </p>
                                            <p className="text-xl font-black leading-tight text-transparent bg-gradient-to-br from-blue-500 to-cyan-400 bg-clip-text">
                                                {nftData.rank}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col w-full">
                                    <h2 className="mt-3 text-lg font-bold">
                                        attributes
                                    </h2>
                                    {nftData.attributes.map(
                                        (attribute: any) => {
                                            return (
                                                <AnAttribute
                                                    traitType={
                                                        attribute.traitType
                                                    }
                                                    value={attribute.value}
                                                    percentage={
                                                        attribute.percentage
                                                    }
                                                    highestMeanPercentage={
                                                        highestMeanPercentage
                                                    }
                                                    lowestMeanPercentage={
                                                        lowestMeanPercentage
                                                    }
                                                />
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Failed to load nft</p>
                    )}
                </>
            )}
        </div>
    );
}

interface IAnAttribute {
    traitType: string;
    value: string;
    percentage?: number;
    highestMeanPercentage?: number;
    lowestMeanPercentage?: number;
}

function AnAttribute({
    traitType,
    value,
    percentage,
    highestMeanPercentage,
    lowestMeanPercentage,
}: IAnAttribute) {
    return (
        <div className="flex flex-col items-center w-full">
            <p className="self-start pl-2 font-bold leading-tight">
                {traitType}
            </p>
            {percentage && lowestMeanPercentage && highestMeanPercentage && (
                <div className="flex justify-between w-11/12">
                    <p className="font-medium">{value}</p>
                    <p
                        className="text-lg font-black text-transparent bg-clip-text"
                        style={{
                            backgroundImage: rainbowGradient(
                                percentage,
                                lowestMeanPercentage,
                                highestMeanPercentage
                            ),
                        }}
                    >
                        {percentage.toFixed(2)}%
                    </p>
                </div>
            )}
        </div>
    );
}
