export default function Hero() {
    return (
        <div
            className="flex flex-col items-center justify-center w-10/12"
            style={{ height: "calc(100vh - 64px" }}
        >
            <h1 className="py-2 text-6xl font-black text-transparent bg-gradient-to-br from-blue-500 to-cyan-400 bg-clip-text">
                Easily and elegantly check and track the rarity of any NTF.
            </h1>

            <button className="px-4 py-2 text-lg font-semibold text-black transition-opacity duration-300 bg-white rounded-lg hover:opacity-70 mt-14">
                view collections
            </button>
        </div>
    );
}