import Categories from "./Categories.jsx";

const ANIMATED_MOVIES = [
    {id: 354912, type: "movie"},    // Coco
    {id: 8587, type: "movie"},      // The Lion King
    {id: 502356, type: "movie"},    // The Super Mario Bros. Movie
    {id: 808, type: "movie"},       // Shrek
    {id: 9806, type: "movie"},      // The Incredibles
    {id: 569094, type: "movie"},    // Spider-Man: Across the Spider-Verse
    {id: 12, type: "movie"},        // Finding Nemo
    {id: 49444, type: "movie"},     // Kung Fu Panda 2
    {id: 953, type: "movie"},       // Madagascar
    {id: 10191, type: "movie"},     // How to Train Your Dragon
    {id: 109445, type: "movie"},    // Frozen
    {id: 585, type: "movie"},       // Monsters, Inc.
    {id: 46195, type: "movie"},     // Rio
    {id: 227973, type: "movie"},    // The Peanuts Movie
    {id: 1022789, type: "movie"},   // Inside Out 2
    {id: 44896, type: "movie"},     // Rango
];

function AnimatedRow() {
    return (
        <Categories title="Popular Animated Movies" movies={ANIMATED_MOVIES}/>
    );
}

export default AnimatedRow;