import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { pageview } from "../libs/GA/gtag";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import MobileNavbar from "../components/Navbar/MobileNavbar/MobileNavbar";

function MyApp({ Component, pageProps, router }: AppProps) {
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            pageview(url, document.title);
        };
        router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, []);

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-gradient-to-tr dark:from-mainDark dark:to-slightDark">
            <div className="hidden w-full md:flex">
                <Navbar />
            </div>
            <div className="flex w-full md:hidden">
                <MobileNavbar />
            </div>
            <Component {...pageProps} />
            <Footer />
        </div>
    );
}
export default MyApp;
