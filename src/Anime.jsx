import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const TMDB_API_KEY = "a185d00309246af13fc09d5674ea20ee";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";

function Anime() {
    const LINE_CLAMP2 = {
        overflow: "hidden",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 2,
        whiteSpace: "normal",
    };

    const ANIMES = [
        {id: 85937, type: "tv"},        // Demon Slayer: Kimetsu no Yaiba
        {id: 149, type: "movie"},       // Akira
        {id: 890, type: "tv"},          // Neon Genesis Evangelion
        {id: 69291, type: "tv"},        // Miss Kobayashi's Dragon Maid
        {id: 95479, type: "tv"},        // JUJUTSU KAISEN
        {id: 123876, type: "tv"},       // Komi Can't Communicate
        {id: 65930, type: "tv"},        // My Hero Academia
        {id: 1429, type: "tv"},         // Attack on Titan
        {id: 12971, type: "tv"},        // Dragon Ball Z
        {id: 120089, type: "tv"},       // SPY x FAMILY
        {id: 30984, type: "tv"},        // Bleach
        {id: 240411, type: "tv"},       // Dan Da Dan
        {id: 382190, type: "movie"},    // Pokemon the Movie: Volcanion and the Mechanical Marvel
        {id: 114410, type: "tv"},       // Chainsaw Man
        {id: 46260, type: "tv"},        // Naruto
        {id: 37854, type: "tv"},        // One Piece
    ];

    const [animesData, setAnimesData] = useState([]);

    useEffect(() => {
        const fetchAnimes = async () => {
            try {
                const RESULTS = await Promise.all(
                    ANIMES.map(async ({id, type}) => {
                        const RES = await fetch(
                            `https://api.themoviedb.org/3/${type}/${id}?api_key=${TMDB_API_KEY}`
                        );
                        const DATA = await RES.json();
                        return {...DATA, type};
                    })
                );
                setAnimesData(RESULTS);
            } catch (err) {
                console.error("Failed to fetch animes:", err);
            }
        };

        fetchAnimes();
    });

    return (
        <section className="mt-[2.5rem] flex flex-col">
            <h1 className="mx-[2rem] text-sm font-[650]">Anime</h1>
            <div className="ml-[2rem] flex gap-5 overflow-x-auto whitespace-nowrap scrollbar-hide">
                {animesData.map((movie) => (
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

export default Anime;
