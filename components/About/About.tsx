import Link from "next/link";

export default function About() {
    return (
        <div
            className="flex flex-col items-center w-11/12 mt-12 text-white"
            id="about"
        >
            <h2 className="self-start text-4xl font-extrabold ">about</h2>

            <div className="flex flex-col items-start w-11/12">
                <p className="mt-8 text-lg font-medium">
                    The primary goal of{" "}
                    <span className="font-black">Rarity Radar</span> is to
                    provide the most seamless, intuitve, and up-to-date platform
                    for crypto investors, creators, and enthusiasts to track the
                    rarity of any NFT.
                </p>

                <p className="mt-8 text-lg font-medium">
                    <span className="font-black">Rarity Radar</span> was founded
                    on the ideals of honesty, transparency, and openness. The
                    majority of our code is open-source, and can be viewed on{" "}
                    <Link href="https://github.com/maxwellfortney/rarity-radar">
                        <a
                            target="_blank"
                            className="font-black text-transparent transition-opacity duration-300 hover:opacity-70 bg-clip-text bg-gradient-to-br from-blue-500 to-cyan-400"
                        >
                            Github
                        </a>
                    </Link>
                    . <span className="font-black">Rarity Radar</span> only has
                    once source of revenue, {`"`}featured collections
                    {`"`}. If you would like to support the development
                    directly, you can{" "}
                    <Link href="/donate">
                        <a
                            target="_blank"
                            className="font-black text-transparent transition-opacity duration-300 hover:opacity-70 bg-clip-text bg-gradient-to-br from-blue-500 to-cyan-400"
                        >
                            donate to us
                        </a>
                    </Link>
                    . If you can{"'"}t support us financially, but want to give
                    us hand, please follow us on social media, the links are
                    below. Oh, and why not tell a friend :)
                </p>

                <p className="mt-8 text-lg font-medium">
                    <span className="font-black">Rarity Radar</span> primarily
                    uses a trait normalized rarity score to calculate the rank
                    of every individual NFT. There really is no perfect method
                    to calculate the rarity of an NFT, as this can sometimes be
                    subjective; however we feel we provide a thorough analysis
                    with detailed analytics in order to provide our users with
                    the highest chance of finding that <span>💎</span> in the
                    rough.
                </p>
            </div>
        </div>
    );
}
