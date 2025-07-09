import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Wordle from "./pages/Wordle";
import "./main.css";

function Links() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li> <Link to="/">Home </Link> </li>
                        <li> <Link to="/wordle">Wordle </Link> </li>
                        <li> <Link to="/quiz">Quiz </Link> </li>
                        <li> <Link to="/coding">Coding Exercises </Link> </li>
                        <li> <Link to="/about">About </Link> </li>
                        <li> <Link to="/geoguessr">GeoGuessr </Link> </li>
                        <li> <Link to="/tictactoe">Tic Tac Toe </Link> </li>
                        <li> <Link to="/hangman">Hangman </Link> </li>
                        <li> <Link to="/sudoku">Sudoku </Link> </li>
                        <li> <Link to="/crossword">Crossword </Link> </li>
                    </ul> 
                </nav> 
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/wordle" element={<Wordle />} />
                    <Route path="/quiz" element={<div>Quiz Page</div>} />
                    <Route path="/coding" element={<div>Coding Exercises Page</div>} />
                    <Route path="/about" element={<div>About Page</div>} />
                    <Route path="/geoguessr" element={<div>GeoGuessr Page</div>} />
                    <Route path="/tictactoe" element={<div>Tic Tac Toe Page</div>} />
                    <Route path="/hangman" element={<div>Hangman Page</div>} />
                    <Route path="/sudoku" element={<div>Sudoku Page</div>} />
                    <Route path="/crossword" element={<div>Crossword Page</div>} />
                </Routes>
            </div>
        </Router>
    );
} 

/**Fix the links to new page and new html */
/**Add dark and light mode */
/**Fix a nice navbar */

export default Links;