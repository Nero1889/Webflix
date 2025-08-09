import {useNavigate, useSearchParams} from "react-router-dom";
import React, {useState, useEffect} from "react";
import SearchBar from "./SearchBar";
import back from "./assets/back.png";
import search from "./assets/search.png";
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

    const [instantSuggestions, setInstantSuggestions] = useState([]);
    const [loadingInstantSuggestions, setLoadingInstantSuggestions] = useState(false);
    const [instantSearchError, setInstantSearchError] = useState(null);

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("query");

    useEffect(() => {
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

    const handleInstantSearch = (results, searchError, isLoading) => {
        setInstantSuggestions(results);
        setInstantSearchError(searchError);
        setLoadingInstantSuggestions(isLoading);
    };

    const handleItemClick = (item) => {
        let routePath;
        let passedState = {data: item};

        item.media_type === "person"
        ? routePath = `/actor/${item.id}`
        : routePath = `/${item.media_type}/${item.id}`;

        navigate(routePath, { state: passedState });
    };

    const handleSuggestionClick = (item) => {
        let routePath;
        const passedState = { data: item };

        item.media_type === "person"
        ? routePath = `/actor/${item.id}`
        : routePath = `/${item.media_type}/${item.id}`;
        
        navigate(routePath, { state: passedState });
        setInstantSuggestions([]);
        setIsSearchOpen(false);
    };

    return (
        <div className="bg-slate-950 min-h-screen">
            <div className="flex items-center justify-between mt-[.5rem] p-5 sticky
            top-0 bg-slate-950 z-30 sm:mx-[1.5rem] lg:justify-start xl:mx-[3.5rem]
            2xl:mx-[5.5rem]">
                <button onClick={() => navigate(-1)} className="flex items-center">
                    <img src={back} alt="Back Icon" className="w-[2.5rem] h-[2.5rem]
                    mr-[1rem] cursor-pointer" draggable="false"/>
                </button>
                <div className="relative lg:w-[24rem] h-[2.5rem] xl:w-[34rem] hidden lg:flex">
                    <SearchBar onSearch={handleInstantSearch} isMobile={false}/>
                    {instantSuggestions.length > 0 && !loadingInstantSuggestions && (
                        <ul className="absolute top-[2.2rem] left-0 w-full bg-slate-900
                        text-white mt-1 shadow-lg z-50 overflow-hidden"
                        style={{borderRadius: "0 0 1rem 1rem"}}>
                            {instantSuggestions.map((item) => (
                                <li key={item.id} className="flex items-center gap-3 px-4
                                py-3 hover:bg-slate-800 cursor-pointer transition-colors
                                duration-[.25s]"
                                onClick={() => handleSuggestionClick(item)}>
                                    {item.media_type === "person" ? (
                                        item.profile_path ? (
                                            <img src={`${TMDB_SMALL_IMAGE_BASE_URL}${item.profile_path}`}
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
                                            {item.media_type === "movie" && `Movie (${item.release_date ? item.release_date.slice(0, 4) : "N/A"})`}
                                            {item.media_type === "tv" && `TV Show (${item.first_air_date ? item.first_air_date.slice(0, 4) : "N/A"})`}
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
                duration-[.25s] sm:mr-0 lg:hidden cursor-pointer"
                onClick={() => setIsSearchOpen(true)}>
                    <img className="w-7 h-7" src={search} alt="Search Icon" draggable="false"/>
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
                            h-[2.5rem] p-1 mr-[1.25rem] cursor-pointer"
                            draggable="false"/>
                        </button>
                        <SearchBar onSearch={handleInstantSearch} isMobile={true}/>
                    </div>
                    <div className="p-5 pt-0">
                        {loadingInstantSuggestions && (
                            <div className="flex justify-center items-center mt-[5rem]">
                                <div className="w-[2.5rem] h-[2.5rem] border-4
                                border-slate-800 border-t-slate-300 rounded-full
                                animate-spin"></div>
                            </div>
                        )}
                        {instantSearchError && (
                            <div className="flex flex-col items-center justify-center mt-[5rem]">
                                <img src={warning} alt="Warning Icon"
                                className="w-[5rem] h-[5rem]" draggable="false"/>
                                <p className="text-[#b71234] text-center font-[550]
                                mt-[1rem]">{instantSearchError}</p>
                            </div>
                        )}
                        {instantSuggestions.length > 0 && !loadingInstantSuggestions && !instantSearchError && (
                            <ul className="text-white mt-4 space-y-3">
                                {instantSuggestions.map((item) => (
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

                        {instantSuggestions.length === 0 && !loadingInstantSuggestions && !instantSearchError && (
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
                <div className="flex flex-col items-center justify-center
                mt-[5rem] sm:mt-[6.5rem] lg:mt-[7.5rem]">
                    <img src={warning} alt="Warning Icon" className="w-[5rem]
                    h-[5rem] sm:w-[6rem] sm:h-[6rem] lg:w-[7rem] lg:h-[7rem]"
                    draggable="false"/>
                    <p className="text-[#b71234] text-center font-[550]
                    mt-[1rem] text-base sm:text-lg lg:text-xl">{error}</p>
                </div>
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
                    xl:mx-[5rem] 2xl:mx-[7rem] pb-8 ">
                        {searchResults.map((item) => (
                            <div key={item.id} onClick={() => handleItemClick(item)}
                            className="p-3 bg-slate-900 rounded-[1rem] flex flex-col
                            items-center hover:bg-slate-800 transition-colors
                            duration-[.25s] cursor-pointer">

                                <div className="relative w-full aspect-[2/3]
                                rounded-[1rem] overflow-hidden mb-[.75rem]">
                                    {item.media_type === "person" ? (
                                        item.profile_path ? (
                                            <img src={`${TMDB_IMAGE_BASE_URL}${item.profile_path}`}
                                            alt={item.name} className="absolute inset-0
                                            w-full h-full object-cover"
                                            draggable="false"/>
                                        ) : (
                                            <div className="absolute inset-0 bg-slate-700
                                            flex items-center justify-center">
                                                <img src={actor} alt="Actor Icon"
                                                className="w-[4rem] h-[4rem] p-2
                                                opacity-50"/>
                                            </div>
                                        )
                                    ) : item.poster_path ? (
                                        <img src={`${TMDB_IMAGE_BASE_URL}${item.poster_path}`}
                                        alt={item.title || item.name} className="absolute inset-0 w-full
                                        h-full object-cover" draggable="false"/>
                                    ) : (
                                        <div className="absolute inset-0 bg-slate-800
                                        flex items-center justify-center">
                                            <img src={movie} alt="Movie Icon"
                                            className="w-[4rem] h-[4rem] p-2
                                            opacity-50"/>
                                        </div>
                                    )}
                                </div>
            
                                <h3 className="line-clamp-3 text-sm font-[650]
                                text-center mb-[.25rem] sm:text-base 2xl:text-lg">
                                    {item.title || item.name}
                                </h3>
                                <p className="text-xs text-slate-400 font-[550]
                                text-center flex-grow sm:text-sm 2xl:text-base">
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
