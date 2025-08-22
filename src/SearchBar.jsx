import {useNavigate} from "react-router-dom";
import React, {useState, useEffect, useRef} from "react";
import slateSearch from "./assets/searchBarMag.png";

const TMDB_API_KEY = "a185d00309246af13fc09d5674ea20ee";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

function SearchBar({onSearch, isMobile = false}) {
    const [searchTerm, setSearchTerm] = useState("");
    const debounceTimeoutRef = useRef(null);
    const navigate = useNavigate();

    const [showSuggestions, setShowSuggestions] = useState(false);

    const fetchSuggestions = async (query) => {
        if (!query.trim()) {
            onSearch([], null, false);
            setShowSuggestions(false);
            return;
        }

        onSearch([], null, true);
        setShowSuggestions(true);

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

            onSearch(combinedResults.slice(0, 10), null, false);

        } catch (err) {
            console.error(`Error fetching results: ${err}`);
            onSearch([], "Could not load results!", false);
            setShowSuggestions(false);
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchTerm(query);
        if (!query.trim()) setShowSuggestions(false);
        
        if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
        debounceTimeoutRef.current = setTimeout(() => {
            fetchSuggestions(query);
        }, 300);
    };

    const handleFullSearch = (e) => {
        if (e.key === "Enter" && searchTerm.trim()) {
            e.preventDefault();
            navigate(`/results?query=${encodeURIComponent(searchTerm)}`);
            setSearchTerm("");
            onSearch([], null, false);
            setShowSuggestions(false);
        }
    };

    useEffect(() => {
        return () => {
            if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
        };
    }, []);
 
    return (
        <div className={`${isMobile ? "relative flex-grow flex" : `relative hidden
        w-[24rem] h-[2.5rem] lg:block xl:w-[34rem]`}`}>
            <img src={slateSearch} alt="Search Icon" className="w-[1.25rem] h-[1.25rem]
            absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" 
            draggable="false"/>

            {/* Search Bar! */}
            <input type="text" placeholder="Search!"
            
            /* Mobile Search Bar */
            className={`${isMobile ? `w-full
            h-[2.7rem] bg-slate-900 text-white pl-12 pr-4 rounded-[7rem]
            placeholder:text-slate-500 font-[550] focus:outline-none text-sm` :

            /* Desktop Search Bar */
            `w-full h-full pl-[2.5rem] pr-5 text-sm bg-slate-900 text-white 
            placeholder:text-slate-500 focus:outline-none font-[550]
            ${showSuggestions ? "rounded-t-[1rem] rounded-b-none" : "rounded-[2rem]"}`}`}

            value={searchTerm} onChange={handleSearchChange}
            onKeyDown={handleFullSearch} autoFocus={isMobile}/>
        </div>
    );
}

export default SearchBar;