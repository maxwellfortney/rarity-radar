import { useContext, useEffect, useState } from "react";
import { rainbowGradient } from "../../utils/client";
import Loader from "../Loader";
import Modal from "../Modal/Modal";
import NFTFull from "./NFTFull";

import Link from "next/link";

import { LazyLoadImage } from "react-lazy-load-image-component";

import { Blurhash } from "react-blurhash";

var Web3 = require("web3");

import { OpenSeaPort, Network } from "opensea-js";
import { OrderSide } from "opensea-js/lib/types";

/* eslint-disable @next/next/no-img-element */
interface INFT {
    collectionName: string;
    tokenName: string;
    tokenId?: number;
    rank?: number;
    externalURL?: string;
    image: string;
    blurHash?: string;
    attributes: Array<any>;
    meanPercentage?: number;
    rarityScore?: number;
    highestMeanPercentage?: number;
    lowestMeanPercentage?: number;
    highestRarityScore?: number;
    lowestRarityScore?: number;
    contractAddress?: string;
    totalSupply: number;
}

export default function NFTPreview({
    collectionName,
    tokenName,
    tokenId,
    rank,
    externalURL,
    image,
    blurHash,
    attributes,
    meanPercentage,
    rarityScore,
    highestMeanPercentage,
    lowestMeanPercentage,
    highestRarityScore,
    lowestRarityScore,
    contractAddress,
    totalSupply,
}: INFT) {
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const [loadingOpenSea, setLoadingOpenSea] = useState(true);
    const [salePrice, setSalePrice] = useState(null);

    const provider = new Web3.providers.HttpProvider(
        "https://mainnet.infura.io"
    );

    const seaport = new OpenSeaPort(provider, {
        networkName: Network.Main,
    });

    async function toggleModal() {
        setShowModal(!showModal);
    }

    const imageLoaded = () => {
        setLoading(false);
    };

    async function fetchOpenSea() {
        // try {
        //     const openSeaRes = await fetch(
        //         `https://api.opensea.io/wyvern/v1/orders?asset_contract_address=${contractAddress}&bundled=false&include_bundled=false&include_invalid=false&token_id=${parseNameToTokenId(
        //             tokenName
        //         )}&side=1&limit=1&offset=0&order_by=created_date&order_direction=desc`
        //     );

        //     if (openSeaRes.status === 200) {
        //         const resData = await openSeaRes.json();

        //         console.log(resData);
        //         if (resData.orders.length === 1) {
        //             setSalePrice(
        //                 Web3.utils.fromWei(
        //                     resData.orders[0].base_price,
        //                     "ether"
        //                 )
        //             );
        //         }
        //     } else {
        //         console.log("Fetching opensea data failed");
        //     }
        // } catch (e) {}

        try {
            const { orders, count } = await seaport.api.getOrders({
                asset_contract_address: contractAddress,
                token_id: parseNameToTokenId(tokenName),
                side: OrderSide.Sell,
                limit: 1,
                bundled: false,
                include_invalid: false,
            });

            console.log(orders);

            if (orders.length === 1) {
                setSalePrice(
                    Web3.utils.fromWei(orders[0].basePrice.toString(), "ether")
                );
            }
        } catch (e) {
            console.log(e);
        }
    }

    function parseNameToTokenId(name: string) {
        if (name.indexOf("#") === -1) {
        } else {
            return name.substr(name.indexOf("#") + 1);
        }
    }

    useEffect(() => {
        if (contractAddress) {
            fetchOpenSea();
        }
        // console.log(parseNameToTokenId(tokenName));
    }, []);

    return (
        <>
            <Link href={`/collections/${collectionName}/${tokenId}`}>
                <a
                    style={{ maxWidth: "600px" }}
                    className="relative flex flex-col overflow-hidden duration-200 transform bg-white rounded-xl hover:scale-105"
                >
                    <div
                        onClick={toggleModal}
                        className="flex flex-col w-full h-full"
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
                                loading ? "flex" : "hidden"
                            } flex h-52 relative items-center justify-center w-full`}
                        >
                            {blurHash && (
                                <Blurhash
                                    hash={blurHash}
                                    width="100%"
                                    height="100%"
                                />
                            )}
                            <Loader
                                color={"border-slightDark"}
                                className="absolute z-10"
                                style={{
                                    left: "calc(50% - 10px)",
                                    borderTopColor: "transparent",
                                }}
                            />
                        </div>
                        <div className="flex flex-col items-center w-full p-1">
                            <p className="font-semibold my-0.5 self-start">
                                {tokenName}
                            </p>
                            <div className="flex items-end self-end justify-end w-full px-1">
                                {rarityScore &&
                                    lowestRarityScore &&
                                    highestRarityScore && (
                                        <div className="flex items-end mr-1">
                                            <p className="text-sm opacity-70 mr-0.5">
                                                score
                                            </p>
                                            <p className="text-lg font-black leading-tight text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-cyan-400">
                                                {rarityScore.toFixed(2)}
                                            </p>
                                        </div>
                                    )}
                                {rank && (
                                    <div className="flex items-end">
                                        <p className="text-sm opacity-70 mr-0.5">
                                            rank
                                        </p>
                                        <p
                                            className="text-lg font-black leading-tight text-transparent bg-clip-text"
                                            style={{
                                                backgroundImage:
                                                    rainbowGradient(
                                                        rank,
                                                        1,
                                                        totalSupply
                                                    ),
                                            }}
                                        >
                                            {rank
                                                .toString()
                                                .replace(
                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                    ","
                                                )}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {salePrice && (
                        <Link
                            href={`https://opensea.io/assets/${contractAddress}/${parseNameToTokenId(
                                tokenName
                            )}?ref=0xee61c516c9e4468e6f2c4eb53b8520adb68c0634`}
                        >
                            <a
                                target="_blank"
                                className="hover:opacity-70 transition-opacity duration-200 z-10 absolute items-center font-medium px-1 py-0.5 flex text-white text-sm bg-[#2081E2] rounded-lg top-1 right-1"
                            >
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 90 90"
                                    fill="none"
                                >
                                    <path
                                        d="M45 0C20.151 0 0 20.151 0 45C0 69.849 20.151 90 45 90C69.849 90 90 69.849 90 45C90 20.151 69.858 0 45 0ZM22.203 46.512L22.392 46.206L34.101 27.891C34.272 27.63 34.677 27.657 34.803 27.945C36.756 32.328 38.448 37.782 37.656 41.175C37.323 42.57 36.396 44.46 35.352 46.206C35.217 46.458 35.073 46.71 34.911 46.953C34.839 47.061 34.713 47.124 34.578 47.124H22.545C22.221 47.124 22.032 46.773 22.203 46.512ZM74.376 52.812C74.376 52.983 74.277 53.127 74.133 53.19C73.224 53.577 70.119 55.008 68.832 56.799C65.538 61.38 63.027 67.932 57.402 67.932H33.948C25.632 67.932 18.9 61.173 18.9 52.83V52.56C18.9 52.344 19.08 52.164 19.305 52.164H32.373C32.634 52.164 32.823 52.398 32.805 52.659C32.706 53.505 32.868 54.378 33.273 55.17C34.047 56.745 35.658 57.726 37.395 57.726H43.866V52.677H37.467C37.143 52.677 36.945 52.299 37.134 52.029C37.206 51.921 37.278 51.813 37.368 51.687C37.971 50.823 38.835 49.491 39.699 47.97C40.284 46.944 40.851 45.846 41.31 44.748C41.4 44.55 41.472 44.343 41.553 44.145C41.679 43.794 41.805 43.461 41.895 43.137C41.985 42.858 42.066 42.57 42.138 42.3C42.354 41.364 42.444 40.374 42.444 39.348C42.444 38.943 42.426 38.52 42.39 38.124C42.372 37.683 42.318 37.242 42.264 36.801C42.228 36.414 42.156 36.027 42.084 35.631C41.985 35.046 41.859 34.461 41.715 33.876L41.661 33.651C41.553 33.246 41.454 32.868 41.328 32.463C40.959 31.203 40.545 29.97 40.095 28.818C39.933 28.359 39.753 27.918 39.564 27.486C39.294 26.82 39.015 26.217 38.763 25.65C38.628 25.389 38.52 25.155 38.412 24.912C38.286 24.642 38.16 24.372 38.025 24.111C37.935 23.913 37.827 23.724 37.755 23.544L36.963 22.086C36.855 21.888 37.035 21.645 37.251 21.708L42.201 23.049H42.219C42.228 23.049 42.228 23.049 42.237 23.049L42.885 23.238L43.605 23.436L43.866 23.508V20.574C43.866 19.152 45 18 46.413 18C47.115 18 47.754 18.288 48.204 18.756C48.663 19.224 48.951 19.863 48.951 20.574V24.939L49.482 25.083C49.518 25.101 49.563 25.119 49.599 25.146C49.725 25.236 49.914 25.38 50.148 25.56C50.337 25.704 50.535 25.884 50.769 26.073C51.246 26.46 51.822 26.955 52.443 27.522C52.605 27.666 52.767 27.81 52.92 27.963C53.721 28.71 54.621 29.583 55.485 30.555C55.728 30.834 55.962 31.104 56.205 31.401C56.439 31.698 56.7 31.986 56.916 32.274C57.213 32.661 57.519 33.066 57.798 33.489C57.924 33.687 58.077 33.894 58.194 34.092C58.554 34.623 58.86 35.172 59.157 35.721C59.283 35.973 59.409 36.252 59.517 36.522C59.85 37.26 60.111 38.007 60.273 38.763C60.327 38.925 60.363 39.096 60.381 39.258V39.294C60.435 39.51 60.453 39.744 60.471 39.987C60.543 40.752 60.507 41.526 60.345 42.3C60.273 42.624 60.183 42.93 60.075 43.263C59.958 43.578 59.85 43.902 59.706 44.217C59.427 44.856 59.103 45.504 58.716 46.098C58.59 46.323 58.437 46.557 58.293 46.782C58.131 47.016 57.96 47.241 57.816 47.457C57.609 47.736 57.393 48.024 57.168 48.285C56.97 48.555 56.772 48.825 56.547 49.068C56.241 49.437 55.944 49.779 55.629 50.112C55.449 50.328 55.251 50.553 55.044 50.751C54.846 50.976 54.639 51.174 54.459 51.354C54.144 51.669 53.892 51.903 53.676 52.11L53.163 52.569C53.091 52.641 52.992 52.677 52.893 52.677H48.951V57.726H53.91C55.017 57.726 56.07 57.339 56.925 56.61C57.213 56.358 58.482 55.26 59.985 53.604C60.039 53.541 60.102 53.505 60.174 53.487L73.863 49.527C74.124 49.455 74.376 49.644 74.376 49.914V52.812V52.812Z"
                                        fill="white"
                                    />
                                </svg>

                                <p className="ml-1">
                                    {parseFloat(salePrice).toFixed(2)}
                                </p>
                            </a>
                        </Link>
                    )}
                </a>
            </Link>
        </>
    );
}
