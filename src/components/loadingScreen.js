import React, { useContext } from 'react'

// Context
import StateContext from "../context/stateContext"

const LoadingScreen = () => {
    const { canvasIsCreated } = useContext(StateContext)
    return (
        <div id="loading-screen" className={`loading-screen${canvasIsCreated ? " loading-screen--fade-out" : ""}`}>
            
                <div className="loading-screen__logo__half loading-screen__logo__half--oh">
                    <div className="loading-screen__logo__half-first">
                        S<span>ANDRO</span>
                    </div> 
                </div>
                <div className="loading-screen__logo__half">
                    <span style={{color: "red"}}>Fi</span>
                    <div className={`loading-screen__logo__dot-box${canvasIsCreated ? " loading-screen__logo__dot-box--move-h" : ""}`}>
                        <div className={`loading-screen__logo__dot${canvasIsCreated ? " loading-screen__logo__dot--move-and-scale" : ""}`}></div>
                    </div>
                </div>

        </div>
    )
}

export default LoadingScreen
