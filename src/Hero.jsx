import React, {useState} from 'react';
import spiderman from "./assets/spiderManHomecoming.png";
import theMartian from "./assets/theMartian.png";
import wallE from "./assets/wallE.png";
import marioMovie from "./assets/theSuperMarioBrosMovie.png";
import infinityWar from "./assets/avengersInfinityWar.png";

function Hero() {
    const MOVIES = [
        {image: spiderman,
        title: "Spider-Man: Homecoming",
        studio: "Marvel Studios"},

        {image: theMartian,
        title: "The Martian",
        studio: "20th Century Fox"},

        {image: wallE,
        title: "WALL-E",
        studio: "Pixar"},

        {image: marioMovie,
        title: "The Super Mario Bros. Movie",
        studio: "Universal Pictures"},

        {image: infinityWar,
        title: "Avengers: Infinity War",
        studio: "Marvel Studios"}
    ];

    const [CURRENT_IMG_INDEX, setCurrentImageIndex] = useState(0);
    const [IS_DRAGGING, setIsDragging] = useState(false);
    const [START_X, setStartX] = useState(0);

    const goToSlide = (i) => setCurrentImageIndex(i)

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
        setIsDragging(true);
    };

    const handleTouchMove = (e) => {
        if (!IS_DRAGGING) return;
        const CURRENT_X = e.touches[0].clientX;
        const DIFF = START_X - CURRENT_X;

        if (DIFF > 50 && CURRENT_IMG_INDEX < MOVIES.length - 1) {
            setCurrentImageIndex(CURRENT_IMG_INDEX + 1);
            setIsDragging(false);
        } else if (DIFF < -50 && CURRENT_IMG_INDEX > 0) {
            setCurrentImageIndex(CURRENT_IMG_INDEX - 1);
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

        if (DIFF > 50 && CURRENT_IMG_INDEX < MOVIES.length - 1) {
            setCurrentImageIndex(CURRENT_IMG_INDEX + 1);
            setIsDragging(false);
        } else if (DIFF < -50 && CURRENT_IMG_INDEX > 0) {
            setCurrentImageIndex(CURRENT_IMG_INDEX - 1);
            setIsDragging(false);
        }
    };

    const handleMouseUp = () => setIsDragging(false);
    
    return (
        <>
            <div className="mt-[0.5rem] mx-[2rem] flex flex-col">
                <h1 className="text-base font-[550]">Trending Now</h1>
                <div className="relative mt-5 rounded-[2rem] overflow-hidden bg-black 
                h-[200px] select-none">
                    <div className="flex transition-transform duration-500 ease-in-out
                    h-full" 
                    style={{transform: `translateX(-${CURRENT_IMG_INDEX * 100}%)`}}
                    onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} 
                    onTouchEnd={handleTouchEnd} onMouseDown={handleMouseDown} 
                    onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}>
                        {MOVIES.map((movie, index) => (
                            <div key={index} className="w-full flex-shrink-0 relative">
                                <img className="w-full h-full object-cover opacity-50
                                pointer-events-none" src={movie.image} alt={movie.title}
                                draggable={false}/>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="text-sm font-[600]">{movie.title}</h3>
                                    <p className="text-xs text-slate-300 font-[600]
                                    mt-1">{movie.studio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex gap-2 mt-5 items-center justify-center">
                {MOVIES.map((_, i) => (
                    <div
                        key={i}
                        className={`w-2.5 h-2.5 rounded-[5rem] cursor-pointer ${
                            CURRENT_IMG_INDEX === i ? "bg-white" : "bg-slate-700"
                        }`}
                        onClick={() => goToSlide(i)}
                    ></div>
                ))}
            </div>
        </>
    );
}

export default Hero;