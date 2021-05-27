import React, { Suspense, useContext, useMemo } from "react"
import { Canvas } from '@react-three/fiber'


// Components
import Pixels from "../components/pixels.js"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback from "./errorFallback"

// Context
import StateContext from "../context/stateContext"
import DispatchContext from "../context/dispatchContext.js"

// Pictures
import landscapeHome from '../images/sandro-landscape.jpg'
import landscapeSkills from '../images/jerry-maguire-landscape.jpg'
import landscapeProjects from '../images/zoolander-landscape.jpg'
import landscapeAbout from '../images/dumb-and-dumber-landscape.jpg'
import landscapeContact from '../images/great-gatsby-landscape.jpg'

import portraitHome from '../images/sandro-portrait.jpg'
import portraitSkills from '../images/jerry-maguire-portrait.jpg'
import portraitProjects from '../images/zoolander-portrait.jpg'
import portraitAbout from '../images/dumb-and-dumber-portrait.jpg'
import portraitContact from '../images/great-gatsby-portrait.jpg'


const BackgroundCanvas = () => {
    const appState = useContext(StateContext)
    const appDispatch = useContext(DispatchContext)

    const pictures = useMemo(() => ({
        landscape: [landscapeHome, landscapeSkills, landscapeProjects, landscapeAbout, landscapeContact],
        portrait: [portraitHome, portraitSkills, portraitProjects, portraitAbout, portraitContact]
    }), [])

    return (
        <div className="canvas-container">
            <ErrorBoundary fallback={<ErrorFallback />}>
                <Canvas className="canvas" camera={{position: [0,0,9]}} frameloop="demand">
                    <ambientLight />
                    <Suspense fallback={null}>
                        <Pixels width={288} height={180} pictures={pictures} appState={appState} appDispatch={appDispatch} />
                    </Suspense>
                </Canvas>
            </ErrorBoundary>
        </div>
    )
}

export default BackgroundCanvas
