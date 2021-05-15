import React, { useRef } from 'react'

import { useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"



const Controls = () => {

    const controlsRef = useRef()
    const { camera } = useThree()


    return <OrbitControls ref={controlsRef} camera={camera} target={[0, 0, 0]} />
}

export default Controls
