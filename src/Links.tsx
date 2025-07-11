import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Wordle from "./pages/Wordle";
import Quizzes from "./pages/Quizzes";
import GeoGuessr from "./pages/GeoGuessr";
import TicTacToe from "./pages/TicTacToe";
import Hangman from "./pages/Hangman";
import Sudoku from "./pages/Sudoku";
import Crossword from "./pages/Crossword";
import Games from "./pages/Games";
import "./main.css";

function Links() {
    return (
        <Router>
            <div className="app">
                <nav className="navbar">
                    <ul className="nav-list">
                        <li className="nav-item"> <Link to="/"          className="nav-link">Home </Link> </li>
                        <li className="nav-item"> <Link to="/wordle"    className="nav-link">Wordle </Link> </li>
                        <li className="nav-item"> <Link to="/quizzes"   className="nav-link">Quizzes </Link> </li>
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
                    <Route path="/quizzes"         element={<Quizzes />} />
                    <Route path="/geoguessr"    element={<GeoGuessr />} />
                    <Route path="/tictactoe"    element={<TicTacToe />} />
                    <Route path="/hangman"      element={<Hangman />} />
                    <Route path="/sudoku"       element={<Sudoku />} />
                    <Route path="/crossword"    element={<Crossword />} />
                    <Route path="/games"        element={<Games />} />
                </Routes>
            </div>
        </Router>
    );
} 

/**Add dark and light mode */
// Add moving background

export default Links;