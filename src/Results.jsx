import {useNavigate, useSearchParams} from "react-router-dom";
import React, {useState, useEffect} from "react";
import back from "./assets/back.png";
import slateSearch from "./assets/searchBarMag.png";
import movie from "./assets/movie.png";
import actor from "./assets/actor.png";
import starRating from "./assets/starRating.png";

const TMDB_API_KEY = "a185d00309246af13fc09d5674ea20ee";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";

function Results() {
    const LINE_CLAMP3 = {
        overflow: "hidden",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 3,
        whiteSpace: "normal",
    };

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("query");

    useEffect(() => {
        const fetchFullResults = async () => {
            if (!searchQuery) {
                setSearchResults([]);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchQuery)}`
                );

                if (!response.ok) throw new Error("Failed to fetch data!");
                
                const data = await response.json();
                const combinedFullResults = data.results.filter(item =>
                    item.media_type === "movie" || item.media_type === "tv" || item.media_type === "person"
                ).sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

                setSearchResults(combinedFullResults);

            } catch (err) {
                console.error(`Error fetching full search results: ${err}`);
                setError("Could not load full results!");
                setSearchResults([]);
            } finally {
                setLoading(false);
            }
        };

        fetchFullResults();
    }, [searchQuery]);

    const handleItemClick = (item) => {
        let routePath;
        let passedState = {data: item};

        item.media_type === "person"
        ? routePath = `/actor/${item.id}`
        : routePath = `/${item.media_type}/${item.id}`;
        
        navigate(routePath, passedState);
    };

    const handleNewSearch = (e) => {
        if (e.key === "Enter" && e.target.value.trim()) {
            navigate(`/results?query=${encodeURIComponent(e.target.value)}`);
        }
    };

    return (
        <div className="bg-slate-950 min-h-screen text-white">
            <div className="flex items-start mt-[.5rem] p-5 sticky top-0 bg-slate-950
            sm:mx-[1.5rem] xl:mx-[3.5rem] 2xl:mx-[5.5rem]">
                <button onClick={() => navigate(-1)} className="flex items-center">
                    <img src={back} alt="Back Icon" className="w-10 h-10 mr-5"
                    draggable="false"/>
                </button>
                {/* Results Search Bar */}
                <div className="relative flex-grow flex">
                    <span className="absolute inset-y-0 left-4 flex items-center
                    pointer-events-none">
                        <img src={slateSearch} alt="Slate Search Icon" 
                        className="w-[1.25rem] h-[1.25rem]"/>
                    </span>
                    <input type="text" placeholder="Search!" className="w-full h-[2.7rem]
                    bg-slate-900 text-white pl-[3rem] rounded-[7rem] 
                    focus:outline-none text-sm" defaultValue={searchQuery || ""}
                    onKeyDown={handleNewSearch}/>
                </div>
            </div>

            {loading && (
                <div className="flex justify-center items-center mt-20">
                    <div className="w-[2.5rem] h-[2.5rem] border-4 border-slate-800
                    border-t-slate-300 rounded-full animate-spin"></div>
                </div>
            )}
            {error && (
                <p className="text-[#b71234] text-center mt-4 p-4 border-rose-600
                border-[2px] mx-5 sm:mx-[3rem] xl:mx-[5rem] 2xl:mx-[7rem] rounded-md">
                    {error}
                </p>
            )}
            {searchResults.length > 0 && (
                <>
                    <h1 className="text-slate-500 text-sm font-[650] mb-[1rem] ml-[2rem]
                    sm:ml-[3rem] sm:text-base lg:text-lg xl:ml-[5rem] 2xl:ml-[7rem]">
                        Search Results For: 
                        <span className="text-slate-300 ml-[.35rem]">{searchQuery}</span>
                    </h1>
                    <div className="grid grid-cols-2 mx-[2rem] sm:grid-cols-3
                    sm:mx-[3rem] md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-4
                    xl:mx-[5rem] 2xl:mx-[7rem] pb-8">
                        {searchResults.map((item) => (
                            <div key={item.id} onClick={() => handleItemClick(item)}
                                className="p-3 bg-slate-900 rounded-[1rem] flex flex-col
                                items-center hover:bg-slate-800 transition-colors 
                                duration-[.25s] cursor-pointer">
                                {item.media_type === "person" ? (
                                    item.profile_path ? (
                                        <img src={`${TMDB_IMAGE_BASE_URL}${item.profile_path}`}
                                        alt={item.name}
                                        className="w-full h-auto object-cover
                                        rounded-[2rem] mb-2 md:rounded-[4rem]"
                                        draggable="false"/>
                                    ) : (
                                        <div className="w-full h-[15rem] bg-slate-700
                                        rounded-md flex items-center justify-center mb-2">
                                            <img src={actor} alt="Actor Icon"
                                            className="w-16 h-16 p-2"/>
                                        </div>
                                    )
                                ) : (
                                    item.poster_path ? (
                                        <img src={`${TMDB_IMAGE_BASE_URL}${item.poster_path}`} 
                                        alt={item.title || item.name}
                                        className="w-full h-auto object-cover
                                        rounded-[1rem] mb-[.75rem] lg:rounded-[1.25rem]"
                                        draggable="false"/>
                                    ) : (
                                        <div className="w-full h-[8.5rem] bg-slate-800 
                                        rounded-[1rem] flex items-center justify-center mb-2 
                                        flex-grow">
                                            <img src={movie} alt="Movie Icon" 
                                            className="w-16 h-16 p-2"/>
                                        </div>
                                    )
                                )}
                                <h3 className="text-sm font-[650] text-center mb-[.25rem]
                                sm:text-base 2xl:text-lg" style={LINE_CLAMP3}>
                                    {item.title || item.name}
                                </h3>
                                <p className="text-xs text-slate-400 text-center 
                                flex-grow sm:text-sm 2xl:text-base">
                                    {item.media_type === "movie" && `Movie (${item.release_date ? item.release_date.substring(0, 4) : "N/A"})`}
                                    {item.media_type === "tv" && `TV Show (${item.first_air_date ? item.first_air_date.substring(0, 4) : "N/A"})`}
                                    {item.media_type === "person" && `Actor`}
                                </p>
                                {item.vote_average > 0 && item.media_type !== "person" && (
                                    <div className="flex items-center gap-1 mt-[.5rem]">
                                        <img src={starRating} alt="Star icon" 
                                        className="w-[1rem] h-[1rem]" draggable="false"/>
                                        <span className="text-xs text-white font-[550]
                                        md:text-sm 2xl:text-base">
                                            {item.vote_average.toFixed(1)}
                                        </span>
                                        <span className="text-xs text-slate-400
                                        md:text-sm 2xl:text-base">/ 10</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
            {searchResults.length === 0 && !loading && !error && searchQuery && (
                <p className="text-slate-500 text-center mt-[5rem] text-base font-[550]">
                    No results found!
                </p>
            )}
        </div>
    );
}

export default Results;
