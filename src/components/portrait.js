import React, { useRef, useState } from 'react'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'

const Portrait = (props) => {
    // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  // useFrame(() => (mesh.current.rotation.y += 0.04))
  const texture = useLoader(THREE.TextureLoader, props.picture)

  return (
    <mesh
      {...props}
      ref={mesh}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <planeGeometry args={[2, 2, 10]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}

export default Portrait
