import React from 'react'
import { Link } from 'gatsby'

const MenuLarge = (props) => {

    const { appState, appDispatch } = props
    const activeStyle = { color: "red" }

    return (
        <nav className="header__nav menu-large">
            <ul className="header__nav__list">
                <li className="header__nav__list-item">
                    <Link to="/" onClick={() => appDispatch({type: "setLocation", location: "/"})} style={appState.location === "/" ? activeStyle : {}}>home</Link>
                    <span style={appState.location === "/" ? {opacity: "1", color: "red"} : {opacity: "0"}}>.</span>
                </li>
                <li className="header__nav__list-item">
                    <Link to="/skills/" onClick={() => appDispatch({type: "setLocation", location: "/skills/"})} style={appState.location === "/skills/" ? activeStyle : {}}>skills</Link>
                    <span style={appState.location === "/skills/" ? {opacity: "1", color: "red"} : {opacity: "0"}}>.</span>
                </li>
                <li className="header__nav__list-item">
                    <Link to="/projects/" onClick={() => appDispatch({type: "setLocation", location: "/projects/"})} style={appState.location === "/projects/" ? activeStyle : {}}>projects</Link>
                    <span style={appState.location === "/projects/" ? {opacity: "1", color: "red"} : {opacity: "0"}}>.</span>
                </li>
                <li className="header__nav__list-item">
                    <Link to="/about/" onClick={() => appDispatch({type: "setLocation", location: "/about/"})} style={appState.location === "/about/" ? activeStyle : {}}>about</Link>
                    <span style={appState.location === "/about/" ? {opacity: "1", color: "red"} : {opacity: "0"}}>.</span>
                </li>
                <li className="header__nav__list-item">
                    <Link to="/contact/" onClick={() => appDispatch({type: "setLocation", location: "/contact/"})} style={appState.location === "/contact/" ? activeStyle : {}}>contact</Link>
                    <span style={appState.location === "/contact/" ? {opacity: "1", color: "red"} : {opacity: "0"}}>.</span>
                </li>
            </ul>
        </nav>
    )
}

export default MenuLarge
