function AnimatedMovies() {
    return (
        <div className="mt-[2.5rem] flex flex-col">
            <h1 className="mx-[2rem] text-sm font-[550]">Popular Animated Movies</h1>
            <div className="ml-[2rem] flex gap-5 overflow-x-auto whitespace-nowrap 
            scrollbar-hide">
                {/* Start of Movies: */}

                <div className="mt-[1rem] flex-shrink-0"> 
                    <div className="mb-[.5rem] w-[5rem] h-[7rem] bg-[#b71234]
                    rounded-[1rem]">
                        <img src="(movie poster here)" alt="" className="w-full h-full
                        object-cover rounded-[1rem]"/>
                    </div>
                    <h3 className="text-xs text-slate-400 font-[600]
                    mb-[.25rem] w-[5rem] overflow-hidden text-ellipsis
                    line-clamp-2">Movie Title</h3>
                    <p className="text-xs text-slate-600 font-[600]">8.8</p>
                </div>

                <div className="mt-[1rem] flex-shrink-0"> 
                    <div className="mb-[.5rem] w-[5rem] h-[7rem] bg-[#b71234]
                    rounded-[1rem]">
                        <img src="(movie poster here)" alt="" className="w-full h-full
                        object-cover rounded-[1rem]"/>
                    </div>
                    <h3 className="text-xs text-slate-400 font-[600]
                    mb-[.25rem] w-[5rem] overflow-hidden text-ellipsis
                    line-clamp-2">Movie Title</h3>
                    <p className="text-xs text-slate-600 font-[600]">8.8</p>
                </div>

                <div className="mt-[1rem] flex-shrink-0"> 
                    <div className="mb-[.5rem] w-[5rem] h-[7rem] bg-[#b71234]
                    rounded-[1rem]">
                        <img src="(movie poster here)" alt="" className="w-full h-full
                        object-cover rounded-[1rem]"/>
                    </div>
                    <h3 className="text-xs text-slate-400 font-[600]
                    mb-[.25rem] w-[5rem] overflow-hidden text-ellipsis
                    line-clamp-2">Movie Title</h3>
                    <p className="text-xs text-slate-600 font-[600]">8.8</p>
                </div>

                <div className="mt-[1rem] flex-shrink-0"> 
                    <div className="mb-[.5rem] w-[5rem] h-[7rem] bg-[#b71234]
                    rounded-[1rem]">
                        <img src="(movie poster here)" alt="" className="w-full h-full
                        object-cover rounded-[1rem]"/>
                    </div>
                    <h3 className="text-xs text-slate-400 font-[600]
                    mb-[.25rem] w-[5rem] overflow-hidden text-ellipsis
                    line-clamp-2">Movie Title</h3>
                    <p className="text-xs text-slate-600 font-[600]">8.8</p>
                </div>

                {/* End of Movies: */}
            </div>
        </div>
    )
}

export default AnimatedMovies;