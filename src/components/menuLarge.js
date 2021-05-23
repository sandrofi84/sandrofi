import React from 'react'
import { Link } from 'gatsby'

const MenuLarge = (props) => {

    const { appState, setAppState } = props
    const activeStyle = { color: "red" }

    return (
        <nav className="header__nav menu-large">
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
                    <Link to="/about/" onClick={() => setAppState("/about/")} style={appState === "/about/" ? activeStyle : {}}>about</Link>
                    <span style={appState === "/about/" ? {opacity: "1", color: "red"} : {opacity: "0"}}>.</span>
                </li>
                <li className="header__nav__list-item">
                    <Link to="/contact/" onClick={() => setAppState("/contact/")} style={appState === "/contact/" ? activeStyle : {}}>contact</Link>
                    <span style={appState === "/contact/" ? {opacity: "1", color: "red"} : {opacity: "0"}}>.</span>
                </li>
            </ul>
        </nav>
    )
}

export default MenuLarge
