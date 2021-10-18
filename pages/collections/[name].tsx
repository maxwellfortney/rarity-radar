import { GetServerSidePropsContext } from "next";
import { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import NFTPreview from "../../components/NFT/NFTPreview";
import { INFT } from "../../models/NFT";
import { SocialIcon } from "react-social-icons";
import CollectionController from "../../components/Collection/CollectionController";

import "react-lazy-load-image-component/src/effects/opacity.css";

const PER_PAGE = 25;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const name = context.query.name;

    const res = await fetch(
        `${
            process.env.NEXT_PUBLIC_NODE_ENV === "development"
                ? "http://localhost:3000/"
                : process.env.NEXT_PUBLIC_PROD_URL
        }api/collections/search/${name}`
    );

    if (res.status === 200) {
        const resData = (await res.json())[0];

        if (resData) {
            return {
                props: {
                    name: resData.name,
                    externalURL: resData.externalURL,
                    discordURL: resData.discordURL,
                    twitterURL: resData.twitterURL,
                    totalSupply: resData.totalSupply,
                    highestMeanPercentage: resData.highestMeanPercentage,
                    lowestMeanPercentage: resData.lowestMeanPercentage,
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
    externalURL: string;
    discordURL?: string;
    twitterURL?: string;
    totalSupply: number;
    highestMeanPercentage: number;
    lowestMeanPercentage: number;
}

export const CollectionContext = createContext<any>(null);

export default function Collections({
    name,
    externalURL,
    discordURL,
    twitterURL,
    totalSupply,
    highestMeanPercentage,
    lowestMeanPercentage,
}: ICollectionPage) {
    const [page, setPage] = useState(0);

    const [idFilter, setIdFilter] = useState<any>(null);

    const [data, setData] = useState<Array<any>>([]);

    const [sort, setSort] = useState("rank");

    const [isReady, setIsReady] = useState(false);

    const [shouldReset, setShouldReset] = useState(false);

    async function fetchData() {
        const res = await fetch(
            `/api/collections/${name}?page=${page}&perPage=${PER_PAGE}&sort=${sort}`
        );

        if (res.status === 200) {
            const resData = await res.json();

            if (shouldReset) {
                setData(resData);
                setShouldReset(false);
            } else {
                setData((oldData) => [...oldData, ...resData]);
            }
        }
    }

    async function searchById() {
        const res = await fetch(
            `/api/collections/${name}?idFilter=${idFilter}`
        );

        if (res.status === 200) {
            const resData = await res.json();

            setData(resData);
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
            console.log("Sort changed", sort);
            setShouldReset(true);
        }
    }, [sort]);

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

    useEffect(() => {
        console.log(idFilter);
        if (idFilter === NaN) {
            fetchData();
        } else if (idFilter !== null && idFilter !== undefined) {
            searchById();
        }
    }, [idFilter]);

    return (
        <CollectionContext.Provider
            value={{ idFilter, setIdFilter, sort, setSort }}
        >
            <div
                className="flex flex-col w-11/12 mt-12"
                style={{ minHeight: "calc(100vh - 64px" }}
            >
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                        <Link href={externalURL}>
                            <a
                                target="_blank"
                                className="text-4xl font-extrabold transition-opacity duration-300 hover:opacity-70 dark:text-white"
                            >
                                {name}
                            </a>
                        </Link>
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
                            "repeat( auto-fit, minmax(200px, 1fr) )",
                    }}
                >
                    {data.map((nft: INFT) => (
                        <NFTPreview
                            key={nft.name}
                            collectionName={name}
                            tokenName={nft.name}
                            rank={nft.rank}
                            externalURL={nft.externalURL}
                            image={nft.image}
                            attributes={nft.attributes}
                            meanPercentage={nft.meanPercentage}
                            highestMeanPercentage={highestMeanPercentage}
                            lowestMeanPercentage={lowestMeanPercentage}
                        />
                    ))}
                </div>
                {page < Math.round(totalSupply / 25) && idFilter === null && (
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
