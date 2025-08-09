import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./HomePage";
import Results from "./Results.jsx";
import Movie from "./Movie.jsx";
import Actor from "./Actor.jsx";
import About from "./About.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/results" element={<Results/>}/>
            <Route path="/movie/:id" element={<Movie/>}/>
            <Route path="/tv/:id" element={<Movie/>}/>
            <Route path="/actor/:actorId" element={<Actor/>}/>
            <Route path="/about" element={<About/>}/>
        </Routes>
    );
}

export default App;
