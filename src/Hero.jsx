import React, {useState} from "react";
import {Link} from "react-router-dom";
import spiderman from "./assets/spiderManHomecoming.png";
import theMartian from "./assets/theMartian.png";
import wallE from "./assets/wallE.png";
import marioMovie from "./assets/theSuperMarioBrosMovie.png";
import breakingBad from "./assets/breakingBad.png";

function Hero() {
    const MOVIES = [
        {image: spiderman,
        title: "Spider-Man: Homecoming",
        studio: "Marvel Studios",
        id: 315635,
        type: "movie"},

        {image: theMartian,
        title: "The Martian",
        studio: "20th Century Fox",
        id: 286217,
        type: "movie"},

        {image: wallE,
        title: "WALL-E",
        studio: "Disney · Pixar",
        id: 10681,
        type: "movie"},

        {image: breakingBad,
        title: "Breaking Bad",
        studio: "Sony Pictures",
        id: 1396,
        type: "tv"},

        {image: marioMovie,
        title: "The Super Mario Bros. Movie",
        studio: "Universal Pictures",
        id: 502356,
        type: "movie"},
    ];

    const [CURRENT_IMG_INDEX, setCurrentImageIndex] = useState(0);
    const [IS_DRAGGING, setIsDragging] = useState(false);
    const [START_X, setStartX] = useState(0);

    const goToSlide = (i) => setCurrentImageIndex(i);

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
        setIsDragging(true);
    };

    const handleTouchMove = (e) => {
        if (!IS_DRAGGING) return;
        const CURRENT_X = e.touches[0].clientX;
        const DIFF = START_X - CURRENT_X;

        if (Math.abs(DIFF) > 50) {
            if (DIFF > 0 && CURRENT_IMG_INDEX < MOVIES.length - 1) {
                setCurrentImageIndex(CURRENT_IMG_INDEX + 1);
            } else if (DIFF < 0 && CURRENT_IMG_INDEX > 0) {
                setCurrentImageIndex(CURRENT_IMG_INDEX - 1);
            }
            setIsDragging(false);
        }
    };

    const handleTouchEnd = () => setIsDragging(false);

    const handleMouseDown = (e) => {
        e.preventDefault();
        setStartX(e.clientX);
        setIsDragging(true);
    };

    const handleMouseMove = (e) => {
        if (!IS_DRAGGING) return;
        const CURRENT_X = e.clientX;
        const DIFF = START_X - CURRENT_X;

        if (Math.abs(DIFF) > 50) {
            if (DIFF > 0 && CURRENT_IMG_INDEX < MOVIES.length - 1) {
                setCurrentImageIndex(CURRENT_IMG_INDEX + 1);
            } else if (DIFF < 0 && CURRENT_IMG_INDEX > 0) {
                setCurrentImageIndex(CURRENT_IMG_INDEX - 1);
            }
            setIsDragging(false);
        }
    };

    const handleMouseUp = () => setIsDragging(false);
    const handleMouseLeave = () => {
        if (IS_DRAGGING) {
            setIsDragging(false);
        }
    };

    return (
        <>
            <div className="mt-[0.5rem] mx-[2rem] flex flex-col">
                <h1 className="text-base font-[650] md:text-lg">Trending Now</h1>
                <div className="relative mt-5 rounded-[2rem] overflow-hidden bg-black
                h-[12rem] select-none md:h-[18rem] lg:h-[25rem]">
                    <div className="flex transition-transform duration-500 ease-in-out
                    h-full"
                    style={{transform: `translateX(-${CURRENT_IMG_INDEX * 100}%)`}}
                    onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd} onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}>
                        {MOVIES.map((movie, i) => (
                            <Link key={i} to={`/${movie.type}/${movie.id}`}
                            className="w-full flex-shrink-0 relative block"
                            onClick={(e) => {if (IS_DRAGGING) e.preventDefault()}}>
                                <img className="w-full h-full object-cover opacity-50
                                pointer-events-none" src={movie.image} alt={movie.title}
                                draggable={false}/>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="text-sm font-[600] md:text-base 
                                    lg:text-lg 2xl:text-xl">{movie.title}</h3>
                                    <p className="text-xs text-slate-300 font-[600]
                                    mt-1 md:text-sm lg:text-base 2xl:text-lg">
                                        {movie.studio}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex gap-2 mt-5 items-center justify-center">
                {MOVIES.map((_, i) => {
                    const isActive = CURRENT_IMG_INDEX === i;
                    return (
                        <div key={i}
                        className={`w-2.5 h-2.5 rounded-[5rem] cursor-pointer
                        ${isActive ? "bg-white" : "bg-slate-700 hover:bg-slate-500"}`}
                        onClick={() => goToSlide(i)}></div>
                    );
                })}
            </div>
        </>
    );
}

export default Hero;
