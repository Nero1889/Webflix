import {useNavigate, useSearchParams} from "react-router-dom";
import React, {useState, useEffect} from "react";
import search from "./assets/search.png";
import back from "./assets/back.png";
import slateSearch from "./assets/searchBarMag.png";
import movie from "./assets/movie.png";
import actor from "./assets/actor.png";
import starRating from "./assets/starRating.png";
import warning from "./assets/warning.png";

const TMDB_API_KEY = "a185d00309246af13fc09d5674ea20ee";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";
const TMDB_SMALL_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w92";

function Results() {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [loadingSuggestions, setLoadingSuggestions] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("query");

    useEffect(() => {
        setSearchInput(searchQuery || "");
        setIsSearchOpen(false);

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
                const combinedFullResults = data.results
                .filter(item => ["movie", "tv", "person"].includes(item.media_type))
                .sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

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

    useEffect(() => {
        if (!searchInput.trim()) {
            setSuggestions([]);
            return;
        }

        setLoadingSuggestions(true);

        const delayDebounce = setTimeout(async () => {
            try {
                const response = await fetch(
                    `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchInput)}`
                );
                const data = await response.json();
                const filtered = data.results
                    .filter(item => ["movie", "tv", "person"].includes(item.media_type))
                    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
                    .slice(0, 5);
                setSuggestions(filtered);
            } catch (err) {
                console.error("Error fetching suggestions:", err);
                setSuggestions([]);
            } finally {
                setLoadingSuggestions(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [searchInput]);

    const handleItemClick = (item) => {
        let routePath;
        let passedState = { data: item };

        item.media_type === "person"
        ? routePath = `/actor/${item.id}`
        : routePath = `/${item.media_type}/${item.id}`;

        navigate(routePath, passedState);
    };

    const handleNewSearch = (e) => {
        if (e.key === "Enter" && searchInput.trim()) {
            setSuggestions([]);
            setIsSearchOpen(false);
            navigate(`/results?query=${encodeURIComponent(searchInput)}`);
        }
    };

    const handleSuggestionClick = (item) => {
        let routePath;
        const passedState = { data: item };

        item.media_type === "person"
        ? routePath = `/actor/${item.id}`
        : routePath = `/${item.media_type}/${item.id}`;
        
        navigate(routePath, passedState);
        setSuggestions([]);
        setIsSearchOpen(false);
    };

    const handleInputFocus = () => setIsInputFocused(true);
    const handleInputBlur = () => setTimeout(() => setIsInputFocused(false), 200);

    return (
        <div className="bg-slate-950 min-h-screen">
            <div className="flex items-center justify-between mt-[.5rem] p-5 sticky
            top-0 bg-slate-950 z-30 sm:mx-[1.5rem] lg:justify-start xl:mx-[3.5rem]
            2xl:mx-[5.5rem]">
                <button onClick={() => navigate(-1)} className="flex items-center">
                    <img src={back} alt="Back Icon" className="w-[2.5rem] h-[2.5rem]
                    mr-[1rem]" draggable="false"/>
                </button>

                {/* Desktop Search Bar */}
                <div className="relative lg:w-[24rem] h-[2.5rem] xl:w-[34rem] hidden lg:flex">
                    <img src={slateSearch} alt="Search Icon" className="w-[1.25rem]
                    h-[1.25rem] absolute left-3 top-1/2 transform -translate-y-1/2
                    pointer-events-none" draggable="false"/>
                    <input type="text" placeholder="Search!"
                    className={`w-full h-full pl-[2.5rem] pr-5 text-sm bg-slate-900
                    text-white placeholder:text-slate-500 focus:outline-none font-[550] ${
                        searchInput.length > 0 && suggestions.length > 0 && !loadingSuggestions && isInputFocused
                        ? "rounded-t-[1rem] rounded-b-none"
                        : "rounded-[2rem]"
                    }`}
                    value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleNewSearch} onFocus={handleInputFocus}
                    onBlur={handleInputBlur}/>

                    {searchInput.length > 0 && suggestions.length > 0 && !loadingSuggestions && isInputFocused && (
                        <ul className="absolute top-[2.2rem] left-0 w-full bg-slate-900
                        text-white mt-1 shadow-lg z-50 overflow-hidden"
                        style={{borderRadius: "0 0 1rem 1rem"}}>
                            {suggestions.map((item) => (
                                <li key={item.id} className="flex items-center gap-3 px-4
                                py-3 hover:bg-slate-800 cursor-pointer transition-colors
                                duration-200"
                                onMouseDown={() => handleSuggestionClick(item)}>
                                    {item.media_type === "person" ? (
                                        item.profile_path ? (
                                            <img src={`${TMDB_IMAGE_BASE_URL}${item.profile_path}`}
                                            alt={item.name} className="w-[2rem] h-[2rem]
                                            rounded-full object-cover"
                                            draggable="false"/>
                                        ) : (
                                            <img src={actor} alt="Actor" 
                                            className="w-[2rem] h-[2rem] rounded-full"
                                            draggable="false"/>
                                        )
                                    ) : (
                                        <img src={movie} alt="Movie"
                                        className="w-[1.25rem] h-[1.25rem]"
                                        draggable="false"/>
                                    )}
                                    <div>
                                        <p className="text-white font-[650] text-sm">
                                            {item.title || item.name}
                                        </p>
                                        <p className="text-slate-400 font-[550] text-xs">
                                            {item.media_type === "movie" &&
                                                `Movie (${item.release_date?.slice(0, 4) || "N/A"})`}
                                            {item.media_type === "tv" &&
                                                `TV Show (${item.first_air_date?.slice(0, 4) || "N/A"})`}
                                            {item.media_type === "person" && "Actor"}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button className="bg-[#b71234] p-2 rounded-full flex items-center
                justify-center mr-[.75rem] hover:bg-[#710033] transition-colors
                duration-[.25s] sm:mr-0 lg:hidden" onClick={() => setIsSearchOpen(true)}>
                    <img className="w-7 h-7" src={search} alt="Search Icon"
                    draggable="false"/>
                </button>
            </div>

            {/* Search Overlay - Mobile */}
            {isSearchOpen && (
                <div className="fixed inset-0 bg-slate-950 z-[100] overflow-y-auto 
                lg:hidden">
                    <div className="flex items-start mt-2 p-5 sticky top-0 bg-slate-950">
                        <button onClick={() => setIsSearchOpen(false)}
                        className="flex items-center">
                            <img src={back} alt="Back Icon" className="w-[2.5rem]
                            h-[2.5rem] p-1 mr-[1.25rem]"
                            draggable="false"/>
                        </button>
                        {/* Mobile Search Bar */}
                        <div className="relative flex-grow flex">
                            <span className="absolute inset-y-0 left-4 flex items-center
                            pointer-events-none">
                                <img src={slateSearch} alt="Slate Search Icon"
                                className="w-[1.25rem] h-[1.25rem]"/>
                            </span>
                            <input type="text" placeholder="Search!" className="w-full
                            h-[2.7rem] bg-slate-900 text-white pl-12 pr-4 rounded-[7rem]
                            placeholder:text-slate-500 font-[550] focus:outline-none
                            text-sm " autoFocus value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)} onKeyDown={handleNewSearch}/>
                        </div>
                    </div>

                    <div className="p-5 pt-0">
                        {loadingSuggestions && (
                            <div className="flex justify-center items-center mt-[5rem]">
                                <div className="w-[2.5rem] h-[2.5rem] border-4
                                border-slate-800 border-t-slate-300 rounded-full
                                animate-spin"></div>
                            </div>
                        )}
                        {error && (
                            <div className="flex flex-col items-center justify-center mt-[5rem]">
                                <img src={warning} alt="Warning Icon"
                                className="w-[5rem] h-[5rem]" draggable="false"/>
                                <p className="text-[#b71234] text-center font-[550]
                                mt-[1rem]">{error}</p>
                            </div>
                        )}

                        {searchInput.length > 0 && !loadingSuggestions && !error &&
                        suggestions.length > 0 && (
                            <ul className="text-white mt-4 space-y-3">
                                {suggestions.map((item) => (
                                    <li key={item.id} className="bg-slate-900 p-2
                                    rounded-[.5rem] flex items-center gap-5
                                    cursor-pointer hover:bg-slate-800 transition-colors
                                    duration-[.25s]"
                                    onClick={() => handleSuggestionClick(item)}>
                                        {item.media_type === "person" ? (
                                            item.profile_path ? (
                                                <img className="w-[3rem] h-[3rem]
                                                rounded-full object-cover ml-[.5rem]"
                                                src={`${TMDB_SMALL_IMAGE_BASE_URL}${item.profile_path}`}
                                                alt={item.name} draggable="false"/>
                                            ) : (
                                                <img className="w-[3rem] h-[3rem]
                                                rounded-full object-cover ml-[.5rem] p-1"
                                                src={actor} alt="Actor Icon"
                                                draggable="false"/>
                                            )
                                        ) : (
                                            <img className="w-[1.5rem] h-[1.5rem]
                                            ml-[.5rem]"
                                            src={movie} alt="Movie Icon"
                                            draggable="false"/>
                                        )}
                                        <div>
                                            <p className="text-white font-[650] text-base">
                                                {item.title || item.name}
                                            </p>
                                            <p className="text-slate-500 font-[550]
                                            text-sm">
                                                {item.media_type === "movie" && `Movie (${item.release_date ? item.release_date.substring(0, 4) : "N/A"})`}
                                                {item.media_type === "tv" && `TV Show (${item.first_air_date ? item.first_air_date.substring(0, 4) : "N/A"})`}
                                                {item.media_type === "person" && `Actor`}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {searchInput.length > 0 && !loadingSuggestions && !error &&
                        (suggestions.length === 0) && (
                            <p className="text-slate-500 text-center mt-[5rem] text-base
                            font-[550]">No results found!</p>
                        )}
                    </div>
                </div>
            )}

            {loading && (
                <div className="flex justify-center items-center mt-[5rem]">
                    <div className="w-[2.5rem] h-[2.5rem] border-4 border-slate-800
                    border-t-slate-300 rounded-full animate-spin"></div>
                </div>
            )}
            {error && (
                <p className="text-[#b71234] text-center mt-[5rem] p-4 mx-5 sm:mx-[3rem]
                xl:mx-[5rem] 2xl:mx-[7rem]">
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
                                        alt={item.name} className="w-full h-auto
                                        object-cover rounded-[1rem] mb-2"
                                        draggable="false"/>
                                    ) : (
                                        <div className="w-full h-[15rem] bg-slate-700
                                        rounded-[1rem] flex items-center justify-center
                                        mb-2">
                                            <img src={actor} alt="Actor Icon"
                                            className="w-[4rem] h-[4rem] p-2"/>
                                        </div>
                                    )
                                ) : item.poster_path ? (
                                    <img src={`${TMDB_IMAGE_BASE_URL}${item.poster_path}`}
                                    alt={item.title || item.name} className="w-full
                                    h-auto object-cover rounded-[1rem] mb-[.75rem]
                                    lg:rounded-[1.25rem]" draggable="false"/>
                                ) : (
                                    <div className="w-full h-[8.5rem] bg-slate-800
                                    rounded-[1rem] flex items-center justify-center mb-2
                                    flex-grow">
                                        <img src={movie} alt="Movie Icon"
                                        className="w-[4rem] h-[4rem] p-2"/>
                                    </div>
                                )}
                                <h3 className="line-clamp-3 text-sm font-[650]
                                text-center mb-[.25rem] sm:text-base 2xl:text-lg">
                                    {item.title || item.name}
                                </h3>
                                <p className="text-xs text-slate-400 text-center
                                flex-grow sm:text-sm 2xl:text-base">
                                    {item.media_type === "movie" &&
                                        `Movie (${item.release_date ? item.release_date.substring(0, 4) : "N/A"})`}
                                    {item.media_type === "tv" &&
                                        `TV Show (${item.first_air_date ? item.first_air_date.substring(0, 4) : "N/A"})`}
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
