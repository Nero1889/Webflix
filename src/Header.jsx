import React, { useState } from "react";
import search from "./assets/search.png";
import menu from "./assets/menu.png"; 
import close from "./assets/close.png"; 

import home from "./assets/home.png";
import about from "./assets/about.png";
import contact from "./assets/contact.png";
import portfolio from "./assets/portfolio.png";

function Header() {
    const [IS_MENU_OPEN, setIsMenuOpen] = useState(false);

    const TOGGLE_MENU = () => setIsMenuOpen(!IS_MENU_OPEN);

    const MENU_ICON_SRC = IS_MENU_OPEN ? close : menu;

    return (
        <>
            <header className="p-7 flex items-center justify-between sticky top-0
            bg-slate-950 w-full z-10 text-white">
                <h1 className="text-xl font-semibold">Webflix</h1>
                <div className="flex gap-5 items-center">
                    <button className="bg-slate-800 p-2 rounded-full flex items-center
                    justify-center" onClick={() => alert("Search!")}>
                        <img className="w-7 h-7" src={search} alt="Search Icon"
                        draggable="false"/>
                    </button>
                    <button className="bg-[#b71234] p-2 rounded-full flex items-center
                    justify-center md:hidden" onClick={TOGGLE_MENU}>
                        <img className="w-7 h-7" src={MENU_ICON_SRC}
                        alt={IS_MENU_OPEN ? "Close menu" : "Open menu"}
                        draggable="false"/>
                    </button>
                    <nav className="hidden md:block">
                        <ul className="flex gap-8 text-lg">
                            <li>
                                <a href="#home" className="hover:text-[#b71234]
                                transition-colors duration-200">Home</a>
                            </li>
                            <li>
                                <a href="#about" className="hover:text-[#b71234] 
                                transition-colors duration-200">About</a>
                            </li>
                            <li>
                                <a href="#contact" className="hover:text-[#b71234] 
                                transition-colors duration-200">Contact</a>
                            </li>
                            <li>
                                <a href="#portfolio" className="hover:text-[#b71234] 
                                transition-colors duration-200">Portfolio</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <div className={`fixed left-0 w-full bg-slate-950 z-90 shadow-lg
            flex flex-col ${IS_MENU_OPEN ? "visible" : "opacity-0 invisible"}`}>
            <nav className="w-full">
                <ul className="list-none flex flex-col items-start gap-2 p-4 w-full">
                    <li onClick={TOGGLE_MENU} className="flex items-center ml-5
                    w-[calc(100%-3.5rem)]">
                        <img src={home} alt="Home Icon" className="w-7 h-7"/>
                        <a href="#home" className="text-white text-xl py-2 px-4
                        block">Home</a>
                    </li>
                    <div className="bg-slate-500 w-full h-[1px] my-2"></div>
                    <li onClick={TOGGLE_MENU} className="flex items-center ml-5
                    w-[calc(100%-3.5rem)]">
                        <img src={about} alt="About Icon" className="w-7 h-7"/>
                        <a href="#about" className="text-white text-xl py-2 px-4
                        block">About</a>
                    </li>
                    <div className="bg-slate-500 w-full h-[1px] my-2"></div>
                    <li onClick={TOGGLE_MENU} className="flex items-center ml-5
                    w-[calc(100%-3.5rem)]">
                        <img src={contact} alt="Contact Icon" className="w-7 h-7"/>
                        <a href="#contact" className="text-white text-xl py-2 px-4
                        block">Contact</a>
                    </li>
                    <div className="bg-slate-500 w-full h-[1px] my-2"></div>
                    <li onClick={TOGGLE_MENU} className="flex items-center ml-5
                    w-[calc(100%-3.5rem)]">
                        <img src={portfolio} alt="Portfolio Icon" className="w-7 h-7"/>
                        <a href="#portfolio" className="text-white text-xl py-2 px-4
                        block">Portfolio</a>
                    </li>
                </ul>
            </nav>
        </div>
        </>
    );
}

export default Header;
