import Header from "./Header.jsx";
import Hero from "./Hero.jsx";
import AnimatedMovies from "./AnimatedMovies.jsx";
import Category from "./Category.jsx";
import ActionMovies from "./ActionMovies.jsx";
import DramaMovies from "./DramaMovies.jsx";
import CrimeMovies from "./CrimeMovies.jsx";
import SciFiMovies from "./SciFiMovies.jsx";
import HorrorMovies from "./HorrorMovies.jsx";
import ComedyMovies from "./ComedyMovies.jsx";
import RomanceMovies from "./RomanceMovies.jsx";
import AdventureMovies from "./AdventureMovies.jsx";
import Anime from "./Anime.jsx";
import Shows from "./Shows.jsx";
import Footer from "./Footer.jsx";

function HomePage() {
    return (
        <>
            <Header/>
            <Hero/>
            <AnimatedMovies/>
            <Category/>
            <ActionMovies/>
            <DramaMovies/>
            <Shows/>
            <CrimeMovies/>
            <SciFiMovies/>
            <HorrorMovies/>
            <ComedyMovies/>
            <RomanceMovies/>
            <AdventureMovies/>
            <Anime/>
            <Footer/>
        </>
    );
}

export default HomePage;
