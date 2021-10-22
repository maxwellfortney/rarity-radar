import { useEffect, useState } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import CollectionPreview from "../../components/Collection/CollectionPreview";
import Loader from "../../components/Loader";

export default function Collections() {
    const [collections, setCollections] = useState([]);

    async function fetchCollections() {
        const res = await fetch(
            `/api/collections?maxDate=${new Date().getTime()}`
        );

        if (res.status === 200) {
            const data = await res.json();
            setCollections(data);
        }
    }

    useEffect(() => {
        fetchCollections();
    }, []);

    return (
        <div
            className="flex flex-col items-center w-11/12 mt-12"
            style={{ minHeight: "calc(100vh - 64px" }}
        >
            <h1 className="self-start mb-12 text-4xl font-extrabold dark:text-white">
                collections
            </h1>

            <SwitchTransition>
                <CSSTransition
                    key={collections.length}
                    timeout={300}
                    classNames="fade"
                >
                    {collections.length === 0 ? (
                        <Loader />
                    ) : (
                        <div
                            className="grid w-full gap-5"
                            style={{
                                gridTemplateColumns:
                                    "repeat(auto-fill, minmax(225px, 1fr) )",
                            }}
                        >
                            {collections.map((collection: any) => {
                                return (
                                    <CollectionPreview
                                        key={collection.name}
                                        collectionName={collection.name}
                                        totalSupply={collection.totalSupply}
                                        websiteURL={collection.websiteURL}
                                        twitterURL={collection.twitterURL}
                                        discordURL={collection.discordURL}
                                    />
                                );
                            })}
                        </div>
                    )}
                </CSSTransition>
            </SwitchTransition>
        </div>
    );
}
