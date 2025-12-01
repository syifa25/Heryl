import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";

// nanti tambahkan Home, Feature, Game, dsb

function App() {
    return (
        <BrowserRouter>
    <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/about" element={<About />} />
    </Routes>
    </BrowserRouter>
 );
}

export default App;
