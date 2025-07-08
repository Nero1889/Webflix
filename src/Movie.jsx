import spiderman from "./assets/spiderManHomecoming.png";
import star from "./assets/star.png";
import clock from "./assets/clock.png";
import calendar from "./assets/calendar.png";
import playBtn from "./assets/playButton.png";

/* ====================================================================================== 
      NOTE!!! This Component is still in development, but NOT in pre-production yet!
====================================================================================== */

function Movie() {
    const GENRES = `bg-slate-800 text-slate-400 text-xs 
    font-[600] inline p-3 rounded-[3rem]`;

    return (
        <div>
            <div className="relative bg-black mb-[1rem]">
                <img className="opacity-50 z-0 w-full" src={spiderman} alt="Spider-Man: Homecoming Poster"/>
                <div className="absolute inset-0 bg-gradient-to-t from-[#010617] from-0% via-[transparent] via-34% to-transparent to-50% z-0"></div>
                <div className="absolute bottom-4 left-0 right-0 px-4 z-5 text-white">
                    <h1 className="text-base font-[650] text-center mb-2">
                        Spider-Man: Homecoming
                    </h1>
                    <div className="flex justify-center gap-5">
                        <div className="flex items-center gap-1">
                            <img className="w-4 h-4" src={star} alt="Star Icon"/>
                            <h3 className="text-slate-400 text-xs">7.1</h3>
                        </div>
                        <div className="flex items-center gap-1">
                            <img className="w-4 h-4" src={clock} alt="Clock Icon"/>
                            <h3 className="text-slate-400 text-xs">2h 13m</h3>
                        </div>
                        <div className="flex items-center gap-1">
                            <img className="w-4 h-4" src={calendar} alt="Calendar Icon"/>
                            <h3 className="text-slate-400 text-xs">2017</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <button className="bg-slate-800 text-slate-400 text-xs font-[600] inline-flex items-center gap-2 p-3 rounded-[3rem]">
                    <img className="w-[1rem] h-[1rem]" src={playBtn} alt="Play Button Icon" draggable="false"/>
                    Watch Trailer
                </button>
            </div>

            <div className="ml-[2rem] mt-[1rem]">
                <h1 className="text-white text-base font-[600]">Genres</h1>
                <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide mt-[1rem]">
                    <p className={GENRES}>Action</p>
                    <p className={GENRES}>Adventure</p>
                    <p className={GENRES}>Superhero</p>
                    <p className={GENRES}>Sci-fi</p>
                </div>
            </div>
            
            <div className="mx-[2rem] mt-[3rem]">
                <h1 className="text-white text-base font-[600]">Summary</h1>
                <p className="text-slate-600 text-sm font-[600] mt-[1rem]">Following the
                events of Captain America: Civil War, Peter Parker, with the help of his
                mentor Tony Stark, tries to balance his life as an ordinary high school
                student in Queens, New York City, with fighting crime as his superhero 
                alter ego Spider-Man as a new threat, the Vulture, emerges.</p>
            </div>

            <div className="mx-[2rem] mt-[3rem]">
                <h1 className="text-white text-base font-[600] mb-[1rem]">
                    Cast and Crew
                </h1>
                <div className="flex gap-5 overflow-x-auto whitespace-nowrap scrollbar-hide mt-[1rem]">
                    <div className="flex-shrink-0">
                        <div className="mb-[.5rem] w-[6rem] h-[8rem] bg-[#b71234] rounded-[1rem]">
                            <img src="(movie poster here)" alt="" className="w-full h-full object-cover rounded-[1rem]"/>
                        </div>
                        <h3 className="text-xs text-slate-400 font-[600] mb-[.25rem] w-[6rem] break-words whitespace-normal">Actor's Name</h3>
                        <p className="text-xs text-slate-600 font-[600] w-[6rem] break-words whitespace-normal">
                            Character Name
                        </p>
                    </div>

                    <div className="flex-shrink-0">
                        <div className="mb-[.5rem] w-[6rem] h-[8rem] bg-[#b71234] rounded-[1rem]">
                            <img src="(movie poster here)" alt="" className="w-full h-full object-cover rounded-[1rem]"/>
                        </div>
                        <h3 className="text-xs text-slate-400 font-[600] mb-[.25rem] w-[6rem] break-words whitespace-normal">Actor's Name</h3>
                        <p className="text-xs text-slate-600 font-[600] w-[6rem] break-words whitespace-normal">
                            Character Name
                        </p>
                    </div>

                    <div className="flex-shrink-0">
                        <div className="mb-[.5rem] w-[6rem] h-[8rem] bg-[#b71234] rounded-[1rem]">
                            <img src="(movie poster here)" alt="" className="w-full h-full object-cover rounded-[1rem]"/>
                        </div>
                        <h3 className="text-xs text-slate-400 font-[600] mb-[.25rem] w-[6rem] break-words whitespace-normal">Actor's Name</h3>
                        <p className="text-xs text-slate-600 font-[600] w-[6rem] break-words whitespace-normal">
                            Character Name
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-[2rem] mt-[3rem]">
                <h1 className="text-white text-base font-[600] mb-[1rem]">
                    More Like This
                </h1>
                <div className="flex gap-5 overflow-x-auto whitespace-nowrap scrollbar-hide mt-[1rem]">
                    <div className="flex-shrink-0">
                        <div className="mb-[.5rem] w-[6rem] h-[8rem] bg-[#b71234] rounded-[1rem]">
                            <img src="(movie poster here)" alt="" className="w-full h-full object-cover rounded-[1rem]"/>
                        </div>
                        <h3 className="text-xs text-slate-400 font-[600] mb-[.25rem] w-[6rem] break-words whitespace-normal">Movie Title</h3>
                    </div>

                    <div className="flex-shrink-0">
                        <div className="mb-[.5rem] w-[6rem] h-[8rem] bg-[#b71234] rounded-[1rem]">
                            <img src="(movie poster here)" alt="" className="w-full h-full object-cover rounded-[1rem]"/>
                        </div>
                        <h3 className="text-xs text-slate-400 font-[600] mb-[.25rem] w-[6rem] break-words whitespace-normal">Movie Title</h3>
                    </div>

                    <div className="flex-shrink-0">
                        <div className="mb-[.5rem] w-[6rem] h-[8rem] bg-[#b71234] rounded-[1rem]">
                            <img src="(movie poster here)" alt="" className="w-full h-full object-cover rounded-[1rem]"/>
                        </div>
                        <h3 className="text-xs text-slate-400 font-[600] mb-[.25rem] w-[6rem] break-words whitespace-normal">Movie Title</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Movie;