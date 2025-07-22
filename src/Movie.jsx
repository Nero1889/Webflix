import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import {useParams, useNavigate, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import back from "./assets/back.png";
import star from "./assets/star.png";
import clock from "./assets/clock.png";
import calendar from "./assets/calendar.png";
import playBtn from "./assets/playButton.png";

const TMDB_API_KEY = "a185d00309246af13fc09d5674ea20ee";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";
const TMDB_POSTER_BASE_URL = "https://image.tmdb.org/t/p/w300";
const TMDB_PROFILE_BASE_URL = "https://image.tmdb.org/t/p/w185";

function Movie() {
    const {id} = useParams();
    const {pathname} = useLocation();
    const navigate = useNavigate();

    const contentType = pathname.includes("/tv/") ? "tv" : "movie";

    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const GENRES = `bg-slate-800 text-slate-400 text-xs font-[600] inline-block px-3 py-2
    rounded-[3rem] mr-2 mb-2 md:text-sm lg:text-base`;

    const LINE_CLAMP3 = {
        overflow: "hidden",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 3,
        whiteSpace: "normal",
    };

    useEffect(() => {
        const fetchFullMovieData = async () => {
            if (!id) {
                setLoading(false);
                setError("ID not found!");
                return;
            }

            setLoading(true);
            setError(null);
            setMovie(null);
            setCast([]);
            setSimilar([]);

            try {
                const detailsRes = await fetch(`${TMDB_BASE_URL}/${contentType}/${id}?api_key=${TMDB_API_KEY}`);
                if (!detailsRes.ok) throw new Error(`Failed to fetch details: ${detailsRes.statusText}`);
                const detailsData = await detailsRes.json();
                setMovie(detailsData);

                const creditsRes = await fetch(`${TMDB_BASE_URL}/${contentType}/${id}/credits?api_key=${TMDB_API_KEY}`);
                if (!creditsRes.ok) throw new Error(`Failed to fetch credits: ${creditsRes.statusText}`);
                const creditsData = await creditsRes.json();
                setCast(creditsData.cast.slice(0, 10));

                const similarRes = await fetch(`${TMDB_BASE_URL}/${contentType}/${id}/similar?api_key=${TMDB_API_KEY}`);
                if (!similarRes.ok) throw new Error(`Failed to fetch similar titles: ${similarRes.statusText}`);
                const similarMoviesData = await similarRes.json();
                setSimilar(similarMoviesData.results.slice(0, 10));

            } catch (err) {
                console.error("Error fetching content data:", err);
                setError("Could not load details!");
            } finally {
                setLoading(false);
            }
        };

        fetchFullMovieData();
    }, [id, contentType]);

    const formatRuntime = (mins) => {
        if (typeof mins !== "number" || isNaN(mins) || mins === 0) return "N/A";
        const hours = Math.floor(mins / 60);
        const remainingMinutes = mins % 60;
        return `${hours}h ${remainingMinutes}m`;
    }

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-[2.5rem] h-[2.5rem] border-4 border-slate-800
            border-t-slate-300 rounded-full animate-spin"></div>
        </div>
    )

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-[100vh]">
                <p className="text-base text-[#b71234] font-[650] text-center mb-6
                w-[15ch]">{error}</p>
                <button onClick={() => navigate(-1)} className="p-2 rounded-full
                bg-slate-800 hover:bg-slate-900 transition-colors duration-[.25s] flex
                items-center justify-center">
                    <img className="w-[1.5rem] h-[1.5rem]" src={back} alt="Back Icon" draggable="false"/>
                </button>
            </div>
        );
    }

    if (!movie) {
        return (
            <p className="text-base text-white text-center p-10 mt-[5rem]">
                No data found for this ID!
            </p>
        )
    }

    return (
        <div>
            <Header/>
            <div className="relative bg-black mb-4">
                <button onClick={() => navigate(-1)} className="absolute z-8 ml-[1rem]
                mt-[1rem] p-2 rounded-full bg-slate-800 hover:bg-slate-900
                transition-colors duration-[.25s] flex items-center justify-center">
                    <img className="w-[1.5rem] h-[1.5rem]" src={back} alt="Back Icon"
                    draggable="false"/>
                </button>

                {movie.backdrop_path ? (
                    <img className="opacity-50 w-full h-auto object-cover max-h-[50vh]
                    xl:max-h-[60vh] 2xl:max-h-[65vh]" src={`${TMDB_BACKDROP_BASE_URL}${movie.backdrop_path}`} 
                    alt={`${movie.title || movie.name} Backdrop`}/>
                ) : (
                    <div className="w-full h-[50vh] bg-slate-900 opacity-50 flex
                    items-center justify-center text-slate-500">
                        No Backdrop Available
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#010617]
                via-transparent to-transparent"/>
                <div className="absolute bottom-4 left-0 right-0 px-4 z-5 text-white flex
                flex-col items-center lg:items-start">
                    <h1 className="text-xl font-bold text-center mb-2 w-[17ch]
                    sm:text-2xl sm:w-[25ch] sm:mb-[1rem] md:border-[#b71234]
                    lg:mb-[.25rem] lg:w-[auto] lg:ml-[5rem] xl:text-3xl xl:mb-[.5rem]
                    2xl:text-4xl 2xl:mb-[1rem]">
                        {movie.title || movie.name}
                    </h1>

                    <div className="hidden lg:flex justify-center gap-5 items-center
                    mb-[1rem] sm:gap-7 lg:ml-[5rem]">
                        <div className="flex items-center gap-1">
                            <img className="w-4 h-4" src={star} alt="Rating Icon"/>
                            <h3 className="text-slate-400 text-sm sm:text-base xl:text-lg
                            2xl:text-xl">
                                {movie.vote_average?.toFixed(1) || "N/A"}
                            </h3>
                        </div>
                        <div className="flex items-center gap-1">
                            <img className="w-4 h-4" src={clock} alt="Runtime Icon"/>
                            <h3 className="text-slate-400 text-sm sm:text-base xl:text-lg
                            2xl:text-xl">
                                {formatRuntime(movie.runtime || movie.episode_run_time?.[0])}
                            </h3>
                        </div>
                        <div className="flex items-center gap-1">
                            <img className="w-4 h-4" src={calendar} alt="Year Icon"/>
                            <h3 className="text-slate-400 text-sm sm:text-base xl:text-lg
                            2xl:text-xl">
                                {(movie.release_date || movie.first_air_date || "").substring(0, 4) || "N/A"}
                            </h3>
                        </div>
                    </div>

                    <p className="hidden text-slate-400 text-sm leading-relaxed mb-[5rem]
                    lg:block lg:ml-[5rem] w-[70ch] mt-[1rem] xl:text-base xl:w-[80ch]
                    xl:mb-[6.5rem] 2xl:text-lg 2xl:w-[88ch] 2xl:mb-[8.5rem]">
                        {movie.overview}
                    </p>

                    <div className="flex justify-center gap-5 items-center sm:gap-7 
                    sm:mb-[2.5rem] lg:hidden">
                        <div className="flex items-center gap-1">
                            <img className="w-4 h-4" src={star} alt="Rating Icon"/>
                            <h3 className="text-slate-400 text-sm sm:text-base">
                                {movie.vote_average?.toFixed(1) || "N/A"}
                            </h3>
                        </div>
                        <div className="flex items-center gap-1">
                            <img className="w-4 h-4" src={clock} alt="Runtime Icon"/>
                            <h3 className="text-slate-400 text-sm sm:text-base">
                                {formatRuntime(movie.runtime || movie.episode_run_time?.[0])}
                            </h3>
                        </div>
                        <div className="flex items-center gap-1">
                            <img className="w-4 h-4" src={calendar} alt="Year Icon"/>
                            <h3 className="text-slate-400 text-sm sm:text-base">
                                {(movie.release_date || movie.first_air_date || "").substring(0, 4) || "N/A"}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mb-8 px-4 lg:hidden">
                <button className="bg-slate-800 text-slate-400 text-sm font-[600]
                inline-flex items-center gap-2 p-3 rounded-[3rem] hover:bg-slate-700
                 transition-colors">
                    <img className="w-4 h-4" src={playBtn} alt="Play Icon"
                    draggable="false"/>
                    Watch Trailer
                </button>
            </div>

            {movie.genres?.length > 0 && (
                <div className="mx-[2rem] mt-4 lg:mt-[3rem] 2xl:ml-[3.4rem]">
                    <h1 className="text-white text-lg font-[650] mb-[1rem] md:text-xl
                    lg:text-2xl lg:mb-[1.5rem]">
                        Genres
                    </h1>
                    <div className="flex flex-wrap gap-1 md:gap-2 lg:gap-3">
                        {movie.genres.map(genre => (
                            <p key={genre.id} className={GENRES}>{genre.name}</p>
                        ))}
                    </div>
                </div>
            )}

            {movie.overview && (
                <div className="mx-[2rem] mt-[2rem] lg:hidden">
                    <h1 className="text-white text-lg font-[650] mb-[.7rem] md:text-xl">
                        Summary
                    </h1>
                    <p className="text-slate-400 text-sm leading-relaxed md:text-base">
                        {movie.overview}
                    </p>
                </div>
            )}

            {cast.length > 0 && (
                <div className="ml-[2rem] mt-[2rem] 2xl:ml-0 md:mt-[3rem] xl:mt-[4rem]">
                    <h1 className="text-white text-lg font-[650] mb-[1rem] md:text-xl
                    lg:text-2xl lg:mb-[1.5rem] 2xl:ml-[3.4rem]">
                        Cast
                    </h1>
                    <div className="flex gap-5 overflow-x-auto whitespace-nowrap
                    custom-scrollbar lg:gap-10 xl:gap-15 2xl:gap-20 2xl:ml-[3.4rem]">
                        {cast.map(actor => (
                            <div key={actor.id} className="flex-shrink-0 text-center
                            w-24 cursor-pointer" onClick={() => navigate(`/actor/${actor.id}`)}>
                                <div className="mb-2 w-[6rem] h-[8.5rem] bg-slate-800
                                rounded-[1rem] overflow-hidden border-[#ffffff00]
                                border-[2.5px] hover:border-[#b71234] transition-colors
                                duration-[.25s] md:w-[6rem] md:h-[8.5rem] lg:w-[7rem]
                                lg:h-[10rem] lg:mb-[.7rem] xl:mb-[1rem] xl:w-[8rem]
                                xl:h-[12rem] 2xl:w-[9rem] 2xl:h-[13rem]">
                                    {actor.profile_path ? (
                                        <img src={`${TMDB_PROFILE_BASE_URL}${actor.profile_path}`} 
                                        alt={actor.name} className="w-full h-full object-cover"/>
                                    ) : (
                                        <span className="text-xs text-slate-400">No Image</span>
                                    )}
                                </div>
                                <h3 style={LINE_CLAMP3} className="text-left text-sm
                                text-slate-300 font-[550] mb-1 w-[6rem] xl:text-base xl:w-[8rem]">
                                    {actor.name}
                                </h3>
                                <p style={LINE_CLAMP3} className="text-left text-xs
                                text-slate-500 font-[550] w-[6rem] xl:text-base xl:w-[8rem]">
                                    {actor.character}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {similar.length > 0 && (
                <div className="ml-[2rem] mt-[2rem] 2xl:ml-0 md:mt-[3rem] xl:mt-[4rem]">
                    <h1 className="text-white text-lg font-[650] mb-[1rem] md:text-xl
                    lg:text-2xl lg:mt-[3rem] lg:mb-[1.5rem] 2xl:ml-[3.4rem]">
                        More Like This
                    </h1>
                    <div className="flex gap-5 overflow-x-auto whitespace-nowrap
                    custom-scrollbar lg:gap-10 xl:gap-15 2xl:gap-20 2xl:ml-[3.4rem]">
                        {similar.map(similarItem => {
                            const isMovie = Boolean(similarItem.title);
                            const type = isMovie ? "movie" : "tv";
                            return (
                                <div key={similarItem.id} className="flex-shrink-0
                                text-center w-24 cursor-pointer"
                                onClick={() => navigate(`/${type}/${similarItem.id}`)}>
                                    <div className="mb-2 w-[6rem] h-[8.5rem] bg-slate-800
                                    rounded-[1rem] overflow-hidden border-[#ffffff00] border-[2.5px]
                                    hover:border-[#b71234] transition-colors duration-[.25s]
                                    md:w-[6rem] md:h-[8.5rem] lg:w-[7rem] lg:h-[10rem] lg:mb-[.7rem]
                                    xl:mb-[1rem] xl:w-[8rem] xl:h-[12rem] 2xl:w-[9rem] 2xl:h-[13rem]">
                                        {similarItem.poster_path ? (
                                            <img src={`${TMDB_POSTER_BASE_URL}${similarItem.poster_path}`} 
                                            alt={similarItem.title || similarItem.name} 
                                            className="w-full h-full object-cover"/>
                                        ) : (
                                            <span className="text-xs text-slate-400">No Image</span>
                                        )}
                                    </div>
                                    <h3 style={LINE_CLAMP3} className="text-left text-sm
                                    text-slate-300 font-[550] mb-1 w-[6rem] xl:text-base
                                    xl:w-[8rem]">
                                        {similarItem.title || similarItem.name}
                                    </h3>
                                    <p className="text-left text-xs text-slate-500
                                    font-[550] w-[6rem] xl:text-base xl:w-[8rem]">
                                        {(similarItem.release_date || similarItem.first_air_date || "").substring(0, 4) || "N/A"}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            <Footer/>
        </div>
    );
}

export default Movie;
