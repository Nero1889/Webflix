function Category({onCategorySelect, selectedCategory}) {
    const CATEGORIES = [
        "All",
        "Action",
        "Adventure",
        "Anime",
        "Comedy",
        "Crime",
        "Drama",
        "Horror",
        "Romance",
        "Sci-Fi",
        "Shows",
    ];

    const BASE_CAT = `bg-slate-800 text-xs font-[600] inline-block px-3 py-2
    rounded-[3rem] mr-2 mb-2 cursor-pointer hover:bg-slate-700 transition-color
    duration-[.25s] md:text-sm lg:px-5 lg:py-3`;

    return (
        <section className="mt-[2.5rem] flex flex-col">
            <h1 className="mx-[2rem] text-sm font-[650] md:text-base lg:text-lg 
            xl:text-xl xl:mb-[1rem]">Category</h1>
            <div className="ml-[2rem] mt-[1rem] flex items-center gap-1 overflow-x-auto
            whitespace-nowrap scrollbar-hide md:gap-2 lg:gap-3">
                {CATEGORIES.map((category) => (
                    <button key={category} className={`${BASE_CAT}
                    ${selectedCategory === category
                    ? "text-white"
                    : "text-slate-400"}`}
                    onClick={() => onCategorySelect(category)}>
                        {category}
                    </button>
                ))}
            </div>
        </section>
    );
}

export default Category;
