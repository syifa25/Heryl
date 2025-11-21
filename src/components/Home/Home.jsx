// src/components/Home.jsx
import React from "react";
import line2 from "./line-2.svg";
import rectangle3 from "./rectangle-3.gif";
import rectangle4 from "./rectangle-4.svg";
import "./Home.css";

export const Home = () => {
  return (
    <div className="home">
      <div className="rectangle" />

      <img className="img" alt="Rectangle" src={rectangle3} />

      <p className="text-wrapper">© HERYLL TEAM 2025 - Made with love</p>

      <div className="heroes">
        <div className="div">HERYLL</div>
        <p className="p">Save stray cats and become a hero</p>
      </div>

      <header className="header">
        <img className="rectangle-2" alt="Rectangle" src={rectangle4} />

        <div className="navbar">
          <div className="text-wrapper-2">HERYLL</div>

          <div className="navbar-2">
            <div className="text-wrapper-3">HOME</div>
            <img className="line" alt="Line" src={line2} />
            <div className="text-wrapper-4">TUTORIAL</div>
            <div className="text-wrapper-5">FEATURES</div>
            <div className="text-wrapper-6">ABOUT</div>
          </div>

          <button className="play-button">
            <div className="rectangle-3" />
            <div className="text-wrapper-7">PLAY</div>
          </button>
        </div>
      </header>
    </div>
  );
};