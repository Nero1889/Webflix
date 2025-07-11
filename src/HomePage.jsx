import Header from "./Header.jsx";
import Hero from "./Hero.jsx";
import AnimatedMovies from "./AnimatedMovies.jsx";
import Category from "./Category.jsx";
import ActionMovies from "./ActionMovies.jsx";
import DramaMovies from "./DramaMovies.jsx";
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
            <Footer/>
        </>
    );
}

export default HomePage;
