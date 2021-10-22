import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { rainbowGradient } from "../../utils/client";
import Loader from "../Loader";

interface INFTFull {
    collectionName: string;
    tokenName: string;
    tokenId?: number;
    highestMeanPercentage?: number;
    lowestMeanPercentage?: number;
    highestRarityScore?: number;
    lowestRarityScore?: number;
}

export default function NFTFull({
    collectionName,
    tokenName,
    tokenId,
    highestMeanPercentage,
    lowestMeanPercentage,
    highestRarityScore,
    lowestRarityScore,
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
                tokenId ? tokenId : tokenName
            )}`
        );

        if (res.status === 200) {
            const nft = await res.json();
            setnftData(nft);
            setIsLoadingData(false);
        }
    }

    useEffect(() => {
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
                                <Loader
                                    color={"border-slightDark"}
                                    className="py-16"
                                />
                            </div>
                            <div className="flex flex-col w-full p-3">
                                <div className="flex justify-between w-full">
                                    <h1 className="text-xl font-extrabold">
                                        {nftData.name}
                                    </h1>
                                    <div className="flex items-end self-end justify-end mb-0.5">
                                        {nftData.rarityScore &&
                                            lowestRarityScore &&
                                            highestRarityScore && (
                                                <div className="flex items-end mr-1">
                                                    <p className="text-sm opacity-70 mr-0.5">
                                                        score
                                                    </p>
                                                    <p
                                                        className="text-xl font-black leading-tight text-transparent bg-clip-text"
                                                        style={{
                                                            backgroundImage:
                                                                rainbowGradient(
                                                                    nftData.rarityScore,
                                                                    highestRarityScore,
                                                                    lowestRarityScore
                                                                ),
                                                        }}
                                                    >
                                                        {nftData.rarityScore.toFixed(
                                                            2
                                                        )}
                                                    </p>
                                                </div>
                                            )}
                                        <div className="flex items-end">
                                            <p className="text-sm opacity-70 mr-0.5">
                                                rank
                                            </p>
                                            <p className="text-xl font-black leading-tight text-transparent bg-gradient-to-br from-blue-500 to-cyan-400 bg-clip-text">
                                                {nftData.rank
                                                    .toString()
                                                    .replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        ","
                                                    )}
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
                                                    score={attribute.score}
                                                    highestMeanPercentage={
                                                        highestMeanPercentage
                                                    }
                                                    lowestMeanPercentage={
                                                        lowestMeanPercentage
                                                    }
                                                    highestRarityScore={
                                                        highestRarityScore
                                                    }
                                                    lowestRarityScore={
                                                        lowestRarityScore
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
    score?: number;
    highestMeanPercentage?: number;
    lowestMeanPercentage?: number;
    highestRarityScore?: number;
    lowestRarityScore?: number;
}

function AnAttribute({
    traitType,
    value,
    percentage,
    score,
    highestMeanPercentage,
    lowestMeanPercentage,
    highestRarityScore,
    lowestRarityScore,
}: IAnAttribute) {
    return (
        <div className="flex flex-col items-center w-full">
            <p className="self-start pl-2 font-bold leading-tight">
                {traitType}
            </p>
            {score && lowestRarityScore && highestRarityScore && (
                <div className="flex justify-between w-11/12">
                    <p className="font-medium">{value}</p>
                    <p
                        className="text-lg font-black text-transparent bg-clip-text"
                        style={{
                            backgroundImage: rainbowGradient(
                                score,
                                highestRarityScore,
                                lowestRarityScore
                            ),
                        }}
                    >
                        {score.toFixed(2)}
                    </p>
                </div>
            )}
        </div>
    );
}
