import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const TMDB_API_KEY = "a185d00309246af13fc09d5674ea20ee";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";

function Horror() {
    const LINE_CLAMP2 = {
        overflow: "hidden",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 2,
        whiteSpace: "normal",
    };

    const MOVIES = [
        {id: 574475, type: "movie"},    // Final Destination Bloodlines
        {id: 940721, type: "movie"},    // Godzilla Minus One
        {id: 507089, type: "movie"},    // Five Nights at Freddy's
        {id: 4488, type: "movie"},      // Friday the 13th
        {id: 578, type: "movie"},       // Jaws
        {id: 4232, type: "movie"},      // Scream
        {id: 1034541, type: "movie"},   // Terrifier 3
        {id: 694, type: "movie"},       // The Shining
        {id: 917496, type: "movie"},    // Beetlejuice
        {id: 138843, type: "movie"},    // The Conjuring
        {id: 176, type: "movie"},       // Saw
        {id: 1091, type: "movie"},      // The Thing
        {id: 609, type: "movie"},       // Poltergeist
        {id: 346364, type: "movie"},    // It
        {id: 9373, type: "movie"},      // The Texas Chainsaw Massacre
        {id: 424139, type: "movie"},    // Halloween
    ];

    const [moviesData, setMoviesData] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const RESULTS = await Promise.all(
                    MOVIES.map(async ({id, type}) => {
                        const RES = await fetch(
                            `https://api.themoviedb.org/3/${type}/${id}?api_key=${TMDB_API_KEY}`
                        );
                        const DATA = await RES.json();
                        return {...DATA, type};
                    })
                );
                setMoviesData(RESULTS);
            } catch (err) {
                console.error("Failed to fetch animated movies:", err);
            }
        };

        fetchMovies();
    });

    return (
        <section className="mt-[2.5rem] flex flex-col xl:mt-[3.5rem]">
            <h1 className="mx-[2rem] text-sm font-[650] md:text-base lg:text-lg 
            xl:text-xl xl:mb-[1rem] 2xl:ml-[3.4rem]">Horror</h1>
            <div className="ml-[2rem] flex gap-5 overflow-x-auto whitespace-nowrap 
            custom-scrollbar lg:gap-7 xl:gap-9 2xl:ml-[3.4rem]">
                {moviesData.map((movie) => (
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

export default Horror;
