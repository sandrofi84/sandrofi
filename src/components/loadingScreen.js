import React, { useContext } from 'react'

// Context
import StateContext from "../context/stateContext"

const LoadingScreen = () => {
    const { canvasIsCreated } = useContext(StateContext)
    return (
        <div id="loading-screen" className={`loading-screen${canvasIsCreated ? " loading-screen--fade-out" : ""}`}>
            <div className="loading-screen__content">
                <div className="loading-screen__white-flash"></div>
            </div>
        </div>
    )
}

export default LoadingScreen
