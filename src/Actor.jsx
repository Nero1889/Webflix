import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import back from "./assets/back.png";
import cake from "./assets/birthdayCake.png";
import location from "./assets/location.png";
import slateActor from "./assets/actor.png";

const TMDB_API_KEY = "a185d00309246af13fc09d5674ea20ee";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_PROFILE_BASE_URL = "https://image.tmdb.org/t/p/w300";
const TMDB_MOVIE_POSTER_BASE_URL = "https://image.tmdb.org/t/p/w185";

function Actor() {
    const {actorId} = useParams();
    const navigate = useNavigate();

    const [actor, setActor] = useState(null);
    const [filmography, setFilmography] = useState([]);
    const [actorImages, setActorImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const ROLE = `bg-slate-800 text-slate-400 text-xs font-[600] inline-block px-3 py-2
    rounded-[3rem] mr-2 mb-2 md:text-sm lg:text-base`;

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
            setActorImages([]);

            try {
                const actorDetailsRes = await fetch(`${TMDB_BASE_URL}/person/${actorId}?api_key=${TMDB_API_KEY}`);
                if (!actorDetailsRes.ok) {
                    throw new Error(`Failed to fetch actor details: ${actorDetailsRes.statusText}`);
                }
                const actorData = await actorDetailsRes.json();
                setActor(actorData);

                const actorImagesRes = await fetch(`${TMDB_BASE_URL}/person/${actorId}/images?api_key=${TMDB_API_KEY}`);
                if (!actorImagesRes.ok) {
                    throw new Error(`Failed to fetch actor images: ${actorImagesRes.statusText}`);
                }
                const imagesData = await actorImagesRes.json();
                const profileImages = imagesData.profiles
                    .filter(img => img.file_path)
                    .slice(0, 3)
                    .map(img => `${TMDB_PROFILE_BASE_URL}${img.file_path}`);
                setActorImages(profileImages);

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

    const calculateAge = (birthday) => {
        if (!birthday) return "N/A";
        try {
            const birthDate = new Date(birthday);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return `${age} Years`;
        } catch {
            return "N/A";
        }
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
        return (
            <div className="flex flex-col items-center justify-center h-[100vh]">
                <p className="text-base text-[#b71234] font-[650] text-center mb-6
                w-[15ch]">{error}</p>
                <button onClick={() => navigate(-1)} className="p-2 rounded-full
                bg-slate-800 hover:bg-slate-900 transition-colors duration-[.25s] flex
                items-center justify-center">
                    <img className="w-[1.5rem] h-[1.5rem]" src={back} alt="Back Icon" draggable="false" />
                </button>
            </div>
        );
    }

    if (!actor) {
        return <p className="text-base text-white text-center p-10 mt-[5rem]">
            No actor data found for this ID!
        </p>
    }

    return (
        <div>
            <Header/>
            <div className="w-full px-[2rem] flex flex-col items-start justify-center md:px-[3.4rem]">
                <div className="flex items-center gap-5 md:gap-7 xl:gap-10">
                    <div>
                        <button onClick={() => navigate(-1)} className="z-8
                        p-2 rounded-full bg-slate-800 hover:bg-slate-900 transition-colors
                        duration-[.25s] flex items-center justify-center">
                            <img className="w-[1.5rem] h-[1.5rem]" src={back} alt="Back Icon"
                            draggable="false"/>
                        </button>
                    </div>
                        <div>
                        <h1 className="text-white font-[650] text-lg sm:text-xl md:text-2xl">{actor.name}</h1>
                        <p className="text-slate-500 font-[550] text-sm sm:text-base md:text-lg">Actor</p>
                    </div>
                </div>
            </div>

            <div className="w-full px-[2rem] mt-[1.25rem] flex flex-col items-center justify-center gap-5 md:px-[3.4rem] lg:flex-row">
                <div className="bg-slate-900 w-full h-[18rem] rounded-[1.25rem] flex overflow-hidden sm:h-[24rem] md:h-[30rem] lg:h-[21.2rem] lg:w-[34rem]
                xl:h-[25.3rem]">
                    {/* Image 1 */}
                    <div className="w-1/2 h-full pr-1 py-1 pl-1 flex items-center justify-center">
                        {actorImages[0] ? (
                            <img src={actorImages[0]} alt={`${actor.name} - 1`}
                            className="w-full h-full object-cover rounded-l-[1.25rem]"/>
                        ) : (
                            <div className="w-full h-full bg-slate-700 flex items-center justify-center rounded-l-[1.25rem]">
                                <img src={slateActor} alt="Actor Icon" className="w-[4rem] h-[4rem]
                                sm:w-[4.5rem] sm:h-[4.5rem] md:w-[5rem] md:h-[5rem] opacity-50" draggable="false"/>
                            </div>
                        )}
                    </div>
                    <div className="w-1/2 h-full flex flex-col pl-1 py-1 pr-1 gap-1">
                        {/* Image 2 */}
                        <div className="w-full h-1/2 pb-0.5 flex items-center justify-center">
                            {actorImages[1] ? (
                                <img src={actorImages[1]} alt={`${actor.name} - 2`}
                                className="w-full h-full object-cover rounded-tr-[1.25rem]"/>
                            ) : (
                                <div className="w-full h-full bg-slate-700 flex items-center justify-center rounded-tr-[1.25rem]">
                                    <img src={slateActor} alt="Actor Icon" className="w-[4rem] h-[4rem]
                                    sm:w-[4.5rem] sm:h-[4.5rem] md:w-[5rem] md:h-[5rem] opacity-50" draggable="false"/>
                                </div>
                            )}
                        </div>
                        {/* Image 3 */}
                        <div className="w-full h-1/2 pb-1 flex items-center justify-center">
                            {actorImages[2] ? (
                                <img src={actorImages[2]} alt={`${actor.name} - 3`}
                                className="w-full h-full object-cover rounded-br-[1.25rem]"/>
                            ) : (
                                <div className="w-full h-full bg-slate-800 flex items-center justify-center rounded-br-[1.25rem]">
                                    <img src={slateActor} alt="Actor Icon" className="w-[4rem] h-[4rem]
                                    sm:w-[4.5rem] sm:h-[4.5rem] md:w-[5rem] md:h-[5rem] opacity-50" draggable="false"/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-5 w-full sm:flex-row lg:flex-col lg:w-auto">
                    <div className="bg-slate-900 w-full h-[6rem] rounded-[1.25rem] flex flex-col items-start justify-center gap-1 px-[1.5rem]
                    md:h-[8rem] lg:h-[10rem] lg:w-[17rem] lg:gap-4 xl:h-[12rem] xl:w-[20rem]">
                        <p className="text-slate-400 text-base font-[550] md:text-lg lg:ml-[.25rem] xl:text-xl">Age</p>
                        <h1 className="text-white text-xl font-[550] md:text-2xl lg:ml-[.25rem] lg:text-3xl">{calculateAge(actor.birthday)}</h1>
                    </div>
                    <div className="bg-slate-900 w-full h-[6rem] rounded-[1.25rem] flex flex-col items-start justify-center gap-1 px-[1.5rem]
                    md:h-[8rem] lg:h-[10rem] lg:w-[17rem] lg:gap-2 xl:h-[12rem] xl:w-[20rem]">
                        <p className="text-slate-400 text-base font-[550] md:text-lg lg:ml-[.25rem] xl:text-xl">Overview</p>
                        {actor.birthday && (
                            <div className="flex gap-2 items-center lg:ml-[.25rem] lg:gap-3 lg:mt-[.5rem] xl:mt-[1rem]">
                                <img className="w-[1rem] h-[1rem] lg:w-[1.5rem] lg:h-[1.5rem] xl:w-[2rem] xl:h-[2rem]" src={cake} alt="Birthday Cake Icon" draggable="false"/>
                                <p className="text-white text-xs md:text-sm xl:text-base">{formatDate(actor.birthday)}</p>
                            </div>
                        )}
                        {actor.place_of_birth && (
                            <div className="flex gap-2 items-center lg:ml-[.25rem] lg:gap-3">
                                <img className="w-[1rem] h-[1rem] lg:w-[1.5rem] lg:h-[1.5rem] xl:w-[2rem] xl:h-[2rem]" src={location} alt="Location Icon" draggable="false"/>
                                <p className="text-white text-xs md:text-sm xl:text-base">{actor.place_of_birth}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {actor.biography && (
                <div className="mx-[2rem] mt-[2rem] md:mx-[3.4rem]">
                    <h1 className="text-white text-lg font-[650] mb-2 md:text-xl xl:text-2xl">Biography</h1>
                    <p className="text-slate-400 text-sm leading-relaxed md:mt-[1rem] md:text-base xl:mt-[1.5rem] xl:text-lg">
                        {actor.biography}
                    </p>
                </div>
            )}

            {filmography.length > 0 && (
                <div className="ml-[2rem] mt-[2rem] md:ml-[3.4rem] md:mt-[3rem] xl:mt-[4rem]">
                    <h1 className="text-white text-lg font-[650] mb-[1rem] md:text-xl
                    lg:text-2xl lg:mb-[1.5rem]">
                        Filmography
                    </h1>
                    <div className="flex gap-5 overflow-x-auto whitespace-nowrap
                    custom-scrollbar lg:gap-10 xl:gap-15 2xl:gap-20">
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
