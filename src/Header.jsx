import React, {useState} from "react";
import search from "./assets/search.png";
import menu from "./assets/menu.png"; 
import close from "./assets/close.png"; 
import home from "./assets/home.png";
import about from "./assets/about.png";
import contact from "./assets/contact.png";
import portfolio from "./assets/portfolio.png";
import back from "./assets/back.png";

function Header() {
    const [IS_MENU_OPEN, setIsMenuOpen] = useState(false);
    const [IS_SEARCH_OPEN, setIsSearchOpen] = useState(false);

    const TOGGLE_MENU = () => setIsMenuOpen(!IS_MENU_OPEN);
    const MENU_ICON_SRC = IS_MENU_OPEN ? close : menu;

    return (
        <>
            <header className="p-7 flex items-center justify-between sticky top-0 
            bg-slate-950 w-full z-10 text-white">
                <h1 className="text-xl font-semibold">Webflix</h1>
                <div className="flex gap-5 items-center">
                    <button className="bg-slate-800 p-2 rounded-full flex items-center
                    justify-center" onClick={() => setIsSearchOpen(true)}>
                        <img className="w-7 h-7" src={search} alt="Search Icon"
                        draggable="false"/>
                    </button>
                    <button className="bg-[#b71234] p-2 rounded-full flex items-center
                    justify-center md:hidden" onClick={TOGGLE_MENU}>
                        <img className="w-7 h-7" src={MENU_ICON_SRC} alt={IS_MENU_OPEN ?
                        "Close menu" : "Open menu"} draggable="false"/>
                    </button>
                    <nav className="hidden md:block">
                        <ul className="flex gap-8 text-sm text-slate-400">
                            <li>
                                <a href="#home" className="hover:text-white
                                transition-colors duration-[.25s]">Home</a>
                            </li>
                            <li>
                                <a href="#about" className="hover:text-white
                                transition-colors duration-[.25s]">About</a>
                            </li>
                            <li>
                                <a href="#contact" className="hover:text-white
                                transition-colors duration-[.25s]">Contact</a>
                            </li>
                            <li>
                                <a href="#portfolio" className="hover:text-white
                                transition-colors duration-[.25s]">Portfolio</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <div className={`fixed left-0 w-full bg-slate-950 z-90 flex flex-col
            ${IS_MENU_OPEN ? "visible" : "invisible"}`}>
                <nav className="w-full">
                    <ul className="list-none flex flex-col items-start gap-2 p-4 w-full">
                        {[
                            {icon: home, label: "Home", href: "#home"},
                            {icon: about, label: "About", href: "#about"},
                            {icon: contact, label: "Contact", href: "#contact"},
                            {icon: portfolio, label: "Portfolio", href: "#portfolio"}
                        ].map(({icon, label, href}, i) => (
                            <React.Fragment key={label}>
                                <li onClick={TOGGLE_MENU} className="flex items-center 
                                ml-5 w-[calc(100%-3.5rem)]">
                                    <img src={icon} alt={`${label} Icon`} className="w-7
                                    h-7"/>
                                    <a href={href} className="text-white text-xl py-2 
                                    px-4 block">{label}</a>
                                </li>
                                {i < 3 && <div className="bg-slate-500 w-full h-[1px]
                                my-2"></div>}
                            </React.Fragment>
                        ))}
                    </ul>
                </nav>
            </div>
            
            {IS_SEARCH_OPEN && (
                <div className="fixed inset-0 bg-slate-950 z-[100]">
                    <div className="flex items-start  mt-2 p-5">
                        <button onClick={() => setIsSearchOpen(false)} className="flex
                        items-center">
                            <img src={back} alt="Back" className="w-10 h-10 mr-5" 
                            draggable="false"/>
                        </button>
                        <input type="text" placeholder="Search!" className="w-[75%]
                        h-[2.7rem] bg-slate-800 text-white p-4 rounded-[7rem]
                        focus:outline-none text-sm"
                        autoFocus/>
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;
