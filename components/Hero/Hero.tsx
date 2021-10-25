import Link from "next/link";

export default function Hero() {
    return (
        <div
            className="flex flex-col items-center justify-center w-10/12"
            style={{ minHeight: "calc(100vh - 64px" }}
        >
            <h1 className="py-2 text-6xl font-black text-center text-transparent 2xl:text-8xl md:text-7xl bg-gradient-to-br from-blue-500 to-cyan-400 bg-clip-text">
                Easily track the rarity of any NTF.
            </h1>

            <Link href="/collections">
                <a className="px-4 py-2 text-lg font-semibold text-white transition-opacity duration-300 rounded-lg shadow-md dark:text-black bg-moreLight dark:bg-white hover:opacity-70 mt-14">
                    view collections
                </a>
            </Link>
        </div>
    );
}
