import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const TMDB_API_KEY = "a185d00309246af13fc09d5674ea20ee";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";

function SciFiMovies() {
    const LINE_CLAMP2 = {
        overflow: "hidden",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 2,
        whiteSpace: "normal",
    };

    const MOVIES = [
        {id: 181808, type: "movie"},    // Star Wars: The Last Jedi
        {id: 62, type: "movie"},        // 2001: A Space Odyssey
        {id: 1891, type: "movie"},      // The Empire Strikes Back
        {id: 603, type: "movie"},       // The Matrix
        {id: 218, type: "movie"},       // The Terminator
        {id: 1895, type: "movie"},      // Star Wars: Episode III - Revenge of the Sith
        {id: 348, type: "movie"},       // Alien
        {id: 1858, type: "movie"},      // Transformers
        {id: 157336, type: "movie"},    // Interstellar
        {id: 49047, type: "movie"},     // Gravity
        {id: 11, type: "movie"},        // Star Wars
        {id: 286217, type: "movie"},    // The Martian
        {id: 1726, type: "movie"},      // Iron Man
        {id: 99861, type: "movie"},     // Avengers: Age of Ultron
        {id: 68726, type: "movie"},     // Pacific Rim
        {id: 693134, type: "movie"},    // Dune: Part Two
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
            <h1 className="mx-[2rem] text-sm font-[650]">Science Fiction</h1>
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

export default SciFiMovies;
