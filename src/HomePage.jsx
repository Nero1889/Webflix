import Header from "./Header.jsx";
import Hero from "./Hero.jsx";
import AnimatedMovies from "./AnimatedMovies.jsx";
import Category from "./Category.jsx";
import ActionMovies from "./ActionMovies.jsx";
import DramaMovies from "./DramaMovies.jsx";
import CrimeMovies from "./CrimeMovies.jsx";
import SciFiMovies from "./SciFiMovies.jsx";
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
            <CrimeMovies/>
            <SciFiMovies/>
            <Anime/>
            <DramaMovies/>
            <Shows/>
            <Footer/>
        </>
    );
}

export default HomePage;
