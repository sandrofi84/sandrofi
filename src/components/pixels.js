import React, { useLayoutEffect, useMemo, useRef, useEffect, useState } from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import usePrevious from '../hooks/usePrevious'

function randomize(factor) {
    return Math.sin(Math.random() * 1000) * factor
}

const Pixels = ({appState, appDispatch, pictures, width, height}) => {
    const [imgIndex, setImgIndex] = useState(()=>{
        switch(appState.location) {
            case "/":
                return 0
            case "/skills/":
                return 1
            case "/projects/":
                return 2
            case "/about/":
                return 3
            case "/contact/":
                return 4
            default:
                return 0
        }})
    const [isExpanding, setIsExpanding] = useState(true)
    const [counter, setCounter] = useState(0)
    const { invalidate } = useThree()
    const mesh = useRef()
    const prevImgIndex = usePrevious(imgIndex)
    const [ windowRatio, setWindowRatio ] = useState(window.innerWidth / window.innerHeight)
    const [ ratioHasChanged, setRatioHasChanged ] = useState(false) 

    console.log(`Counter is ${counter}, PicIsComplete ${appState.picIsComplete}`)

    const [ tempObject, tempPosVector, initialPosVector, finalPosVector, tempMatrix, currentColor, finalColor ] = useMemo(() => {
        return [new THREE.Object3D(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Matrix4(), new THREE.Color(), new THREE.Color()]
    }, [])

    const canvas = useMemo(() => {
        console.log("log in Canvas")
        const canvas = document.createElement('canvas')

        if (windowRatio > 1.6) {
            canvas.width = width
            canvas.height = Math.round(width / windowRatio)
        } else if (windowRatio >= 1 && windowRatio <= 1.6) {
            canvas.width = width
            canvas.height = height
        } else {
            canvas.width = Math.round(height * windowRatio)
            canvas.height = height
        }
        
        return canvas

    }, [windowRatio, width, height])
    
    const loadedPics = useLoader(THREE.ImageLoader, windowRatio > .7 ? pictures.landscape : pictures.portrait)

    const dataArray = useMemo(() => {
        console.log("log in imageData Generator")
        let arr = [] 
        
        function getPicData(pic, canvas) {
            const ctx = canvas.getContext('2d')
            ctx.drawImage(pic, (canvas.width - pic.width)/2, (canvas.height - pic.height)/2)
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            
            return imageData
        }

        loadedPics.forEach(picture => {
            let data = getPicData(picture, canvas)
            arr.push(data)
        })

        return arr
    }, [canvas, loadedPics])

    const pixelArray = useMemo(() => {
        const tempPixels = []
        console.log("PixelArray is being created")

        for (let y = 0; y < canvas.height; y++) {
    
            for (let x = 0; x < canvas.width; x++) {

                const r = dataArray.map(image => image[(y * 4 * canvas.width) + (x * 4)] / 255)
                const g = dataArray.map(image => image[(y * 4 * canvas.width) + (x * 4 + 1)] / 255)
                const b = dataArray.map(image => image[(y * 4 * canvas.width) + (x * 4 + 2)] / 255)
                const a = dataArray.map(image => image[(y * 4 * canvas.width) + (x * 4 + 3)] / 255)

                const mosaicX = (x - canvas.width/2)/10
                const mosaicY = -(y - canvas.height/2)/10
                const mosaicZ = 0

                const randomX = randomize(20)
                const randomY = randomize(20)
                const randomZ = randomize(20)

                tempPixels.push({ 
                    color: {r, g, b, a}, 
                    mosaicPosition: {x: mosaicX, y: mosaicY, z: mosaicZ}, 
                    randomPosition: {x: randomX, y: randomY, z: randomZ} 
                })

            }
        }
        return tempPixels
    }, [canvas, dataArray])

    console.log(pixelArray.length)

    // We iterate through the pixel array to find the first common non-transparent pixel
    // between all the pictures. This will be useful during the animation in case any
    // of the pictures have transparent pixels.
    const opaquePixel = useMemo(() => {
        for (let i = 0; i < pixelArray.length; i++) {

            if (pixelArray[i].color.a.every(alpha => alpha > 0)) {
                return i
            }
        }
        return null
    }, [pixelArray])

    useEffect(() => {
        if (counter) {
            appDispatch({type: "setPicIncomplete"})
        } else {
            appDispatch({type: "setPicComplete"})
        }
    }, [counter, appDispatch])

    useEffect(() => {
        switch(appState.location) {
            case "/":
                setImgIndex(0)
                break
            case "/skills/":
                setImgIndex(1)
                break
            case "/projects/":
                setImgIndex(2)
                break
            case "/about/":
                setImgIndex(3)
                break
            case "/contact/":
                setImgIndex(4)
                break
            default:
                setImgIndex(0)
                break
        }
    },[appState.location])

    useEffect(() => {
        const setNewRatio = () => {
            setWindowRatio(window.innerWidth / window.innerHeight)
            setRatioHasChanged(true)
        }

        window.addEventListener("resize", setNewRatio)

        return () => {
            window.removeEventListener("resize", setNewRatio)
        }
    }, [])

    useEffect(() => {

        // The animation runs once every time the user clicks on a different nav-link and
        // stops when the counter reaches 0
        if (prevImgIndex !== null) {
            //console.log("first effect counter is ", counter)

            setCounter(c => {
                if (c === 1) {
                    // In case the user clicks on a different nav-link before the animation is finished, 
                    // we invert the direction of the pixels and set the counter to 3. This allows the new
                    // animation to finish it's cycle
                    setIsExpanding(current => !current)
                    return 3
                } else if (c === 0) {
                    // If the counter is 0 when the user clicks on a nav-link, we set the counter to 2 to start
                    // a new animation cycle. 
                    return 2
                } else {
                    // While if the counter is 2 we do not change it at all.
                    return c
                }
            })

            // Invalidate kick-starts the next animation
            invalidate()
        }
    },[imgIndex, invalidate])

    useEffect(() => {
        // The counter decreases every time the pixels invert their direction
        setCounter(c => c > 0 ? c - 1 : c)
    }, [isExpanding])

    useLayoutEffect(() => {

        // This sets the initial color and position of the pixels ONLY on the first render
        if (mesh?.current && (prevImgIndex === null || ratioHasChanged)) {

            pixelArray.forEach(({color, mosaicPosition}, i) => {
                
                // Set initial color of each pixel
                finalColor.setRGB(color.r[imgIndex], color.g[imgIndex], color.b[imgIndex]).convertGammaToLinear(2.2)
                // and apply it to the instanced mesh
                mesh.current.setColorAt(i, finalColor)

                // Set initial position of each pixel in the mosaic
                if (color.a[imgIndex]) {
                    // If the pixel is NOT transparent we set its initial position to the position in the mosaic,
                    // with a tiny random offset to give the image a nicer look
                    finalPosVector.set(mosaicPosition.x + Math.sin(Math.random() * 1000) * .005, mosaicPosition.y + Math.sin(Math.random() * 1000) * .005, mosaicPosition.z + Math.sin(Math.random() * 1000) * .005)
                } else {
                    // If the pixel is transparent we send it out of the field of view
                    finalPosVector.set(randomize(1000000000), randomize(1000000000), randomize(1000000000))
                }

                tempObject.position.copy(finalPosVector)
                tempObject.updateMatrix()

                // And apply the matrix to the instanced mesh
                mesh.current.setMatrixAt(i, tempObject.matrix)

            })
            mesh.current.instanceColor.needsUpdate = true
            mesh.current.instanceMatrix.needsUpdate = true
            invalidate()

            if (ratioHasChanged) {
                setRatioHasChanged(false)
            }
        }
        

    }, [pixelArray, finalColor, prevImgIndex, invalidate, finalPosVector, imgIndex, ratioHasChanged, tempObject])

    useFrame(() => {

        // This is the animation. It runs only when the counter is > 0
        if (mesh?.current && counter) {
            pixelArray.forEach(({ randomPosition, mosaicPosition, color }, i) => {

                // The pixels will start changing color on the contraction animation
                if (counter === 1) {
                    finalColor.setRGB(color.r[imgIndex], color.g[imgIndex], color.b[imgIndex]).convertGammaToLinear(2.2)
                    // Retrieving the current color of the instanced mesh
                    mesh.current.getColorAt(i, currentColor)
                    // Changing the color gradually - on each iteration - to match the colors of the new image
                    currentColor.lerp(finalColor, 0.2)
                    // Applying the color to the instanced mesh
                    mesh.current.setColorAt(i, currentColor)
                }
                

                // Setting the initial random position of the pixel - just as a
                // reference for the instanced mesh to tend to when expanding
                initialPosVector.set(randomPosition.x, randomPosition.y, randomPosition.z)

                if (color.a[imgIndex]) {
                    // If the pixel is not transparent we set its final position to the position in the mosaic
                    finalPosVector.set(mosaicPosition.x, mosaicPosition.y, mosaicPosition.z)
                } else {
                    // If the pixel is transparent we send it out of the field of view
                    finalPosVector.set(randomize(1000000000), randomize(1000000000), randomize(1000000000))
                }
                
                // Retrieving the current position of the instanced mesh
                mesh.current.getMatrixAt(i, tempMatrix)
                tempPosVector.setFromMatrixPosition(tempMatrix)

                // Once per frame, we check if the instanced mesh is close to its destination position,
                // if it is close enough, we invert its direction. The opaque pixel is just a reference to 
                // the first common non-transparent pixel of all the pictures.
                if (i === opaquePixel) {
                    if (tempPosVector.distanceTo(initialPosVector) < 0.5) {
                        setIsExpanding(false) 
                    } else if (tempPosVector.distanceTo(finalPosVector) < 0.005) {
                        setIsExpanding(true)
                    }
                }
                
                // Depending on whether the pixels are expanding or contracting, 
                // we set their destination position to either the random or the image mosaic
                // and we gradually move them closer on each frame.

                const expansionRate = 0.07
                const contractionRate = 0.3
                if (isExpanding) {
                    tempObject.position.x = THREE.MathUtils.lerp(tempPosVector.x, initialPosVector.x, expansionRate)
                    tempObject.position.y = THREE.MathUtils.lerp(tempPosVector.y, initialPosVector.y, expansionRate)
                    tempObject.position.z = THREE.MathUtils.lerp(tempPosVector.z, initialPosVector.z, expansionRate)
                }

                if (!isExpanding) {
                    tempObject.position.x = THREE.MathUtils.lerp(tempPosVector.x, finalPosVector.x, contractionRate)
                    tempObject.position.y = THREE.MathUtils.lerp(tempPosVector.y, finalPosVector.y, contractionRate)
                    tempObject.position.z = THREE.MathUtils.lerp(tempPosVector.z, finalPosVector.z, contractionRate)
                }

                tempObject.updateMatrix()
                // Applaying the new position to the instanced mesh
                mesh.current.setMatrixAt(i, tempObject.matrix)
                
            })
    
            mesh.current.instanceColor.needsUpdate = true
            mesh.current.instanceMatrix.needsUpdate = true

            invalidate()
           
        }
    })

    return (
        <>
            <instancedMesh key={pixelArray.length} ref={mesh} args={[null, null, pixelArray.length]}>
                <circleBufferGeometry args={[.1,16]} />
                <meshStandardMaterial />
            </instancedMesh>
        </>
      )
}

export default Pixels
