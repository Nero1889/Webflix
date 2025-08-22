import React, {useState, useEffect} from "react";
import Header from "./Header.jsx";
import Hero from "./Hero.jsx";
import Category from "./Category.jsx";
import Footer from "./Footer.jsx";
import Animated from "./Animated.jsx";
import Categories from "./Categories.jsx";

const MOVIE_DATA = {
    Animated: [
        {id: 354912, type: "movie"},   // Coco
        {id: 8587, type: "movie"},     // The Lion King
        {id: 502356, type: "movie"},   // The Super Mario Bros. Movie
        {id: 808, type: "movie"},      // Shrek
        {id: 9806, type: "movie"},     // The Incredibles
        {id: 569094, type: "movie"},   // Spider-Man: Across the Spider-Verse
        {id: 12, type: "movie"},       // Finding Nemo
        {id: 49444, type: "movie"},    // Kung Fu Panda 2
        {id: 953, type: "movie"},      // Madagascar
        {id: 10191, type: "movie"},    // How to Train Your Dragon
        {id: 109445, type: "movie"},   // Frozen
        {id: 585, type: "movie"},      // Monsters, Inc.
        {id: 46195, type: "movie"},    // Rio
        {id: 227973, type: "movie"},   // The Peanuts Movie
        {id: 1022789, type: "movie"},  // Inside Out 2
        {id: 44896, type: "movie"},    // Rango
    ],
    Action: [
        {id: 299536, type: "movie"},   // Avengers: Infinity War
        {id: 140607, type: "movie"},   // Star Wars: The Force Awakens
        {id: 124905, type: "movie"},   // Godzilla
        {id: 634649, type: "movie"},   // Spider-Man No Way Home
        {id: 286217, type: "movie"},   // The Martian
        {id: 20526, type: "movie"},    // Tron: Legacy
        {id: 559, type: "movie"},      // Spider-Man 3
        {id: 1930, type: "movie"},     // The Amazing Spider-Man
        {id: 823464, type: "movie"},   // Godzilla x Kong: The New Empire
        {id: 533535, type: "movie"},   // Deadpool & Wolverine
        {id: 19995, type: "movie"},    // Avatar
        {id: 329, type: "movie"},      // Jurassic Park
        {id: 299534, type: "movie"},   // Avengers: Endgame
        {id: 91314, type: "movie"},    // Transformers: Age of Extinction  
        {id: 155, type: "movie"},      // The Dark Knight
        {id: 37724, type: "movie"},    // Skyfall
    ],
    Adventure: [
        {id: 135397, type: "movie"},   // Jurassic World
        {id: 38356, type: "movie"},    // Transformers: Dark of the Moon
        {id: 330459, type: "movie"},   // Rogue One: A Star Wars Story
        {id: 1724, type: "movie"},     // The Incredible Hulk
        {id: 324857, type: "movie"},   // Spider-Man: Into the Spider-Verse
        {id: 920, type: "movie"},      // Cars
        {id: 508947, type: "movie"},   // Turning Red
        {id: 12092, type: "movie"},    // Alice in Wonderland
        {id: 293167, type: "movie"},   // Kong: Skull Island
        {id: 260513, type: "movie"},   // Incredibles 2
        {id: 10681, type: "movie"},    // WALL·E
        {id: 217, type: "movie"},      // Indiana Jones and the Kingdom of the Crystal Skull
        {id: 1771, type: "movie"},     // Captain America: The First Avenger
        {id: 20526, type: "movie"},    // TRON: Legacy
        {id: 127380, type: "movie"},   // Finding Dory
        {id: 7248, type: "tv"},        // The Magic School Bus
    ],
    Anime: [
        {id: 85937, type: "tv"},       // Demon Slayer: Kimetsu no Yaiba
        {id: 149, type: "movie"},      // Akira
        {id: 890, type: "tv"},         // Neon Genesis Evangelion
        {id: 69291, type: "tv"},       // Miss Kobayashi's Dragon Maid
        {id: 95479, type: "tv"},       // JUJUTSU KAISEN
        {id: 123876, type: "tv"},      // Komi Can't Communicate
        {id: 65930, type: "tv"},       // My Hero Academia
        {id: 1429, type: "tv"},        // Attack on Titan
        {id: 12971, type: "tv"},       // Dragon Ball Z
        {id: 120089, type: "tv"},      // SPY x FAMILY
        {id: 30984, type: "tv"},       // Bleach
        {id: 240411, type: "tv"},      // Dan Da Dan
        {id: 382190, type: "movie"},   // Pokemon the Movie: Volcanion and the Mechanical Marvel
        {id: 114410, type: "tv"},      // Chainsaw Man
        {id: 46260, type: "tv"},       // Naruto
        {id: 37854, type: "tv"},       // One Piece
    ],
    Comedy: [
        {id: 315162, type: "movie"},   // Puss in Boots: The Last Wish
        {id: 854, type: "movie"},      // The Mask
        {id: 177572, type: "movie"},   // Big Hero 6
        {id: 809, type: "movie"},      // Shrek 2
        {id: 615, type: "tv"},         // Futurama
        {id: 2190, type: "tv"},        // South Park
        {id: 126506, type: "tv"},      // Smiling Friends
        {id: 73723, type: "movie"},    // The Lorax
        {id: 1400, type: "tv"},        // Seinfeld
        {id: 76492, type: "movie"},    // Hotel Transylvania
        {id: 400155, type: "movie"},   // Hotel Transylvania 3: Summer Vacation
        {id: 502356, type: "movie"},   // The Super Mario Bros. Movie
        {id: 150540, type: "movie"},   // Inside Out
        {id: 93456, type: "movie"},    // Dispicable Me 2
        {id: 116741, type: "movie"},   // The Internship
        {id: 771, type: "movie"},      // Home Alone
    ],
    Crime: [
        {id: 475557, type: "movie"},   // Joker
        {id: 414906, type: "movie"},   // The Batman
        {id: 559969, type: "movie"},   // El Camino: A Breaking Bad Movie
        {id: 111, type: "movie"},      // Scarface
        {id: 238, type: "movie"},      // The Godfather
        {id: 4357, type: "tv"},        // Mission Impossible
        {id: 6977, type: "movie"},     // No Country For Old Men
        {id: 5548, type: "movie"},     // RoboCop
        {id: 573435, type: "movie"},   // Bad Boys: Rider or Die
        {id: 272, type: "movie"},      // Batman Begins
        {id: 458156, type: "movie"},   // John Wick: Chapter 3 - Parabellum
        {id: 38055, type: "movie"},    // Megamind
        {id: 680, type: "movie"},      // Pulp Fiction
        {id: 1359, type: "movie"},     // American Psycho
        {id: 558, type: "movie"},      // Spider-Man 2
        {id: 27205, type: "movie"},    // Inception
    ],
    Drama: [
        {id: 9479, type: "movie"},     // The Nightmare Before Christmas
        {id: 872585, type: "movie"},   // Oppenheimer
        {id: 93405, type: "tv"},       // Squid Game
        {id: 1396, type: "tv"},        // Breaking Bad
        {id: 597, type: "movie"},      // Titanic
        {id: 98, type: "movie"},       // Gladiator
        {id: 475557, type: "movie"},   // Joker
        {id: 66732, type: "tv"},       // Stranger Things
        {id: 14161, type: "movie"},    // 2012
        {id: 49026, type: "movie"},    // The Dark Knight Rises
        {id: 1417, type: "tv"},        // Glee
        {id: 84892, type: "movie"},    // The Perks of Being a Wallflower
        {id: 238, type: "movie"},      // The Godfather
        {id: 216015, type: "movie"},   // Fifty Shades of Grey
        {id: 496243, type: "movie"},   // Parasite
        {id: 4057, type: "tv"},        // Criminal Minds
    ],
    Horror: [
        {id: 574475, type: "movie"},   // Final Destination Bloodlines
        {id: 940721, type: "movie"},   // Godzilla Minus One
        {id: 507089, type: "movie"},   // Five Nights at Freddy's
        {id: 4488, type: "movie"},     // Friday the 13th
        {id: 578, type: "movie"},      // Jaws
        {id: 4232, type: "movie"},     // Scream
        {id: 1034541, type: "movie"},  // Terrifier 3
        {id: 694, type: "movie"},      // The Shining
        {id: 917496, type: "movie"},   // Beetlejuice
        {id: 138843, type: "movie"},   // The Conjuring
        {id: 176, type: "movie"},      // Saw
        {id: 1091, type: "movie"},     // The Thing
        {id: 609, type: "movie"},      // Poltergeist
        {id: 346364, type: "movie"},   // It
        {id: 9373, type: "movie"},     // The Texas Chainsaw Massacre
        {id: 424139, type: "movie"},   // Halloween
    ],
    Romance: [
        {id: 10681, type: "movie"},    // WALL·E
        {id: 533444, type: "movie"},   // Waves
        {id: 597, type: "movie"},      // Titanic
        {id: 313369, type: "movie"},   // La La Land
        {id: 8966, type: "movie"},     // Twilight
        {id: 812, type: "movie"},      // Aladdin
        {id: 10020, type: "movie"},    // Beauty and the Beast
        {id: 475, type: "movie"},      // Bonnie and Clide
        {id: 123876, type: "tv"},      // Komi Can't Communicate
        {id: 667520, type: "movie"},   // A Whisker Away
        {id: 372058, type: "movie"},   // Your Name
        {id: 795, type: "movie"},      // City of Angels
        {id: 46195, type: "movie"},    // Rio
        {id: 584288, type: "movie"},   // Sylvie's Love
        {id: 11036, type: "movie"},    // The Notebook
        {id: 18240, type: "movie"},    // The Proposal
    ],
    "Sci-Fi": [
        {id: 181808, type: "movie"},   // Star Wars: The Last Jedi
        {id: 62, type: "movie"},       // 2001: A Space Odyssey
        {id: 1891, type: "movie"},     // The Empire Strikes Back
        {id: 603, type: "movie"},      // The Matrix
        {id: 218, type: "movie"},      // The Terminator
        {id: 1895, type: "movie"},     // Star Wars: Episode III - Revenge of the Sith
        {id: 348, type: "movie"},      // Alien
        {id: 1858, type: "movie"},     // Transformers
        {id: 157336, type: "movie"},   // Interstellar
        {id: 49047, type: "movie"},    // Gravity
        {id: 11, type: "movie"},       // Star Wars
        {id: 286217, type: "movie"},   // The Martian
        {id: 1726, type: "movie"},     // Iron Man
        {id: 99861, type: "movie"},    // Avengers: Age of Ultron
        {id: 68726, type: "movie"},    // Pacific Rim
        {id: 693134, type: "movie"},   // Dune: Part Two
    ],
    Shows: [
        {id: 1396, type: "tv"},        // Breaking Bad
        {id: 2316, type: "tv"},        // The Office
        {id: 60625, type: "tv"},       // Rick and Morty
        {id: 82856, type: "tv"},       // The Mandalorian
        {id: 60059, type: "tv"},       // Better Call Saul   
        {id: 37606, type: "tv"},       // The Amazing World of Gumball
        {id: 66732, type: "tv"},       // Stranger Things
        {id: 60572, type: "tv"},       // Pokemon
        {id: 387, type: "tv"},         // SpongeBob SquarePants
        {id: 2370, type: "tv"},        // Hell's Kitchen
        {id: 40075, type: "tv"},       // Gravity Falls
        {id: 456, type: "tv"},         // The Simpsons
        {id: 1668, type: "tv"},        // Friends
        {id: 607, type: "tv"},         // The Powerpuff Girls
        {id: 83867, type: "tv"},       // Andor
        {id: 93405, type: "tv"},       // Squid Game
    ],
};

