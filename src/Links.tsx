import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router";
import Home from "./Home";
import Wordle from "./Wordle";
import "./index.css";

function Links() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/wordle">Wordle</Link>
                        </li>
                    </ul> 
                </nav> 
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/wordle" element={<Wordle />} />
                </Routes>
            </div>
        </Router>
    );
}

export default Links;