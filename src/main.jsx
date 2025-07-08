import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./style.css";
import Header from "./Header.jsx";
import Hero from "./Hero.jsx";
import AnimatedMovies from "./AnimatedMovies.jsx";
import Footer from "./Footer.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Header/>
        <Hero/>
        <AnimatedMovies/>
        <AnimatedMovies/>
        <AnimatedMovies/>
        <Footer/>
    </StrictMode>,
);
