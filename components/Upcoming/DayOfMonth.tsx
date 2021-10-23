import { useState } from "react";
import { SocialIcon } from "react-social-icons";
import { monthNames, rainbowGradient } from "../../utils/client";
import Modal from "../Modal/Modal";

import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface IDayOfMonth {
    dayOfMonth: number;
    month: number;
    collections: Array<any>;
}

export default function DayOfMonth({
    dayOfMonth,
    month,
    collections,
}: IDayOfMonth) {
    function createDayString() {
        let ret = "";
        let now = new Date();

        if (month === now.getMonth()) {
            if (dayOfMonth === now.getDate()) {
                ret = "today";
            } else if (dayOfMonth == now.getDate() + 1) {
                ret = "tomorrow";
            } else {
                ret = dayOfMonth.toString();
            }
        } else {
            ret = dayOfMonth.toString();
        }

        return ret;
    }
    return (
        <div
            className="flex flex-col w-full px-2 py-1 bg-white"
            style={{ aspectRatio: "1" }}
        >
            <p
                className="w-full pb-1 text-2xl font-extrabold border-black"
                style={{ borderBottomWidth: "1px" }}
            >
                {createDayString()}
            </p>
            <div className="flex flex-col flex-1 w-full mt-1">
                {collections.map((collection) => {
                    return (
                        <AnUpcomingPreview
                            key={collection.name}
                            collection={collection}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function AnUpcomingPreview({ collection }: any) {
    const [modalOpen, setModalOpen] = useState(false);

    const date = new Date(collection.listDate);

    return (
        <>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <div
                    className={`z-10 p-4 flex flex-col justify-center rounded-lg overflow-hidden items-center w-full relative shadow-lg bg-white`}
                >
                    <div className="flex justify-between w-full">
                        <p className="self-start text-3xl font-black">
                            {collection.name}
                        </p>
                        <div className="flex items-end mb-1">
                            {collection.websiteURL && (
                                <Link href={collection.websiteURL}>
                                    <a
                                        className="flex items-center justify-center ml-2 text-white transition-opacity duration-300 bg-blue-500 rounded-full hover:opacity-70"
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                        }}
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </a>
                                </Link>
                            )}
                            {collection.twitterURL && (
                                <SocialIcon
                                    url={collection.twitterURL}
                                    target="_blank"
                                    network="twitter"
                                    fgColor="#FFFFFF"
                                    style={{ height: 30, width: 30 }}
                                    className="ml-2 transition-opacity duration-300 hover:opacity-70"
                                />
                            )}
                            {collection.discordURL && (
                                <SocialIcon
                                    url={collection.discordURL}
                                    target="_blank"
                                    network="discord"
                                    fgColor="#FFFFFF"
                                    className="ml-2 transition-opacity duration-300 hover:opacity-70"
                                    style={{ height: 30, width: 30 }}
                                />
                            )}
                        </div>
                    </div>
                    <p className="self-start mt-1 font-bold">
                        {monthNames[date.getMonth()]} {date.getDate()},{" "}
                        <span
                            className="font-bold text-transparent bg-clip-text"
                            style={{
                                backgroundImage: rainbowGradient(
                                    date.getHours() + date.getMinutes() / 60,
                                    0,
                                    24
                                ),
                            }}
                        >
                            {date.getHours()}:
                            {date.getMinutes().toString().padEnd(2, "0")}
                        </span>
                    </p>

                    {collection.previewImages && (
                        <div className="grid w-full grid-cols-2 mt-3">
                            {collection.previewImages.map((image: string) => {
                                return (
                                    <LazyLoadImage key={image} src={image} />
                                );
                            })}
                        </div>
                    )}
                </div>
            </Modal>
            <button
                onClick={() => setModalOpen(true)}
                key={collection.name}
                className="flex justify-between w-full px-1 transition-colors duration-300 rounded-md hover:bg-slightDark hover:text-white"
            >
                <p className="font-medium">{collection.name}</p>
                <p
                    className="font-bold text-transparent bg-clip-text"
                    style={{
                        backgroundImage: rainbowGradient(
                            date.getHours() + date.getMinutes() / 60,
                            0,
                            24
                        ),
                    }}
                >
                    {date.getHours()}:
                    {date.getMinutes().toString().padEnd(2, "0")}
                </p>
            </button>
        </>
    );
}
