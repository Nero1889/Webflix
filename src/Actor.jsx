import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import back from "./assets/back.png";
import cake from "./assets/birthdayCake.png";
import location from "./assets/location.png";

const TMDB_API_KEY = "a185d00309246af13fc09d5674ea20ee";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_PROFILE_BASE_URL = "https://image.tmdb.org/t/p/w300";
const TMDB_MOVIE_POSTER_BASE_URL = "https://image.tmdb.org/t/p/w185";

function Actor() {
    const {actorId} = useParams();
    const navigate = useNavigate();

    const [actor, setActor] = useState(null);
    const [filmography, setFilmography] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const ROLE = `bg-slate-800 text-slate-400 text-xs font-[600] inline-block px-3 py-2 rounded-[3rem] mr-2 mb-2`;
    const BIRTH = "text-xs font-[550] text-slate-400";

    const LINE_CLAMP3 = {
        overflow: "hidden",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 3,
        whiteSpace: "normal",
    };

    useEffect(() => {
        const fetchActorData = async () => {
            if (!actorId) {
                setLoading(false);
                setError("Actor ID not found!");
                return;
            }

            setLoading(true);
            setError(null);
            setActor(null);
            setFilmography([]);

            try {
                const actorDetailsRes = await fetch(`${TMDB_BASE_URL}/person/${actorId}?api_key=${TMDB_API_KEY}`);
                if (!actorDetailsRes.ok) {
                    throw new Error(`Failed to fetch actor details: ${actorDetailsRes.statusText}`);
                }
                const actorData = await actorDetailsRes.json();
                setActor(actorData);

                const filmographyRes = await fetch(`${TMDB_BASE_URL}/person/${actorId}/movie_credits?api_key=${TMDB_API_KEY}`);
                if (!filmographyRes.ok) {
                    throw new Error(`Failed to fetch filmography: ${filmographyRes.statusText}`);
                }
                const filmographyData = await filmographyRes.json();
                const sortedFilmography = filmographyData.cast
                    .filter(movie => movie.poster_path && movie.title)
                    .sort((a, b) => {
                        const dateA = a.release_date ? new Date(a.release_date) : new Date(0);
                        const dateB = b.release_date ? new Date(b.release_date) : new Date(0);
                        return dateB - dateA;
                    })
                    .slice(0, 20);
                setFilmography(sortedFilmography);

            } catch (err) {
                console.error(`Error fetching actor data: ${err}`);
                setError("Could not load actor details!");
            } finally {
                setLoading(false);
            }
        };

        fetchActorData();
    }, [actorId]);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            const options = {year: "numeric", month: "long", day: "numeric"};
            return new Date(dateString).toLocaleDateString(undefined, options);
        } catch {
            return dateString;
        }
    };

    const getDepartment = (knownForDepartment) => {
        return knownForDepartment || "Unknown";
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-[2.5rem] h-[2.5rem] border-4 border-slate-800
                border-t-slate-300 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return <p className="text-base text-[#b71234] text-center p-10 mt-[5rem]">
            {error}
        </p>
    }

    if (!actor) {
        return <p className="text-base text-white text-center p-10 mt-[5rem]">
            No actor data found for this ID!
        </p>
    }

    return (
        <div>
            <Header/>
            <button onClick={() => navigate(-1)} className="absolute z-8 ml-[1rem] 
            mt-[1rem] p-2 rounded-full bg-slate-800 hover:bg-slate-900 transition-colors
            duration-[.25s] flex items-center justify-center">
                <img className="w-[1.5rem] h-[1.5rem]" src={back} alt="Back Icon" 
                draggable="false"/>
            </button>

            <div className="mx-[2rem] mt-[2.5rem] flex items-center gap-5">
                {actor.profile_path ? (
                    <img className="w-[7rem] h-[auto] rounded-[1rem] object-cover"
                        src={`${TMDB_PROFILE_BASE_URL}${actor.profile_path}`}
                        alt={actor.name}/>
                ) : (
                    <div className="w-[7rem] h-[10rem] bg-slate-700 rounded-[1rem] flex 
                    items-center justify-center text-slate-400 text-sm">
                        No Image
                    </div>
                )}
                <div>
                    <h1 className="text-xl font-[650] text-white mb-[.5rem]">
                        {actor.name}
                    </h1>
                    {actor.birthday && (
                        <div className="flex gap-2 items-center mb-[.25rem]">
                            <img className="w-[1rem] h-[1rem]" src={cake} 
                            alt="Birthday Cake Icon" draggable="false"/>
                            <p className={BIRTH}>{formatDate(actor.birthday)}</p>
                        </div>
                    )}
                    {actor.place_of_birth && (
                        <div className="flex gap-2 items-center">
                            <img className="w-[1rem] h-[1rem]" src={location} 
                            alt="Location Icon" draggable="false"/>
                            <p className={BIRTH}>{actor.place_of_birth}</p>
                        </div>
                    )}
                </div>
            </div>

            {actor.known_for_department && (
                <div className="mx-[2rem] mt-[2rem]">
                    <div className="flex flex-wrap gap-1">
                        <p className={ROLE}>{getDepartment(actor.known_for_department)}</p>
                    </div>
                </div>
            )}

            {actor.biography && (
                <div className="mx-[2rem] mt-[2rem]">
                    <h1 className="text-white text-lg font-[650] mb-2">Biography</h1>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        {actor.biography}
                    </p>
                </div>
            )}

            {filmography.length > 0 && (
                <div className="ml-[2rem] mt-[3rem]">
                    <h1 className="text-white text-lg font-[650] mb-4">
                        Movies
                    </h1>
                    <div className="flex gap-4 overflow-x-auto whitespace-nowrap 
                    custom-scrollbar">
                        {filmography.map((movie) => (
                            <div key={movie.id} className="flex-shrink-0 w-24 
                            cursor-pointer"
                                 onClick={() => navigate(`/movie/${movie.id}`)}>
                                <div className="mb-2 w-[6rem] h-[8rem] bg-slate-700 
                                rounded-lg overflow-hidden flex items-center 
                                justify-center">
                                    {movie.poster_path ? (
                                        <img src={`${TMDB_MOVIE_POSTER_BASE_URL}${movie.poster_path}`}
                                        alt={movie.title} className="w-full h-full 
                                        object-cover rounded-lg"/>
                                    ) : (
                                        <span className="text-xs text-slate-400">
                                            No Image
                                        </span>
                                    )}
                                </div>
                                <h3 style={LINE_CLAMP3} className="text-left text-sm 
                                text-slate-300 font-[550] mb-1 w-24">
                                    {movie.title}
                                </h3>
                                <p className="text-left text-xs text-slate-500 w-24">
                                    {movie.release_date ? movie.release_date.substring(0, 4) : "N/A"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <Footer/>
        </div>
    );
}

export default Actor;
