import Hero from "../components/Hero/Hero";
import Navbar from "../components/Navbar/Navbar";
import PopularCollections from "../components/PopularCollections/PopularCollections";

export default function Home() {
    return (
        <div className="flex flex-col items-center w-full animate-fadeAndRise">
            <Hero />
            <PopularCollections />
        </div>
    );
}
