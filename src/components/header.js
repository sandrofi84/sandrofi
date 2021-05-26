import React, { useContext, useState } from 'react'

// Components
import { Link } from 'gatsby'
import MenuLarge from './menuLarge'
import MenuIcon from './menuIcon'
import MenuSmall from './menuSmall'

// Context
import DispatchContext from "../context/dispatchContext"
import StateContext from '../context/stateContext'


const Header = () => {
    const [navIsVisible, setNavIsVisible] = useState(false);
    const appDispatch = useContext(DispatchContext)
    const appState = useContext(StateContext)

    return (
        <header className="header bg--black-tr">
            <div className="header__logo">
                <Link to="/" onClick={() => appDispatch({type: "setLocation", location: "/"})}>
                    SANDRO<span style={{color: "red"}}>FI.</span>
                </Link>
            </div>

            <MenuLarge appState={appState} appDispatch={appDispatch} />
            <MenuSmall appState={appState} appDispatch={appDispatch} isVisible={navIsVisible} toggleMenu={setNavIsVisible} />
            <MenuIcon navIsVisible={navIsVisible} toggleMenu={setNavIsVisible} />
            
        </header>
    )
}

export default Header
