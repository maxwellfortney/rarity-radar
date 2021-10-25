import Link from "next/link";
import { SocialIcon } from "react-social-icons";

export default function Footer() {
    return (
        <div className="flex flex-col items-center w-full px-6 pt-10 pb-2 dark:text-white">
            {/* <div className="flex items-center justify-between w-full">
                <Link href="/">
                    <a className="relative text-6xl font-black transition-opacity duration-300 hover:opacity-70 radarAnimation">
                        Rarity Radar
                    </a>
                </Link>

            </div> */}
            <div className="flex items-center">
                <SocialIcon
                    url="https://twitter.com/NFTRarityRadar"
                    target="_blank"
                    network="twitter"
                    fgColor="#FFFFFF"
                    style={{ height: 45, width: 45 }}
                    className="ml-4 mr-2 transition-opacity duration-300 hover:opacity-70"
                />
                <SocialIcon
                    url="https://discord.gg/FY2TyqYGp7"
                    target="_blank"
                    network="discord"
                    fgColor="#FFFFFF"
                    className="transition-opacity duration-300 hover:opacity-70"
                    style={{ height: 45, width: 45 }}
                />
            </div>
            <p className="mt-4 font-medium text-center">
                created by{" "}
                <Link href="https://github.com/maxwellfortney">
                    <a
                        target="_blank"
                        className="font-black text-transparent transition-opacity duration-300 hover:opacity-70 bg-gradient-to-br from-blue-500 to-cyan-400 bg-clip-text"
                    >
                        Maxwell Fortney
                    </a>
                </Link>{" "}
                and{" "}
                <Link href="https://github.com/bryan-eastwood">
                    <a
                        target="_blank"
                        className="font-black text-transparent transition-opacity duration-300 hover:opacity-70 bg-gradient-to-br from-blue-500 to-cyan-400 bg-clip-text"
                    >
                        Bryan Eastwood
                    </a>
                </Link>
            </p>
        </div>
    );
}
