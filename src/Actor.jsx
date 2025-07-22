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

    const ROLE = `bg-slate-800 text-slate-400 text-xs font-[600] inline-block px-3 py-2
    rounded-[3rem] mr-2 mb-2 md:text-sm lg:text-base`;
    const BIRTH = "text-xs font-[550] text-slate-400 sm:text-sm md:text-base lg:text-lg";

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

            <div className="mx-[2rem] mt-[2.5rem] flex items-center justify-center gap-5 sm:gap-7 md:gap-12 xl:gap-20">
                {actor.profile_path ? (
                    <img className="w-[7rem] h-[auto] rounded-[1rem] object-cover sm:w-[8.5rem] md:w-[10rem] lg:w-[12rem] xl:w-[14rem]"
                        src={`${TMDB_PROFILE_BASE_URL}${actor.profile_path}`} /* Actor Img */
                        alt={actor.name}/>
                ) : (
                    <div className="w-[7rem] h-[10rem] bg-slate-700 rounded-[1rem] flex 
                    items-center justify-center text-slate-400 text-sm">
                        No Image
                    </div>
                )}
                <div>
                    <h1 className="text-xl font-[650] text-white mb-[.5rem] sm:text-2xl md:text-3xl lg:text-4xl"> {/* Name */}
                        {actor.name}
                    </h1>
                    {actor.birthday && (
                        <div className="flex gap-2 items-center md:gap-4 mb-[.25rem] md:mt-[1rem] lg:mt-[2rem]">
                            <img className="w-[1rem] h-[1rem] md:w-[1.5rem] md:h-[1.5rem] xl:w-[2rem] xl:h-[2rem]" src={cake} /* Birthday */
                            alt="Birthday Cake Icon" draggable="false"/>
                            <p className={BIRTH}>{formatDate(actor.birthday)}</p>
                        </div>
                    )}
                    {actor.place_of_birth && (
                        <div className="flex gap-2 items-center md:gap-4 md:mt-[.5rem] xl:mt-[1rem]"> {/* Place of Birth */}
                            <img className="w-[1rem] h-[1rem] md:w-[1.5rem] md:h-[1.5rem] xl:w-[2rem] xl:h-[2rem]" src={location} 
                            alt="Location Icon" draggable="false"/>
                            <p className={BIRTH}>{actor.place_of_birth}</p>
                        </div>
                    )}
                </div>
            </div>

            {actor.known_for_department && (
                <div className="ml-[2rem] mt-[2rem] md:ml-[3.4rem] lg:mt-[3rem]">
                    <div className="flex flex-wrap gap-1">
                        <p className={ROLE}>{getDepartment(actor.known_for_department)}</p>
                    </div>
                </div>
            )}

            {actor.biography && (
                <div className="mx-[2rem] mt-[2rem] md:mx-[3.4rem]"> {/* Bio */}
                    <h1 className="text-white text-lg font-[650] mb-2 md:text-xl xl:text-2xl">Biography</h1>
                    <p className="text-slate-400 text-sm leading-relaxed md:mt-[1rem] md:text-base xl:mt-[1.5rem] xl:text-lg">
                        {actor.biography}
                    </p>
                </div>
            )}

            {filmography.length > 0 && (
                <div className="ml-[2rem] mt-[2rem] 2xl:ml-0 md:mt-[3rem] xl:mt-[4rem]">
                    <h1 className="text-white text-lg font-[650] mb-[1rem] md:text-xl
                    lg:text-2xl lg:mb-[1.5rem] 2xl:ml-[3.4rem]">
                        Movies
                    </h1>
                    <div className="flex gap-5 overflow-x-auto whitespace-nowrap
                    custom-scrollbar lg:gap-10 xl:gap-15 2xl:gap-20 2xl:ml-[3.4rem]">
                        {filmography.map((movie) => (
                            <div key={movie.id} className="flex-shrink-0 text-center
                            w-24 cursor-pointer" onClick={() => navigate(`/movie/${movie.id}`)}>
                                <div className="mb-2 w-[6rem] h-[8.5rem] bg-slate-800
                                rounded-[1rem] overflow-hidden border-[#ffffff00]
                                border-[2.5px] hover:border-[#b71234] transition-colors
                                duration-[.25s] md:w-[6rem] md:h-[8.5rem] lg:w-[7rem]
                                lg:h-[10rem] lg:mb-[.7rem] xl:mb-[1rem] xl:w-[8rem]
                                xl:h-[12rem] 2xl:w-[9rem] 2xl:h-[13rem]">
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
                                text-slate-300 font-[550] mb-1 w-[6rem] xl:text-base xl:w-[8rem]">
                                    {movie.title}
                                </h3>
                                <p className="text-left text-xs text-slate-500 font-[550] w-[6rem] xl:text-base xl:w-[8rem]">
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
