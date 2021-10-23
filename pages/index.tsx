import About from "../components/About/About";
import Hero from "../components/Hero/Hero";
import Navbar from "../components/Navbar/Navbar";
import FeaturedCollections from "../components/FeaturedCollections/FeaturedCollections";

export default function Home() {
    return (
        <div className="flex flex-col items-center w-full animate-fadeAndRise">
            <Hero />
            <FeaturedCollections />
            <About />
        </div>
    );
}
