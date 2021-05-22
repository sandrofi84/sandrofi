import React, { useState, useEffect } from "react"

// Styles
import "../styles/layout.scss"

// Components
import Header from "./header"
import BackgroundCanvas from "./backgroundCanvas"

// Context
import StateContext from "../context/stateContext"
import DispatchContext from "../context/dispatchContext"


const Layout = ({children, location}) => {
    // If the relative path starts with /projects, we set the state to /projects/, otherwise we
    // set the state to whatever the relative path is, but adding a "/" at the end if it is missing
    const [appState, setAppState] = useState(/^[/]projects/.test(location.pathname) ? "/projects/" : /[/]$/.test(location.pathname) ? location.pathname : location.pathname + "/")
    console.log(location.pathname);
    return (
            <StateContext.Provider value={appState}>
                <DispatchContext.Provider value={setAppState}>
                    <Header />
                    <BackgroundCanvas />
                    <main>
                        {children}
                    </main>
                    <footer />
                </DispatchContext.Provider>
            </StateContext.Provider>
    )

}

export default Layout;