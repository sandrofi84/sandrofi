import React, { useRef } from 'react'
import { Link } from "gatsby"
import { CSSTransition } from 'react-transition-group'

import githubIcon from '../images/icon-github.png'

const MenuSmall = (props) => {

    const { appState, setAppState, isVisible, toggleMenu } = props;
    const ref = useRef();
    const divStyle = {zIndex: "5", position: "absolute", top: "0", left: "0", height: "100vh", width: "100vw", backgroundColor: "rgba(255, 0, 0, 0.9)"};
    const ulStyle = {padding: "15vh 0 25vh 0", height: "100vh", display: "flex", flexFlow: "column", justifyContent: "space-around", listStyle: "none"};
    const liStyle = {margin: "auto", textAlign: "center"};


    function handleClick() {
        toggleMenu(prev => {
            return !prev
        })
    }


    return (
        <CSSTransition nodeRef={ref} in={isVisible} timeout={500} classNames="menu-transition">
            <div ref={ref} onClick={() => handleClick()} onKeyUp={e => {
            if (e.key === "Escape") {
                handleClick()
            }
            }} style={divStyle} className="menu-small" role="menu" tabIndex="0">
                <nav style={{margin: "auto", width: "60%"}}>
                    <ul className="header__nav__list" style={ulStyle}>
                        <li className="header__nav__list-item" style={liStyle}>
                            <Link to="/" onClick={() => setAppState("/")}>home</Link>
                            <span className={`${appState === "/" ? "animation--flash" : ""}`} style={appState === "/" ? {display: "inline-block", opacity: "1", color: "white"} : {opacity: "0"}}>_</span>
                        </li>
                        <li className="header__nav__list-item" style={liStyle}>
                            <Link to="/skills/" onClick={() => setAppState("/skills/")}>skills</Link>
                            <span className={`${appState === "/skills/" ? "animation--flash" : ""}`} style={appState === "/skills/" ? {display: "inline-block", opacity: "1", color: "white"} : {opacity: "0"}}>_</span>
                        </li>
                        <li className="header__nav__list-item" style={liStyle}>
                            <Link to="/projects/" onClick={() => setAppState("/projects/")}>projects</Link>
                            <span className={`${appState === "/projects/" ? "animation--flash" : ""}`} style={appState === "/projects/" ? {display: "inline-block", opacity: "1", color: "white"} : {opacity: "0"}}>_</span>
                        </li>
                        <li className="header__nav__list-item" style={liStyle}>
                            <Link to="/about/" onClick={() => setAppState("/about/")}>about</Link>
                            <span className={`${appState === "/about/" ? "animation--flash" : ""}`} style={appState === "/about/" ? {display: "inline-block", opacity: "1", color: "white"} : {opacity: "0"}}>_</span>
                        </li>
                        <li className="header__nav__list-item" style={liStyle}>
                            <Link to="/contact/" onClick={() => setAppState("/contact/")}>contact</Link>
                            <span className={`${appState === "/contact/" ? "animation--flash" : ""}`} style={appState === "/contact/" ? {display: "inline-block", opacity: "1", color: "white"} : {opacity: "0"}}>_</span>
                        </li>
                        <li className="header__nav__list-item" style={liStyle}>
                            <a href="https://github.com/sandrofi84"><img src={githubIcon} alt="github"/></a>
                        </li>
                    </ul>
                </nav>
            </div>
        </CSSTransition>
        
    )
}

export default MenuSmall
