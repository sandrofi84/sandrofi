import React, { Suspense, useContext } from "react"
import { Canvas } from '@react-three/fiber'


// Components
import Pixels from "../components/pixels.js"

// Context
import StateContext from "../context/stateContext"

// Pictures
import pictureSkills from '../images/matrix.jpg'
import pictureHome from '../images/sandro.jpg'
import pictureProjects from '../images/magritte-man_apple.jpg'
import pictureContact from '../images/great-gatsby.jpg'

const BackgroundCanvas = () => {
    const appState = useContext(StateContext)

    return (
        <div className="canvas-container">
            <Canvas className="canvas" camera={{position: [0,0,9]}} frameloop="demand">
                <ambientLight />
                <Suspense fallback={null}>
                <Pixels width={288} height={180} pictures={[pictureHome, pictureSkills, pictureProjects, pictureContact]} appState={appState} />
                </Suspense>
            </Canvas>
        </div>
    )
}

export default BackgroundCanvas
