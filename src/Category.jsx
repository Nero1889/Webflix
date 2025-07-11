import {useState} from "react";

function Category() {
    const [SELECTED_CATEGORY, setSelectedCategory] = useState("All");
    const CATEGORIES = [
        "All", 
        "Drama", 
        "Crime", 
        "Action", 
        "Romance", 
        "Sci-Fi", 
        "Horror", 
        "Adventure", 
        "Shows",
        "Documentary",
    ];

    const BASE_CAT = `bg-slate-800 text-xs font-[600] inline-block px-3 py-2 
    rounded-[3rem] mr-2 mb-2 cursor-pointer hover:bg-slate-700 transition-color 
    duration-[.25s]`;

    return (
        <section className="mt-[2.5rem] flex flex-col">
            <h1 className="mx-[2rem] text-sm font-[650]">Category</h1>
            <div className="ml-[2rem] mt-[1rem] flex items-center gap-1 overflow-x-auto 
            whitespace-nowrap scrollbar-hide">
                {CATEGORIES.map((category) => (
                    <p key={category}
                    className={`${BASE_CAT} 
                    ${SELECTED_CATEGORY === category 
                    ? "text-white" 
                    : "text-slate-400"}`}
                    onClick={() => setSelectedCategory(category)}>
                        {category}
                    </p>
                ))}
            </div>
        </section>
    );
}

export default Category;
