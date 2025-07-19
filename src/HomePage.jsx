import React, {useState, useEffect} from "react";
import Header from "./Header.jsx";
import Hero from "./Hero.jsx";
import Animated from "./Animated.jsx";
import Category from "./Category.jsx";
import Action from "./Action.jsx";
import Adventure from "./Adventure.jsx";
import Anime from "./Anime.jsx";
import Comedy from "./Comedy.jsx";
import Crime from "./Crime.jsx";
import Drama from "./Drama.jsx";
import Horror from "./Horror.jsx";
import Romance from "./Romance.jsx";
import SciFi from "./SciFi.jsx";
import Shows from "./Shows.jsx";
import About from "./About.jsx";
import Footer from "./Footer.jsx";

function HomePage() {
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const CATEGORIES = {
        Action: <Action/>,
        Adventure: <Adventure/>,
        Anime: <Anime/>,
        Comedy: <Comedy/>,
        Crime: <Crime/>,
        Drama: <Drama/>,
        Horror: <Horror/>,
        Romance: <Romance/>,
        "Sci-Fi": <SciFi/>,
        Shows: <Shows/>,
    };

    const initialCategories = ["Action", "Adventure", "Anime"];

    const getVisibleComponents = () => {
        if (selectedCategory !== "All") {
            const ComponentToShow = CATEGORIES[selectedCategory];
            return ComponentToShow ? [ComponentToShow] : [];
        } else {
            const components = [];
            if (showAllCategories) {
                for (const key in CATEGORIES) {
                    components.push(CATEGORIES[key]);
                }
            } else {
                initialCategories.forEach(cat => {
                    components.push(CATEGORIES[cat]);
                });
            }
            return components;
        }
    };

    const visibleComponents = getVisibleComponents();

    useEffect(() => {
        if (selectedCategory !== "All" && showAllCategories) {
            setShowAllCategories(false);
        }
    }, [selectedCategory, showAllCategories]);

    const handleCategorySelect = (category) => setSelectedCategory(category);
    
    return (
        <>
            <Header/>
            <Hero/>
            <Animated/>
            <Category onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory}/>
            {visibleComponents.map((Component, i) => (
                <React.Fragment key={Component.type.name || i}>
                    {Component}
                    {selectedCategory === "All" && !showAllCategories && Component.type.name === "Anime" && (
                        <div className="flex justify-center mt-5">
                            <button className="bg-slate-800 text-white text-xs font-[600]
                            px-5 py-3 rounded-[3rem] hover:bg-slate-700 transition-colors
                            duration-[.25s] md:mt-[1rem] md:text-sm lg:text-base" 
                            onClick={() => setShowAllCategories(true)}>
                                Show More
                            </button>
                        </div>
                    )}
                </React.Fragment>
            ))}
            {selectedCategory === "All" && showAllCategories && (
                <div className="flex justify-center mt-5 mb-10">
                    <button className="bg-slate-800 text-white text-xs font-[600]
                            px-5 py-3 rounded-[3rem] hover:bg-slate-700 transition-colors
                            duration-[.25s] md:mt-[1rem] md:text-sm lg:text-base" 
                            onClick={() => setShowAllCategories(false)}>
                        Show Less
                    </button>
                </div>
            )}
            <Footer/>
        </>
    );
}

export default HomePage;
