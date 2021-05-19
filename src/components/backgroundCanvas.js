import React, { Suspense, useContext, useMemo } from "react"
import { Canvas } from '@react-three/fiber'


// Components
import Pixels from "../components/pixels.js"

// Context
import StateContext from "../context/stateContext"

// Pictures
import landscapeHome from '../images/sandro.jpg'
import landscapeSkills from '../images/matrix-landscape.jpg'
import landscapeProjects from '../images/american-psycho-2.jpg'
import landscapeContact from '../images/great-gatsby.jpg'
import portraitHome from '../images/sandro-portrait.jpg'
import portraitSkills from '../images/matrix-portrait.jpg'
import portraitProjects from '../images/american-psycho-2-portrait.jpg'
import portraitContact from '../images/great-gatsby-portrait.jpg'

const BackgroundCanvas = () => {
    const appState = useContext(StateContext)

    const pictures = useMemo(() => ({
        landscape: [landscapeHome, landscapeSkills, landscapeProjects, landscapeContact],
        portrait: [portraitHome, portraitSkills, portraitProjects, portraitContact]
    }))

    return (
        <div className="canvas-container">
            <Canvas className="canvas" camera={{position: [0,0,9]}} frameloop="demand">
                <ambientLight />
                <Suspense fallback={null}>
                    <Pixels width={288} height={180} pictures={pictures} appState={appState} />
                </Suspense>
            </Canvas>
        </div>
    )
}

export default BackgroundCanvas
