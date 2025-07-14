import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const TMDB_API_KEY = "a185d00309246af13fc09d5674ea20ee";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";

function AnimatedMovies() {
    const LINE_CLAMP2 = {
        overflow: "hidden",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 2,
        whiteSpace: "normal",
    };

    const MOVIES = [
        {id: 9479, type: "movie"},      // The Nightmare Before Christmas
        {id: 872585, type: "movie"},    // Oppenheimer
        {id: 93405, type: "tv"},        // Squid Game
        {id: 1396, type: "tv"},         // Breaking Bad
        {id: 597, type: "movie"},       // Titanic
        {id: 98, type: "movie"},        // Gladiator
        {id: 475557, type: "movie"},    // Joker
        {id: 66732, type: "tv"},        // Stranger Things
        {id: 14161, type: "movie"},     // 2012
        {id: 49026, type: "movie"},     // The Dark Knight Rises
        {id: 1417, type: "tv"},         // Glee
        {id: 84892, type: "movie"},     // The Perks of Being a Wallflower
        {id: 238, type: "movie"},       // The Godfather
        {id: 216015, type: "movie"},    // Fifty Shades of Grey
        {id: 496243, type: "movie"},    // Parasite
        {id: 4057, type: "tv"},         // Criminal Minds
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
                console.error("Failed to fetch movies:", err);
            }
        };

        fetchMovies();
    });

    return (
        <section className="mt-[2.5rem] flex flex-col">
            <h1 className="mx-[2rem] text-sm font-[650]">Drama Movies</h1>
            <div className="ml-[2rem] flex gap-5 overflow-x-auto whitespace-nowrap scrollbar-hide">
                {moviesData.map((movie) => (
                    <Link to={`/${movie.type}/${movie.id}`} key={movie.id} 
                    className="mt-[1rem] flex-shrink-0">
                        <div className="mb-[.5rem] w-[5rem] h-[7rem] bg-slate-800 rounded-[1rem] overflow-hidden
                        border-[#ffffff00] border-[2.5px] hover:border-[#b71234] transition-colors duration-[.25s]">
                            {movie.poster_path ? (
                                <img src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`} 
                                alt={movie.title} className="w-full h-full object-cover" 
                                draggable="false"/>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 text-center p-1">
                                    No Poster
                                </div>
                            )}
                        </div>
                        <h3 style={LINE_CLAMP2} className="text-xs text-slate-400 font-[600] mb-[.25rem] w-[5rem]">
                            {movie.title || movie.name}
                        </h3>
                        <p className="text-xs text-slate-600 font-[600]">
                            {movie.vote_average?.toFixed(1) || "N/A"}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default AnimatedMovies;