function HomePage() {
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const allCategoryKeys = Object.keys(MOVIE_DATA);
    const initialCategories = ["Action", "Adventure", "Anime"];

    const getVisibleCategories = () => {
        if (selectedCategory !== "All") {
            return [selectedCategory];
        } else {
            return showAllCategories ? allCategoryKeys : initialCategories;
        }
    };

    const visibleCategories = getVisibleCategories();

    useEffect(() => {
        if (selectedCategory !== "All" && showAllCategories) setShowAllCategories(false);
    }, [selectedCategory, showAllCategories]);

    const handleCategorySelect = (category) => setSelectedCategory(category);

    return (
        <>
            <Header/>
            <Hero/>
            <Animated/>
            <Category onCategorySelect={handleCategorySelect}
            selectedCategory={selectedCategory}/>

            {visibleCategories.map((category) => (
                <Categories key={category} title={category}
                movies={MOVIE_DATA[category]}/>
            ))}

            {selectedCategory === "All" && !showAllCategories &&
            visibleCategories.includes("Anime") && (
                <div className="flex justify-center mt-5">
                    <button className="bg-slate-800 text-white text-xs font-[600]
                    px-5 py-3 rounded-[3rem] hover:bg-slate-700 transition-colors
                    duration-[.25s] md:mt-[1rem] md:text-sm lg:text-base"
                    onClick={() => setShowAllCategories(true)}>
                        Show More
                    </button>
                </div>
            )}

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