import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className="flex flex-col w-full min-h-screen bg-gradient-to-tr dark:from-mainDark dark:to-slightDark">
            <Component {...pageProps} />
        </div>
    );
}
export default MyApp;
