import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { SocialIcon } from "react-social-icons";
import Loader from "../Loader";

import Link from "next/link";

interface ICollectionPreview {
    collectionName: string;
    totalSupply: number;
    websiteURL?: string;
    twitterURL?: string;
    discordURL?: string;
}

export default function CollectionPreview({
    collectionName,
    totalSupply,
    websiteURL,
    twitterURL,
    discordURL,
}: ICollectionPreview) {
    const [loadingNFT, setLoadingNFT] = useState(true);
    const [loadingImage, setLoadingImage] = useState(true);
    const [nft, setNFT] = useState<any>(null);

    async function fetchAnNFT() {
        const res = await fetch(
            `/api/collections/${collectionName}/tokens?perPage=1`
        );

        if (res.status === 200) {
            const resData = await res.json();
            setNFT(resData[0]);
            console.log(resData);
            setLoadingNFT(false);
        }
    }

    const imageLoaded = () => {
        setLoadingImage(false);
    };

    useEffect(() => {
        fetchAnNFT();
    }, []);

    return (
        <Link href={`/collections/${collectionName}`}>
            <a className="flex flex-col items-center w-full overflow-hidden duration-300 transform bg-white rounded-lg shadow-md hover:scale-105">
                <LazyLoadImage
                    className={`w-full shadow-md rounded-b-xl ${
                        loadingImage ? "hidden" : "block"
                    }`}
                    src={nft ? nft.image : undefined}
                    alt={nft ? nft.name : undefined}
                    afterLoad={imageLoaded}
                    effect="opacity"
                />
                <div
                    className={`${
                        loadingImage ? "block" : "hidden"
                    } h-56 flex items-center justify-center w-full`}
                >
                    <Loader color={"border-slightDark"} />
                </div>

                <div className="flex flex-col w-full px-2 py-1">
                    <p className="mb-1 text-lg font-extrabold">
                        {collectionName}
                    </p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            {twitterURL && (
                                <SocialIcon
                                    url={twitterURL}
                                    target="_blank"
                                    network="twitter"
                                    fgColor="#FFFFFF"
                                    style={{ height: 30, width: 30 }}
                                    className="transition-opacity duration-300 hover:opacity-70"
                                />
                            )}
                            {discordURL && (
                                <SocialIcon
                                    url={discordURL}
                                    target="_blank"
                                    network="discord"
                                    fgColor="#FFFFFF"
                                    className="ml-1 transition-opacity duration-300 hover:opacity-70"
                                    style={{ height: 30, width: 30 }}
                                />
                            )}
                        </div>
                        <div className="flex items-center font-medium">
                            <p className="mr-1 text-sm">total supply</p>
                            <p className="text-lg font-black text-transparent bg-gradient-to-br from-blue-500 to-cyan-400 bg-clip-text">
                                {totalSupply
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </p>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    );
}
