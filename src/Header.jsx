import {Link, useNavigate} from "react-router-dom";
import React, {useState, useEffect} from "react";
import search from "./assets/search.png";
import menu from "./assets/menu.png";
import close from "./assets/close.png";
import home from "./assets/home.png";
import about from "./assets/about.png";
import contact from "./assets/contact.png";
import portfolio from "./assets/portfolio.png";
import back from "./assets/back.png";
import movie from "./assets/movie.png";
import actor from "./assets/actor.png";
import warning from "./assets/warning.png"
import SearchBar from "./SearchBar";

const TMDB_SMALL_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w92";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [loadingSuggestions, setLoadingSuggestions] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const menuIconSrc = isMenuOpen ? close : menu;
    const closeSearchOverlay = () => {
        setIsSearchOpen(false);
        setSuggestions([]);
        setError(null);
    }
    
    const handleSearch = (results, searchError, isLoading) => {
        setSuggestions(results);
        setError(searchError);
        setLoadingSuggestions(isLoading);
    };

    const handleSuggestionClick = (item) => {
        const routePath = item.media_type === "person" ? `/actor/${item.id}` : `/${item.media_type}/${item.id}`;
        navigate(routePath, { state: { data: item } });
        closeSearchOverlay();
    };
    
    useEffect(() => {
        if (!isSearchOpen) {
            setSuggestions([]);
            setError(null);
            setLoadingSuggestions(false);
        }
    }, [isSearchOpen]);

    return (
        <>
            <header className="p-7 flex items-center justify-between sticky top-0
            bg-slate-950 w-full z-10 text-white">
                <h1 className="text-xl font-[650] text-white">Webflix</h1>
                <div className="relative hidden w-[24rem] h-[2.5rem] lg:block xl:w-[34rem]">
                    <SearchBar onSearch={handleSearch} isMobile={false}/>
                    {suggestions.length > 0 && !loadingSuggestions && (
                        <ul className="absolute top-[2.2rem] left-0 w-full bg-slate-900
                        text-white mt-1 shadow-lg z-50 overflow-hidden" 
                        style={{borderRadius: "0 0 1rem 1rem"}}>
                            {suggestions.map((item) => (
                                <li key={item.id} className="flex items-center gap-3 px-4
                                py-3 hover:bg-slate-800 cursor-pointer transition-colors
                                duration-[.25s]" onClick={() => handleSuggestionClick(item)}>
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
                        <img className="w-7 h-7" src={menuIconSrc}
                        alt={isMenuOpen ? "Close menu" : "Open menu"} draggable="false"/>
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
                            {icon: about, label: "About", path: "/about"},
                            {icon: contact, label: "Contact", path: "/contact"},
                            {icon: portfolio, label: "Portfolio", href: "https://nero1889.github.io/Personal-Portfolio/"}
                        ].map(({ icon, label, href, path }, i) => (
                            <React.Fragment key={label}>
                                <li className="flex items-center ml-5 w-[calc(100%-3.5rem)]">
                                    <img src={icon} alt={`${label} Icon`}
                                    className="w-7 h-7" draggable="false"/>
                                    {path ? (
                                        <Link to={path} onClick={toggleMenu}
                                        className="text-slate-300 text-base font-[550]
                                        py-2 px-4 block hover:text-white 
                                        transition-colors duration-[.25s]">{label}</Link>
                                    ) : (
                                        <a href={href} onClick={label === "Portfolio" ? toggleMenu : undefined}
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
                <div className="fixed inset-0 bg-slate-950 z-[100] overflow-y-auto lg:hidden">
                    <div className="flex items-start mt-2 p-5 sticky top-0 bg-slate-950">
                        <button onClick={closeSearchOverlay} className="flex items-center">
                            <img src={back} alt="Back Icon" className="w-[2.5rem]
                            h-[2.5rem] p-1 mr-[1.25rem]" draggable="false"/>
                        </button>
                        <SearchBar onSearch={handleSearch} isMobile={true} />
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
                            <div className="flex flex-col items-center justify-center
                            mt-[5rem]">
                                <img src={warning} alt="Warning Icon" className="w-[5rem]
                                h-[5rem]" draggable="false"/>
                                <p className="text-[#b71234] text-center font-[550]
                                mt-[1rem]">{error}</p>
                            </div>
                        )}
        
                        {suggestions.length > 0 && !loadingSuggestions && !error && (
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
                                            ml-[.5rem]" src={movie} alt="Movie Icon"
                                            draggable="false"/>
                                        )}
                                        <div>
                                            <p className="text-white font-[650]
                                            text-base">{item.title || item.name}</p>
                                            <p className="text-slate-500 font-[550] text-sm">
                                                {item.media_type === "movie" && `Movie (${item.release_date ? item.release_date.substring(0, 4) : "N/A"})`}
                                                {item.media_type === "tv" && `TV Show (${item.first_air_date ? item.first_air_date.substring(0, 4) : "N/A"})`}
                                                {item.media_type === "person" && `Actor`}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
        
                        {suggestions.length === 0 && !loadingSuggestions && !error && (
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
