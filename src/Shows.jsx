import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const TMDB_API_KEY = "a185d00309246af13fc09d5674ea20ee";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";

function Shows() {
    const LINE_CLAMP2 = {
        overflow: "hidden",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 2,
        whiteSpace: "normal",
    };

    const SHOWS = [
        {id: 1396, type: "tv"},      // Breaking Bad
        {id: 2316, type: "tv"},      // The Office
        {id: 60625, type: "tv"},     // Rick and Morty
        {id: 82856, type: "tv"},     // The Mandalorian
        {id: 60059, type: "tv"},     // Better Call Saul
        {id: 37606, type: "tv"},     // The Amazing World of Gumball
        {id: 66732, type: "tv"},     // Stranger Things
        {id: 60572, type: "tv"},     // Pokemon
        {id: 387, type: "tv"},       // SpongeBob SquarePants
        {id: 2370, type: "tv"},      // Hell's Kitchen
        {id: 40075, type: "tv"},     // Gravity Falls
        {id: 456, type: "tv"},       // The Simpsons
        {id: 1668, type: "tv"},      // Friends
        {id: 607, type: "tv"},       // The Powerpuff Girls
        {id: 83867, type: "tv"},     // Andor
        {id: 93405, type: "tv"},     // Squid Game
    ];

    const [showData, setShowData] = useState([]);

    useEffect(() => {
        const fetchShows = async () => {
            try {
                const results = await Promise.all(
                    SHOWS.map(async ({id, type}) => {
                        const RES = await fetch(
                            `https://api.themoviedb.org/3/${type}/${id}?api_key=${TMDB_API_KEY}`
                        );
                        const DATA = await RES.json();
                        return {...DATA, type};
                    })
                );
                setShowData(results);
            } catch (err) {
                console.error("Failed to fetch shows:", err);
            }
        };

        fetchShows();
    });

    return (
        <section className="mt-[2.5rem] flex flex-col xl:mt-[3.5rem]">
            <h1 className="mx-[2rem] text-sm font-[650] md:text-base lg:text-lg 
            xl:text-xl xl:mb-[1rem] 2xl:ml-[3.4rem]">Shows</h1>
            <div className="ml-[2rem] flex gap-5 overflow-x-auto whitespace-nowrap 
            custom-scrollbar lg:gap-7 xl:gap-9 2xl:ml-[3.4rem]">
                {showData.map((movie) => (
                    <Link to={`/${movie.type}/${movie.id}`} key={movie.id} 
                    className="mt-[1rem] flex-shrink-0">
                        <div className="mb-[.5rem] w-[5rem] h-[7rem] bg-slate-800 
                        rounded-[1rem] overflow-hidden border-[#ffffff00] border-[2.5px]
                        hover:border-[#b71234] transition-colors duration-[.25s]
                        md:w-[6rem] md:h-[8.5rem] lg:w-[7rem] lg:h-[10rem] lg:mb-[.7rem] 
                        xl:mb-[1rem] xl:w-[8rem] xl:h-[12rem] 2xl:w-[9rem] 2xl:h-[13rem]">
                            {movie.poster_path ? (
                                <img src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`} 
                                alt={movie.title} className="w-full h-full object-cover" 
                                draggable="false"/>
                            ) : (
                                <div className="w-full h-full flex items-center 
                                justify-center text-xs text-slate-400 text-center p-1">
                                    No Poster
                                </div>
                            )}
                        </div>
                        <h3 style={LINE_CLAMP2} className="text-xs text-slate-400 
                        font-[600] mb-[.25rem] w-[5rem] md:w-[6rem] lg:w-[7rem] 
                        xl:w-[8rem] 2xl:w-[9rem] 2xl:text-sm">
                            {movie.title || movie.name}
                        </h3>
                        <p className="text-xs text-slate-600 font-[600] 2xl:text-sm">
                            {movie.vote_average?.toFixed(1) || "N/A"}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default Shows;
