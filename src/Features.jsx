import React from "react";
import line1 from "./line-1.svg";
import line2 from "./line-2.svg";
import rectangle3 from "./rectangle-3.png";
import rectangle4 from "./rectangle-4.svg";
import sosmed from "./sosmed.png";
import "./Features.css";

export const Features = () => {
    return (
        <div className="features">
            <div className="rectangle" />

            <img className="img" alt="Rectangle" src={rectangle3} />

            <footer className="footer">
                <div className="div" />

                <p className="text-wrapper">
                    Copyright © HERYLL TEAM 2025 - Made with love
                </p>

                <img className="sosmed" alt="Sosmed" src={sosmed} />

                <div className="text-wrapper-2">CONTACTS</div>

                <p className="p">
                    Feel free to contact us if you have any feedback or you have problems.
                </p>

                <img className="line" alt="Line" src={line1} />
            </footer>

            <div className="content">
                <div className="content-background" />

                <div className="screenshpt-game" />

                <p className="interact-with-cats">
                    <span className="span">Interact with cats:</span>

                    <span className="text-wrapper-3">
                        {" "}
                        Pet the cats! Take the cats! Feed the cats! Ignore the cats.
                    </span>
                </p>

                <p className="text-wrapper-4">What can you do in-game?</p>
            </div>

            <div className="heroes">
                <div className="text-wrapper-5">FEATURES</div>

                <div className="text-wrapper-6">Game features</div>
            </div>

            <header className="header">
                <img className="rectangle-2" alt="Rectangle" src={rectangle4} />

                <div className="navbar">
                    <div className="text-wrapper-7">HERYLL</div>

                    <div className="navbar-2">
                        <div className="text-wrapper-8">HOME</div>

                        <div className="text-wrapper-9">TUTORIAL</div>

                        <div className="text-wrapper-10">FEATURES</div>

                        <div className="text-wrapper-11">ABOUT</div>
                    </div>

                    <button className="play-button">
                        <div className="rectangle-3" />

                        <div className="text-wrapper-12">PLAY</div>
                    </button>
                </div>

                <img className="line-2" alt="Line" src={line2} />
            </header>
        </div>
    );
};
