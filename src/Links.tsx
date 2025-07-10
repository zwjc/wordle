import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Wordle from "./pages/Wordle";
import "./main.css";

function Links() {
    return (
        <Router>
            <div className="app">
                <nav className="navbar">
                    <ul className="nav-list">
                        <li className="nav-item"> <Link to="/"          className="nav-link">Home </Link> </li>
                        <li className="nav-item"> <Link to="/wordle"    className="nav-link">Wordle </Link> </li>
                        <li className="nav-item"> <Link to="/quiz"      className="nav-link">Quiz </Link> </li>
                        <li className="nav-item"> <Link to="/coding"    className="nav-link">Coding Exercises </Link> </li>
                        <li className="nav-item"> <Link to="/about"     className="nav-link">About </Link> </li>
                        <li className="nav-item"> <Link to="/geoguessr" className="nav-link">GeoGuessr </Link> </li>
                        <li className="nav-item"> <Link to="/tictactoe" className="nav-link">Tic Tac Toe </Link> </li>
                        <li className="nav-item"> <Link to="/hangman"   className="nav-link">Hangman </Link> </li>
                        <li className="nav-item"> <Link to="/sudoku"    className="nav-link">Sudoku </Link> </li>
                        <li className="nav-item"> <Link to="/crossword" className="nav-link">Crossword </Link> </li>
                    </ul> 
                </nav> 
                <Routes>
                    <Route path="/"             element={<Home />} />
                    <Route path="/wordle"       element={<Wordle />} />
                    <Route path="/quiz"         element={<div>Quiz Page</div>} />
                    <Route path="/coding"       element={<div>Coding Exercises Page</div>} />
                    <Route path="/about"        element={<div>About Page</div>} />
                    <Route path="/geoguessr"    element={<div>GeoGuessr Page</div>} />
                    <Route path="/tictactoe"    element={<div>Tic Tac Toe Page</div>} />
                    <Route path="/hangman"      element={<div>Hangman Page</div>} />
                    <Route path="/sudoku"       element={<div>Sudoku Page</div>} />
                    <Route path="/crossword"    element={<div>Crossword Page</div>} />
                    <Route path="/games"        element={<div>Collection of Games</div>} />
                </Routes>
            </div>
        </Router>
    );
} 

/**Add dark and light mode */

export default Links;