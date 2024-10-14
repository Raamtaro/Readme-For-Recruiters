import React, {useRef, useEffect} from 'react'
//Three JS stuff
import { useThree, extend, useFrame } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import Particles from './Particles/Particles'

import { PerspectiveCamera } from '@react-three/drei'

//Canvas output setup
import * as THREE from 'three'

//Components
import Model from './Model/Model'



// extend({ OrbitControls: OrbitControls }) //can be rewritten as below because name is same
extend({ OrbitControls })
function Experience() {
    /**
     * mouse.current component will set up meshes within the landing page scene as well as control animations.
     */
    const {camera, gl, viewport, size} = useThree()

    //Refs
    const modelRef = useRef()
    const particlesRef = useRef()
    const cameraGroupRef = useRef()
    const cameraRef = useRef()
    const scrollRef = useRef({
        value: 0,
        velocity: 0
    })
    const mouse = useRef(
        {
            current: {
                x: 0,
                y: 0
            },
            trail: {
                x: 0,
                y: 0
            },
            previous: {
                x: 0,
                y: 0
            },
            velocity: 0,
            targetVelocity: 0,
            ease: 0.7
        }
    )

    const calculateMouseSpeed = () => {
        mouse.current.velocity = Math.sqrt( (mouse.current.previous.x - mouse.current.current.x)**2 + (mouse.current.previous.y - mouse.current.current.y)**2)

        mouse.current.targetVelocity -= mouse.current.ease * (mouse.current.targetVelocity - mouse.current.velocity)
        mouse.current.trail.x -= mouse.current.ease * (mouse.current.trail.x - mouse.current.current.x)
        mouse.current.trail.y -= mouse.current.ease * (mouse.current.trail.y - mouse.current.current.y)

        mouse.current.previous.x = mouse.current.current.x
        mouse.current.previous.y = mouse.current.current.y
    }

    const determineParallax = (delta) => {
        const parallaxCoords = {x: mouse.current.current.x - 0.5, y: mouse.current.current.y}
        const parallaxX = parallaxCoords.x * 0.25
        const parallaxY = -parallaxCoords.y * 0.25

        cameraGroupRef.current.position.x += (parallaxX - cameraGroupRef.current.position.x) * 5 * delta * 0.46
        cameraGroupRef.current.position.y += (parallaxY - cameraGroupRef.current.position.y) * 5 * delta * 0.46

        // cameraGroupRef.current.rotation.y -= (parallaxX - cameraGroupRef.current.position.x) * 5 * delta * 0.1
        // cameraGroupRef.current.rotation.x -= (parallaxX - cameraGroupRef.current.position.y) * 5 * delta * 0.1

        modelRef.current.rotation.y += (parallaxX - cameraGroupRef.current.position.x) * 5 * delta * 0.95 
        modelRef.current.rotation.x += (parallaxY - cameraGroupRef.current.position.y) * 5 * delta * 0.95 
    }

    useEffect(()=> { //Mouse Event Listener
        const handleMouseMove = (event) => {
            mouse.current.current.x = event.clientX / size.width
            mouse.current.current.y = 1.0 - event.clientY / size.height // -1 * -1 to convert to event.clientY / size.height          
        }

        window.addEventListener('mousemove', handleMouseMove)



        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }

    }, [])

    useEffect(()=> { //Scroll Event Listener
        const handleScroll = () => {
            scrollRef.current.value = window.scrollY
            // console.log(scrollRef.current.value)
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useFrame((state, delta) => {
        determineParallax(delta)
        calculateMouseSpeed()
        cameraRef.current.position.y = -scrollY / size.height * 10


        
    })

    return (
        <>
            {/* <orbitControls args={ [ camera, gl.domElement ] } /> */}
            
            <group ref={cameraGroupRef}>
                <PerspectiveCamera
                    ref={cameraRef}
                    makeDefault              // Makes mouse.current camera the default camera
                    position={[0, 0, 6]}     // Set camera position
                    fov={35}                 // Field of View
                    near={0.1}
                    far={100}
                />
            </group>
           
            <Particles />
            <Model innerRef={modelRef}/>
        </>

    )
}

export default Experience