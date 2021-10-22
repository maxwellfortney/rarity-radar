import Link from "next/link";

export default function About() {
    return (
        <div
            className="flex flex-col items-center w-11/12 mt-12 text-white"
            id="about"
        >
            <h2 className="self-start text-4xl font-extrabold ">about</h2>

            <div className="flex flex-col items-center w-11/12">
                <p className="mt-8 text-lg font-medium">
                    The primary goal of{" "}
                    <span className="font-black">Rarity Radar</span> is to
                    provide the most seamless, intuitve, and up-to-date platform
                    for crypto investors, creators, and enthusiasts to track the
                    rarity of their NFTs as well as upcoming NFTs.
                </p>
                <p className="mt-8 text-lg font-medium">
                    <span className="font-black">Rarity Radar</span> was founded
                    on the ideals of honesty, transparency, and openness. The
                    majority of our code is open-source, and can be viewed here.{" "}
                    <span className="font-black">Rarity Radar</span> only has
                    once source of income, {`"`}featured collections
                    {`"`}. If you would like to support the development
                    directly, you can donate to us{" "}
                    <Link href="/donate">
                        <a>here</a>
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
}
