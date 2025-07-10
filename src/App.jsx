import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./HomePage";
import Movie from "./Movie.jsx";
import Actor from "./Actor.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/movie/:id" element={<Movie/>}/>
            <Route path="/actor/:actorId" element={<Actor/>}/>
        </Routes>
    );
}

export default App;
