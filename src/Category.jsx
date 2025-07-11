function Category() {
    const CATEGORY = `bg-slate-800 text-slate-400 text-xs font-[600] inline-block px-3 py-2 rounded-[3rem] mr-2 mb-2`;
    
    return (
        <section className="mt-[2.5rem] flex flex-col">
            <h1 className="mx-[2rem] text-sm font-[650]">Category</h1>
            <div className="ml-[2rem] mt-[1rem] flex items-center gap-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
                <p className={CATEGORY}>All</p>
                <p className={CATEGORY}>Drama</p>
                <p className={CATEGORY}>Crime</p>
                <p className={CATEGORY}>Action</p>
                <p className={CATEGORY}>Romance</p>
                <p className={CATEGORY}>Sci-Fi</p>
                <p className={CATEGORY}>Horror</p>
                <p className={CATEGORY}>Adventure</p>
                <p className={CATEGORY}>Shows</p>
            </div>
        </section>
    );
}

export default Category;
