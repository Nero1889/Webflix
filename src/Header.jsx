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
import actor from "./assets/actor.png";

const TMDB_API_KEY = "a185d00309246af13fc09d5674ea20ee";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_SMALL_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w92";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loadingSuggestions, setLoadingSuggestions] = useState(false);
    const [error, setError] = useState(null);

    const debounceTimeoutRef = useRef(null);
    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const menuIconSrc = isMenuOpen ? close : menu;

    const fetchSuggestions = async (query) => {
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }

        setLoadingSuggestions(true);
        setError(null);

        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`
            );

            if (!response.ok) throw new Error("Failed to fetch data!");
            
            const data = await response.json();

            const combinedResults = data.results.filter(item =>
                ["movie", "tv", "person"].includes(item.media_type)
            ).sort((a, b) => {
                return (b.popularity || 0) - (a.popularity || 0);
            });

            setSuggestions(combinedResults.slice(0, 10));

        } catch (err) {
            console.error(`Error fetching results: ${err}`);
            setError("Could not load results!");
            setSuggestions([]);
        } finally {
            setLoadingSuggestions(false);
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchTerm(query);

        if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
        
        debounceTimeoutRef.current = setTimeout(() => {
            fetchSuggestions(query);
        }, 300);
    };

    const handleFullSearch = (query) => {
        if (query.trim()) {
            navigate(`/results?query=${encodeURIComponent(query)}`);
            setSearchTerm("");
            setSuggestions([]);
            setIsSearchOpen(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleFullSearch(searchTerm);
        }
    };

    const handleSuggestionClick = (item) => {
        const routePath = item.media_type === "person" ? `/actor/${item.id}` : `/${item.media_type}/${item.id}`;
        navigate(routePath, { state: { data: item } });
        
        setSearchTerm("");
        setSuggestions([]);
        setIsSearchOpen(false);
    };

    useEffect(() => {
        if (!isSearchOpen) {
            setSearchTerm("");
            setSuggestions([]);
            setError(null);
            setLoadingSuggestions(false);
            if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
        }
    }, [isSearchOpen]);

    return (
        <>
            <header className="p-7 flex items-center justify-between sticky top-0 
            bg-slate-950 w-full z-10 text-white">
                <h1 className="text-xl font-[650] text-white">Webflix</h1>
                {/* Desktop Search Bar */}
                <div className="relative hidden w-[24rem] h-[2.5rem] lg:block 
                xl:w-[34rem]">
                    <img src={slateSearch} alt="Search Icon" className="absolute left-3
                    top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                    draggable="false"/>
                    <input type="text" placeholder="Search!"
                    className={`w-full h-full pl-[2.5rem] pr-5 text-sm bg-slate-900 
                    text-white placeholder:text-slate-500 focus:outline-none font-[550] ${
                        searchTerm.length > 0 && suggestions.length > 0 && !loadingSuggestions
                        ? "rounded-t-[1rem] rounded-b-none"
                        : "rounded-[2rem]"
                    }`} value={searchTerm} onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}/>
                    {searchTerm.length > 0 && suggestions.length > 0 && !loadingSuggestions && (
                        <ul className="absolute top-[2.2rem] left-0 w-full bg-slate-900
                        text-white mt-1 shadow-lg z-50 overflow-hidden"
                        style={{borderRadius: "0 0 1rem 1rem"}}>
                            {suggestions.map((item) => (
                                <li key={item.id} className="flex items-center gap-3 px-4
                                py-3 hover:bg-slate-800 cursor-pointer transition-colors
                                duration-200" onClick={() => handleSuggestionClick(item)}>
                                    {item.media_type === "person" ? (
                                        item.profile_path ? (
                                            <img src={`${TMDB_SMALL_IMAGE_BASE_URL}${item.profile_path}`}
                                            alt={item.name} 
                                            className="w-8 h-8 rounded-full object-cover"
                                            draggable="false"/>
                                        ) : (
                                            <img src={actor} alt="Actor"
                                            className="w-8 h-8 rounded-full"
                                            draggable="false"/>
                                        )
                                    ) : (
                                        <img src={movie} alt="Movie"
                                        className="w-5 h-5" draggable="false"/>
                                    )}
                                    <div>
                                        <p className="font-semibold text-sm">
                                            {item.title || item.name}
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            {item.media_type === "movie" &&
                                                `Movie (${item.release_date ? item.release_date.slice(0, 4) : "N/A"})`}
                                            {item.media_type === "tv" &&
                                                `TV Show (${item.first_air_date ? item.first_air_date.slice(0, 4) : "N/A"})`}
                                            {item.media_type === "person" && "Actor"}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="flex gap-5 items-center">
                    <button className="bg-slate-800 p-2 rounded-full flex items-center
                    justify-center hover:bg-slate-900 transition-colors duration-[.25s] 
                    lg:hidden" onClick={() => setIsSearchOpen(true)}>
                        <img className="w-7 h-7" src={search} alt="Search Icon"
                        draggable="false"/>
                    </button>

                    <button className="bg-[#b71234] p-2 rounded-full flex items-center 
                    justify-center hover:bg-[#710033] transition-colors duration-[.25s]"
                    onClick={toggleMenu}>
                        <img className="w-7 h-7" src={menuIconSrc} alt={isMenuOpen ?
                        "Close menu" : "Open menu"} draggable="false"/>
                    </button>
                </div>
            </header>

            {/* Navigation */}
            <div className={`fixed right-0 w-full bg-slate-950 z-90 flex flex-col 
            mt-[-1.25rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.5)] lg:w-[20rem] lg:h-full
            ${isMenuOpen ? "visible" : "invisible"}
            ${isMenuOpen ? "opacity-100" : "opacity-0"}`}>
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
                                        <Link to={path} onClick={toggleMenu}
                                        className="text-slate-300 text-base font-[550] 
                                        py-2 px-4 block hover:text-white 
                                        transition-colors duration-[.25s]">
                                            {label}
                                        </Link>
                                    ) : (
                                        <a href={href}
                                        onClick={label === "Portfolio" ? toggleMenu : undefined}
                                        target={label === "Portfolio" ? "_blank" : undefined}
                                        rel={label === "Portfolio" ? "noopener noreferrer" : undefined}
                                        className="text-slate-300 text-base font-[550] 
                                        py-2 px-4 block hover:text-white
                                        transition-colors duration-[.25s]">{label}</a>
                                    )}
                                </li>
                                {i < 3 && <div className="bg-slate-800 w-full h-[2px] 
                                my-2 rounded-[5rem]"></div>}
                            </React.Fragment>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Search Overlay - Mobile */}
            {isSearchOpen && (
                <div className="fixed inset-0 bg-slate-950 z-[100] overflow-y-auto 
                lg:hidden">
                    <div className="flex items-start mt-2 p-5 sticky top-0 bg-slate-950">
                        <button onClick={() => setIsSearchOpen(false)}
                        className="flex items-center">
                            <img src={back} alt="Back Icon" className="w-10 h-10 mr-5"
                            draggable="false"/>
                        </button>
                        {/* Mobile Search Bar */}
                        <div className="relative flex-grow flex">
                            <span className="absolute inset-y-0 left-4 flex items-center
                            pointer-events-none">
                                <img src={slateSearch} alt="Slate Search Icon" 
                                className="w-5 h-5"/>
                            </span>
                            <input type="text" placeholder="Search!" className="w-full 
                            h-[2.7rem] bg-slate-900 text-white pl-12 pr-4 rounded-[7rem]
                            placeholder:text-slate-500 font-[550] focus:outline-none 
                            text-sm" autoFocus value={searchTerm}
                            onChange={handleSearchChange} onKeyDown={handleKeyDown}/>
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
                            <p className="text-[#b71234] text-center mt-4 border-rose-600
                            border-[2px]">{error}</p>
                            /* Return to later!!! */
                        )}

                        {searchTerm.length > 0 && !loadingSuggestions && !error &&
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
                                            <p className="font-[600] text-base">
                                                {item.title || item.name}
                                            </p>
                                            <p className="text-sm text-slate-500
                                            font-[600]">
                                                {item.media_type === "movie" && `Movie (${item.release_date ? item.release_date.substring(0, 4) : "N/A"})`}
                                                {item.media_type === "tv" && `TV Show (${item.first_air_date ? item.first_air_date.substring(0, 4) : "N/A"})`}
                                                {item.media_type === "person" && `Actor`}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {searchTerm.length > 0 && !loadingSuggestions && !error &&
                        (suggestions.length === 0) && (
                            <p className="text-slate-500 text-center mt-[5rem] text-base
                            font-[550]">No results found!</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;
