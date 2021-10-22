import { GetServerSidePropsContext } from "next";
import { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import NFTPreview from "../../../components/NFT/NFTPreview";
import { INFT } from "../../../models/NFT";
import { SocialIcon } from "react-social-icons";
import CollectionController from "../../../components/Collection/CollectionController";

import "react-lazy-load-image-component/src/effects/opacity.css";

const PER_PAGE = 25;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const name = context.query.name;

    const res = await fetch(
        `${
            process.env.NEXT_PUBLIC_NODE_ENV === "development"
                ? "http://localhost:3000/"
                : process.env.NEXT_PUBLIC_PROD_URL
        }api/collections/${name}`
    );

    if (res.status === 200) {
        const resData = await res.json();

        if (resData) {
            console.log(resData);
            return {
                props: {
                    name: resData.name,
                    websiteURL: resData.websiteURL ? resData.websiteURL : null,
                    discordURL: resData.discordURL ? resData.discordURL : null,
                    twitterURL: resData.twitterURL ? resData.twitterURL : null,
                    totalSupply: resData.totalSupply
                        ? resData.totalSupply
                        : null,
                    highestMeanPercentage: resData.highestMeanPercentage
                        ? resData.highestMeanPercentage
                        : null,
                    lowestMeanPercentage: resData.lowestMeanPercentage
                        ? resData.lowestMeanPercentage
                        : null,
                    highestRarityScore: resData.highestRarityScore
                        ? resData.highestRarityScore
                        : null,
                    lowestRarityScore: resData.lowestRarityScore
                        ? resData.lowestRarityScore
                        : null,
                    contractAddress: resData.contractAddress
                        ? resData.contractAddress
                        : null,
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

interface ICollectionPage {
    name: string;
    websiteURL?: string;
    discordURL?: string;
    twitterURL?: string;
    totalSupply: number;
    highestMeanPercentage?: number;
    lowestMeanPercentage?: number;
    highestRarityScore?: number;
    lowestRarityScore?: number;
    contractAddress?: string;
}

export const CollectionContext = createContext<any>(null);

export default function Collections({
    name,
    websiteURL,
    discordURL,
    twitterURL,
    totalSupply,
    highestMeanPercentage,
    lowestMeanPercentage,
    highestRarityScore,
    lowestRarityScore,
    contractAddress,
}: ICollectionPage) {
    const [page, setPage] = useState(0);

    const [idFilter, setIdFilter] = useState<any>("");

    const [data, setData] = useState<Array<any>>([]);

    const [sort, setSort] = useState("rank");

    const [isReady, setIsReady] = useState(false);

    const [shouldReset, setShouldReset] = useState(false);

    async function fetchData() {
        const res = await fetch(
            `/api/collections/${name}/tokens?page=${page}&perPage=${PER_PAGE}&sort=${sort}&idFilter=${encodeURIComponent(
                idFilter
            )}`
        );

        if (res.status === 200) {
            const resData = await res.json();

            console.log(resData);
            if (shouldReset) {
                setData(resData);
                setShouldReset(false);
            } else {
                setData((oldData) => [...oldData, ...resData]);
            }
        }
    }

    useEffect(() => {
        setIsReady(true);
    }, []);

    useEffect(() => {
        fetchData();
    }, [page]);

    useEffect(() => {
        if (isReady) {
            setShouldReset(true);
        }
    }, [sort, idFilter, name]);

    useEffect(() => {
        if (isReady) {
            if (shouldReset) {
                if (page == 0) {
                    fetchData();
                } else {
                    setPage(0);
                }
            }
        }
    }, [shouldReset]);

    return (
        <CollectionContext.Provider
            value={{ idFilter, setIdFilter, sort, setSort }}
        >
            <div
                className="flex flex-col w-11/12 pt-12"
                style={{ minHeight: "calc(100vh - 64px" }}
            >
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                        {websiteURL ? (
                            <Link href={websiteURL}>
                                <a
                                    target="_blank"
                                    className="text-4xl font-extrabold transition-opacity duration-300 hover:opacity-70 dark:text-white"
                                >
                                    {name}
                                </a>
                            </Link>
                        ) : (
                            <h1 className="text-4xl font-extrabold transition-opacity duration-300 hover:opacity-70 dark:text-white">
                                {name}
                            </h1>
                        )}

                        <div className="flex items-center self-end mb-1">
                            {twitterURL && (
                                <SocialIcon
                                    url={twitterURL}
                                    target="_blank"
                                    network="twitter"
                                    fgColor="#FFFFFF"
                                    style={{ height: 30, width: 30 }}
                                    className="ml-4 mr-2 transition-opacity duration-300 hover:opacity-70"
                                />
                            )}
                            {discordURL && (
                                <SocialIcon
                                    url={discordURL}
                                    target="_blank"
                                    network="discord"
                                    fgColor="#FFFFFF"
                                    className="transition-opacity duration-300 hover:opacity-70"
                                    style={{ height: 30, width: 30 }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex items-end">
                        <p className="mr-1 text-white opacity-70">
                            total supply
                        </p>
                        <p className="text-3xl font-black leading-tight text-transparent bg-gradient-to-br from-blue-500 to-cyan-400 bg-clip-text">
                            {totalSupply
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </p>
                    </div>
                </div>

                <CollectionController />
                <div
                    className="grid gap-5"
                    style={{
                        gridTemplateColumns:
                            "repeat( auto-fill, minmax(200px, 1fr) )",
                    }}
                >
                    {data.map((nft: INFT) => (
                        <NFTPreview
                            contractAddress={contractAddress}
                            key={nft.name}
                            collectionName={name}
                            tokenName={nft.name}
                            tokenId={nft.tokenId}
                            rank={nft.rank}
                            externalURL={nft.externalURL}
                            image={nft.image}
                            blurHash={nft.blurHash}
                            attributes={nft.attributes}
                            meanPercentage={nft.meanPercentage}
                            rarityScore={nft.rarityScore}
                            highestMeanPercentage={highestMeanPercentage}
                            lowestMeanPercentage={lowestMeanPercentage}
                            highestRarityScore={highestRarityScore}
                            lowestRarityScore={lowestRarityScore}
                            totalSupply={totalSupply}
                        />
                    ))}
                </div>
                {page < Math.round(totalSupply / 25) && idFilter.length === 0 && (
                    <button
                        className="px-4 py-2 my-12 text-lg font-semibold text-black transition-opacity duration-300 bg-white rounded-lg hover:opacity-70"
                        onClick={async () => setPage(page + 1)}
                    >
                        load more
                    </button>
                )}
            </div>
        </CollectionContext.Provider>
    );
}

// interface IPage {
//     index: number;
//     name: string;
//     perPage: number;
// }

// function Page({ index, name, perPage }: IPage) {
//     const fetcher = (url: any) => fetch(url).then((res) => res.json());

//     const { data } = useSWR(
//         `/api/collections/${name}?page=${index}?perPage=${perPage}`,
//         fetcher
//     );

//     if (data) {
//         return ;
//     }
//     return null;
// }
