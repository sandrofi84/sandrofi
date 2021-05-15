import React, { useContext } from 'react'

// Components
import { Link } from 'gatsby'

// Context
import DispatchContext from "../context/dispatchContext"
import StateContext from '../context/stateContext'


const Header = () => {
    const setAppState = useContext(DispatchContext)
    const appState = useContext(StateContext)

    const activeStyle = { color: "red" }

    return (
        <header className="header bg--black-tr">
            <div className="header__logo">
                <Link to="/" onClick={() => setAppState("/")}>
                    SANDRO<span style={{color: "red"}}>FI.</span>
                </Link>
            </div>

            <nav className="header__nav">
                <ul className="header__nav__list">
                    <li className="header__nav__list-item">
                        <Link to="/" onClick={() => setAppState("/")} style={appState === "/" ? activeStyle : {}}>home</Link>
                        <span style={appState === "/" ? {opacity: "1", color: "red"} : {opacity: "0"}}>.</span>
                    </li>
                    <li className="header__nav__list-item">
                        <Link to="/skills/" onClick={() => setAppState("/skills/")} style={appState === "/skills/" ? activeStyle : {}}>skills</Link>
                        <span style={appState === "/skills/" ? {opacity: "1", color: "red"} : {opacity: "0"}}>.</span>
                    </li>
                    <li className="header__nav__list-item">
                        <Link to="/projects/" onClick={() => setAppState("/projects/")} style={appState === "/projects/" ? activeStyle : {}}>projects</Link>
                        <span style={appState === "/projects/" ? {opacity: "1", color: "red"} : {opacity: "0"}}>.</span>
                    </li>
                    <li className="header__nav__list-item">
                        <Link to="/contact/" onClick={() => setAppState("/contact/")} style={appState === "/contact/" ? activeStyle : {}}>contact</Link>
                        <span style={appState === "/contact/" ? {opacity: "1", color: "red"} : {opacity: "0"}}>.</span>
                    </li>
                </ul>
            </nav>
            
        </header>
    )
}

export default Header
