import HomePage from "./HomePage.jsx";
import {Link, useNavigate} from "react-router-dom";
import React, {useState, useEffect, useRef} from "react";
import search from "./assets/search.png";
import menu from "./assets/menu.png";
import close from "./assets/close.png";
import home from "./assets/home.png";
import about from "./assets/about.png";
import contact from "./assets/contact.png";
import portfolio from "./assets/portfolio.png";
import back from "./assets/back.png";
import slateSearch from "./assets/searchBarMag.png";
import movie from "./assets/movie.png";
import starRating from "./assets/starRating.png";

const TMDB_API_KEY = "a185d00309246af13fc09d5674ea20ee";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";
const TMDB_SMALL_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w92";

function Header() {
    const LINE_CLAMP5 = {
        overflow: "hidden",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 5,
        whiteSpace: "normal",
    }

    const [IS_MENU_OPEN, setIsMenuOpen] = useState(false);
    const [IS_SEARCH_OPEN, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loadingSuggestions, setLoadingSuggestions] = useState(false);
    const [error, setError] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    const debounceTimeoutRef = useRef(null);

    const TOGGLE_MENU = () => setIsMenuOpen(!IS_MENU_OPEN);
    const MENU_ICON_SRC = IS_MENU_OPEN ? close : menu;

    const fetchSuggestions = async (query) => {
        if (!query.trim()) {
            setSuggestions([]);
            setSearchResults([]);
            return;
        }

        setLoadingSuggestions(true);
        setError(null);
        setSearchResults([]);

        try {
            const movieResponse = await fetch(
                `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`
            );
            const tvResponse = await fetch(
                `${TMDB_BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`
            );

            if (!movieResponse.ok || !tvResponse.ok) {
                throw new Error("Failed to fetch data from TMDb!");
            }

            const movieData = await movieResponse.json();
            const tvData = await tvResponse.json();

            const combinedResults = [
                ...movieData.results.map(item => ({...item, type: "movie"})),
                ...tvData.results.map(item => ({...item, type: "tv"}))
            ].sort((a, b) => {
                return (b.popularity || 0) - (a.popularity || 0);
            });
            setSuggestions(combinedResults.slice(0, 10));

        } catch (err) {
            console.error(`Error fetching suggestions/results: ${err}`);
            setError("Could not load results!");
            setSuggestions([]);
            setSearchResults([]);
        } finally {
            setLoadingSuggestions(false);
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchTerm(query);
        setSearchResults([]);

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            fetchSuggestions(query);
        }, 300);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); 
            if (searchTerm.trim()) {
                triggerFullSearch(searchTerm);
                setSuggestions([]);
            }
        }
    };

    const triggerFullSearch = async (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        setLoadingSuggestions(true);
        setError(null);
        setSuggestions([]);

        try {
            const movieResponse = await fetch(
                `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`
            );
            const tvResponse = await fetch(
                `${TMDB_BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`
            );

            if (!movieResponse.ok || !tvResponse.ok) {
                throw new Error("Failed to fetch data from TMDb.");
            }

            const movieData = await movieResponse.json();
            const tvData = await tvResponse.json();

            const combinedFullResults = [
                ...movieData.results.map(item => ({...item, type: "movie"})),
                ...tvData.results.map(item => ({...item, type: "tv"}))
            ].sort((a, b) => {
                return (b.popularity || 0) - (a.popularity || 0);
            });

            setSearchResults(combinedFullResults);
            setSuggestions([]);
        } catch (err) {
            console.error(`Error fetching full search results: ${err}`);
            setError("Could not load full results!");
            setSearchResults([]);
        } finally {
            setLoadingSuggestions(false);
        }
    };

    const navigate = useNavigate();

    const handleSuggestionClick = (item) => {
        setSearchTerm(item.title || item.name);
        setSuggestions([]);
        setSearchResults([item]);

        navigate(`/movie/${item.id}`, {state:{data: item}}); 
        // ^ Ship item data off to Movie.jsx! ^
    };

    useEffect(() => {
        if (!IS_SEARCH_OPEN) {
            setSearchTerm("");
            setSuggestions([]);
            setError(null);
            setLoadingSuggestions(false);
            setSearchResults([]);
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        }
    }, [IS_SEARCH_OPEN]);

    return (
        <>
            <header className="p-7 flex items-center justify-between sticky top-0
            bg-slate-950 w-full z-10 text-white">
                <h1 className="text-xl font-[650]">Webflix</h1>
                <div className="flex gap-5 items-center">
                    <button className="bg-slate-800 p-2 rounded-full flex items-center
                    justify-center hover:bg-slate-900 transition-colors duration-[.25s]" 
                    onClick={() => setIsSearchOpen(true)}>
                        <img className="w-7 h-7" src={search} alt="Search Icon"
                        draggable="false"/>
                    </button>
                    <button className="bg-[#b71234] p-2 rounded-full flex items-center
                    justify-center hover:bg-[#710033] transition-colors duration-[.25s]" 
                    onClick={TOGGLE_MENU}>
                        <img className="w-7 h-7" src={MENU_ICON_SRC} alt={IS_MENU_OPEN ?
                        "Close menu" : "Open menu"} draggable="false"/>
                    </button>
                </div>
            </header>

            {/* Mobile Navigation */}
            <div className={`fixed left-0 w-full bg-slate-950 z-90 flex flex-col 
            mt-[-1.25rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.5)]
            ${IS_MENU_OPEN ? "visible" : "invisible"} 
            ${IS_MENU_OPEN ? "opacity-100" : "opacity-0"}`}>
                <nav className="w-full">
                    <ul className="list-none flex flex-col items-start gap-2 p-4 w-full">
                        {[
                            {icon: home, label: "Home", path: "/"},
                            {icon: about, label: "About", href: "#about"},
                            {icon: contact, label: "Contact", href: "#contact"},
                            {icon: portfolio, label: "Portfolio", href: "https://nero1889.github.io/Personal-Portfolio/"}
                        ].map(({icon, label, href, path}, i) => (
                            <React.Fragment key={label}>
                                <li className="flex items-center ml-5 w-[calc(100%-3.5rem)]">
                                    <img src={icon} alt={`${label} Icon`} className="w-7 h-7" draggable="false"/>
                                    {path ? (
                                        <Link to={path} onClick={TOGGLE_MENU}
                                        className="text-white text-base font-[550] py-2 px-4 block">
                                            {label}
                                        </Link>
                                    ) : (
                                        <a href={href}
                                        onClick={label === "Portfolio" ? TOGGLE_MENU : undefined}
                                         target={label === "Portfolio" ? "_blank" : undefined}
                                        rel={label === "Portfolio" ? "noopener noreferrer" : undefined}
                                        className="text-white text-base font-[550] py-2 px-4 block">
                                            {label}
                                        </a>
                                    )}
                                </li>
                                {i < 3 && <div className="bg-slate-500 w-full h-[1px] my-2"></div>}
                            </React.Fragment>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Search Overlay */}
            {IS_SEARCH_OPEN && (
                <div className="fixed inset-0 bg-slate-950 z-[100] overflow-y-auto">
                    <div className="flex items-start mt-2 p-5 sticky top-0 bg-slate-950">
                        <button onClick={() => setIsSearchOpen(false)}
                        className="flex items-center">
                            <img src={back} alt="Back Icon" className="w-10 h-10 mr-5"
                            draggable="false"/>
                        </button>
                        <div className="relative flex-grow flex">
                            <span className="absolute inset-y-0 left-4 flex items-center
                            pointer-events-none">
                                <img src={slateSearch} alt="Slate Search Icon" className="w-5 h-5"/>
                            </span>
                            <input type="text" placeholder="Search!" className="w-full 
                            h-[2.7rem] bg-slate-800 text-white pl-12 pr-4 rounded-[7rem]
                            focus:outline-none text-sm" autoFocus value={searchTerm} 
                            onChange={handleSearchChange} onKeyDown={handleKeyDown}/>
                        </div>
                    </div>

                    <div className="p-5 pt-0">
                        {loadingSuggestions && (
                            <p className="text-slate-300 text-center mt-4 text-base
                            font-[550]">Loading...</p>
                        )}
                        {error && (
                            <p className="text-[#b71234] text-center mt-4 border">{error}</p>
                        )}

                        {searchTerm.length > 0 && !loadingSuggestions && !error &&
                        suggestions.length > 0 && searchResults.length === 0 && (
                            <ul className="text-white mt-4 space-y-3">
                                {suggestions.map((item) => (
                                    <li key={item.id} className="bg-slate-900 p-2 rounded-[.5rem] flex items-center gap-5 cursor-pointer hover:bg-slate-800
                                    transition-colors duration-[.25s]"
                                    onClick={() => handleSuggestionClick(item)}>
                                        <img className="w-[1.5rem] h-[1.5rem] ml-[.5rem]" src={movie} alt="Movie Icon" draggable="false"/>
                                        <div>
                                            <p className="font-[600] text-base">
                                                {item.title || item.name}
                                            </p>
                                            <p className="text-sm text-slate-500 font-[600]">
                                                {item.release_date ? `Movie (${item.release_date.substring(0, 4)})` :
                                                item.first_air_date ? `TV Show (${item.first_air_date.substring(0, 4)})` :
                                                item.type === "movie" ? "Movie" : "TV Show"}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {searchTerm.length > 0 && !loadingSuggestions && !error &&
                        suggestions.length === 0 && searchResults.length === 0 && (
                            <p className="text-slate-300 text-center mt-4 text-base font-[550]">No results found!</p>
                        )}

                        {searchResults.length > 0 && (
                            <div className="mt-4 space-y-1">
                                {searchResults.map((item) => (
                                    <div key={item.id} onClick={() => handleSuggestionClick(item)} 
                                    className="p-4 flex items-center md:items-start gap-4 
                                    bg-slate-900 rounded-[1rem] hover:bg-slate-800 
                                    transition-colors duration-[.25s]">
                                        {item.poster_path ? (
                                            <img src={`${TMDB_IMAGE_BASE_URL}${item.poster_path}`} 
                                            alt={item.title || item.name} className="w-[7rem] h-auto object-cover rounded-[1rem] flex-shrink-0"/>
                                        ) : (
                                            <div className="w-[7rem] h-[10rem] 
                                            bg-slate-700 flex items-center justify-center
                                            text-sm text-center rounded-[1rem] flex-shrink-0">
                                                No Image Available
                                            </div>
                                        )}
                                        <div className="text-white text-center 
                                        md:text-left flex-grow">
                                            <h2 className="text-base font-[650] mb-2 text-left">
                                                {item.title || item.name}
                                            </h2>
                                            <p className="text-slate-400 font-[550] text-xs mb-2 text-left">
                                                {item.release_date ? `Movie (${item.release_date.substring(0, 4)})` :
                                                 item.first_air_date ? `TV Show (${item.first_air_date.substring(0, 4)})` :
                                                 item.type === "movie" ? "Movie" : "TV Show"}
                                            </p>
                                            <p style={LINE_CLAMP5} className="text-slate-500 font-[550] text-xs mb-4 text-left">
                                                {item.overview || "No overview available."}
                                            </p>
                                            {item.vote_average > 0 && (
                                                <div className="text-slate-500 font-[550] text-sm flex items-center gap-2">
                                                    <img src={starRating} alt="Star icon" 
                                                    className="w-4 h-4" draggable="false"/>
                                                    <span>
                                                        <span className="font-[650] text-white">
                                                            {item.vote_average.toFixed(1)}
                                                        </span> / 10
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;
