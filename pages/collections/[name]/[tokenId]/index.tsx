/* eslint-disable @next/next/no-img-element */
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { rainbowGradient } from "../../../../utils/client";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const name = context.query.name;
    const tokenId = context.query.tokenId;

    const nftRes = await fetch(
        `${
            process.env.NEXT_PUBLIC_NODE_ENV === "development"
                ? "http://localhost:3000/"
                : process.env.NEXT_PUBLIC_PROD_URL
        }api/collections/${name}/tokens/${tokenId}`
    );

    if (nftRes.status === 200) {
        const nftData = await nftRes.json();

        const collectionRes = await fetch(
            `${
                process.env.NEXT_PUBLIC_NODE_ENV === "development"
                    ? "http://localhost:3000/"
                    : process.env.NEXT_PUBLIC_PROD_URL
            }api/collections/${name}`
        );

        if (collectionRes.status === 200) {
            const collectionData = await collectionRes.json();

            return {
                props: {
                    tokenName: nftData.name,
                    image: nftData.image,
                    blurHash: nftData.blurHash ? nftData.blurHash : null,
                    rank: nftData.rank ? nftData.rank : null,
                    attributes: nftData.attributes,
                    totalSupply: collectionData.totalSupply,
                    lowestRarityScore: collectionData.lowestRarityScore
                        ? collectionData.lowestRarityScore
                        : null,
                    highestRarityScore: collectionData.highestRarityScore
                        ? collectionData.highestRarityScore
                        : null,
                    rarityScore: nftData.rarityScore
                        ? nftData.rarityScore
                        : null,
                    meanPercentage: nftData.meanPercentage
                        ? nftData.meanPercentage
                        : null,
                },
            };
        } else {
            return {
                redirect: {
                    permanent: false,
                    destination: "/404",
                },
            };
        }
    } else {
        return {
            redirect: {
                permanent: false,
                destination: "/404",
            },
        };
    }
}

interface IFullNFTPage {
    tokenName: string;
    image: string;
    blurHash?: string;
    rank?: number;
    attributes: Array<any>;
    totalSupply: number;
    lowestRarityScore?: number;
    highestRarityScore?: number;
    rarityScore?: number;
    meanPercentage?: number;
}

export default function FullNFTPage({
    tokenName,
    image,
    blurHash,
    rank,
    attributes,
    totalSupply,
    lowestRarityScore,
    highestRarityScore,
    rarityScore,
    meanPercentage,
}: IFullNFTPage) {
    useEffect(() => {
        console.log(lowestRarityScore);
        console.log(highestRarityScore);
    }, []);
    return (
        <>
            <Head>
                <title>Rarity Radar - {tokenName}</title>
                <meta name="title" content={`Rarity Radar - ${tokenName}`} />
                {rank && rarityScore && meanPercentage && (
                    <>
                        <meta
                            name="description"
                            content={`Rank: ${rank
                                .toString()
                                .replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                )}\nRarity Score: ${rarityScore.toFixed(
                                2
                            )}\nMean Percentage: ${meanPercentage.toFixed(2)}%`}
                        />
                        <meta
                            property="og:description"
                            content={`Rank: ${rank
                                .toString()
                                .replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                )}\nRarity Score: ${rarityScore.toFixed(
                                2
                            )}\nMean Percentage: ${meanPercentage.toFixed(2)}%`}
                        />
                        <meta
                            property="twitter:description"
                            content={`Rank: ${rank
                                .toString()
                                .replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                )}\nRarity Score: ${rarityScore.toFixed(
                                2
                            )}\nMean Percentage: ${meanPercentage.toFixed(2)}%`}
                        />
                    </>
                )}

                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content={`Rarity Radar - ${tokenName}`}
                />
                <meta property="og:image" content={image} />

                <meta property="twitter:card" content="summary_large_image" />
                <meta
                    property="twitter:title"
                    content={`Rarity Radar - ${tokenName}`}
                />
                <meta property="twitter:image" content={image} />
            </Head>
            <div className="flex flex-col items-center flex-1 w-11/12 mt-12 dark:text-white animate-fadeIn">
                <div className="flex items-center justify-between w-full mb-10">
                    <h1 className="text-4xl font-extrabold ">{tokenName}</h1>
                    <div className="flex items-end">
                        {rarityScore && (
                            <>
                                <p className="mr-1 font-medium opacity-70">
                                    score
                                </p>
                                <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-cyan-400">
                                    {rarityScore
                                        .toFixed(2)
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </p>
                            </>
                        )}
                        {rank && (
                            <>
                                <p className="ml-2 mr-1 font-medium opacity-70">
                                    rank
                                </p>
                                <p
                                    className="text-4xl font-black text-transparent bg-clip-text"
                                    style={{
                                        backgroundImage: rainbowGradient(
                                            rank,
                                            1,
                                            totalSupply
                                        ),
                                    }}
                                >
                                    {rank
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </p>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex flex-col w-full md:flex-row">
                    <div className="flex items-center justify-center w-full p-2 md:p-7 2xl:p-10 md:w-1/2">
                        <img
                            className="rounded-xl max-w-[750px] w-full"
                            alt={tokenName}
                            src={image}
                        />
                    </div>
                    <div className="flex flex-col items-center justify-start w-full mt-10 md:w-1/2">
                        <h2 className="self-start text-3xl font-bold">
                            attributes
                        </h2>

                        <div className="flex flex-col items-center w-full mt-3">
                            {attributes.map((attribute) => {
                                return (
                                    <div
                                        key={`${attribute.traitType}-${attribute.value}`}
                                        className="flex flex-col items-center w-11/12"
                                    >
                                        <p className="self-start text-2xl font-black">
                                            {attribute.traitType}
                                        </p>
                                        <div className="flex items-center justify-between w-11/12">
                                            <p className="text-lg font-medium">
                                                {attribute.value}
                                            </p>
                                            <p className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-cyan-400">
                                                {attribute.score.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
