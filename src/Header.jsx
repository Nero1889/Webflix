import search from "./assets/search.png";
import menu from "./assets/menu.png";

function Header() {
    return (
        <div className="border-[1px] border-solid border-[#B71234] p-7 flex items-center
        justify-between">
            <h1 className="text-xl font-[600]">Webflix</h1>
            <div className="flex gap-5">
                <button className="text-sm bg-slate-800 p-2
                rounded-[10rem]" onClick={() => alert("Search!")}>
                    <img className="w-7" src={search} alt="Search Icon"
                    draggable="false"/>
                </button>
                <button className="text-sm bg-[#b71234] p-2
                rounded-[10rem]" onClick={() => alert("You opened the menu!")}>
                    <img className="w-7" src={menu} alt="Menu Icon" draggable="false"/>
                </button>
            </div>
        </div>
    );
}

export default Header;