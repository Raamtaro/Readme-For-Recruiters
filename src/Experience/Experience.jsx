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
import MagicPlane from './MagicPlane/MagicPlane'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)



// extend({ OrbitControls: OrbitControls }) //can be rewritten as below because name is same
extend({ OrbitControls })
function Experience({activeSection}) {


    /**
     * mouse.current component will set up meshes within the landing page scene as well as control animations.
     */
    const {camera, gl, viewport, size} = useThree()

    //Refs
    const modelRef = useRef()
    const particlesRef = useRef()
    const planeRef = useRef()
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
            normalized: {
                x: 0,
                y: 0
            },
            normalizedTrail: {
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
            ease: 0.045
        }
    )

    const calculateMouseSpeed = () => {
        mouse.current.velocity = Math.sqrt( (mouse.current.previous.x - mouse.current.normalized.x)**2 + (mouse.current.previous.y - mouse.current.normalized.y)**2)

        mouse.current.targetVelocity -= mouse.current.ease * (mouse.current.targetVelocity - mouse.current.velocity) //This should pretty much be the same between normalized and 0 to 1

        // //0 -> 1 trail - Might not need this and will delete to save cpu
        // mouse.current.trail.x -= mouse.current.ease * (mouse.current.trail.x - mouse.current./current.x)
        // mouse.current.trail.y -= mouse.current.ease * (mouse.current.trail.y - mouse.current./current.y)

        //Normalized Trail
        mouse.current.normalizedTrail.x -= mouse.current.ease * (mouse.current.normalizedTrail.x - mouse.current.normalized.x)
        mouse.current.normalizedTrail.y -= mouse.current.ease * (mouse.current.normalizedTrail.y - mouse.current.normalized.y)

        mouse.current.previous.x = mouse.current.normalized.x
        mouse.current.previous.y = mouse.current.normalized.y
    }

    const remapMouse = () => {
        //https://tympanus.net/codrops/2019/10/21/how-to-create-motion-hover-effects-with-image-distortions-using-three-js/#:~:text=Updating%20the%20plane%20position
        //I re-adapted the approach from the above article

        //Remapping the mouse coordinates fit the view size of the scene (2D --> 3D)
        const mouseVector = new THREE.Vector3(
            mouse.current.normalizedTrail.x,
            mouse.current.normalizedTrail.y,
            0.5 // adjustable
        );

        mouseVector.unproject(cameraRef.current);
        const dir = mouseVector.sub(cameraRef.current.position).normalize();
        const distance = 5;
        const pos = cameraRef.current.position.clone().add(dir.multiplyScalar(distance));

        planeRef.current.position.x = pos.x;
        planeRef.current.position.y = pos.y;
        planeRef.current.position.z = pos.z;

        //Update planeRef's uniforms as it depends on the dir variable
        planeRef.current.material.uniforms.uOffset.value.x = mouse.current.targetVelocity * dir.x * 3.0
        planeRef.current.material.uniforms.uOffset.value.y = mouse.current.targetVelocity * dir.y * 3.0
    }

    // const determineParallax = (delta) => {
    //     const parallaxCoords = {x: mouse.current.normalized.x - 0.5, y: mouse.current.normalized.y}
    //     const parallaxX = parallaxCoords.x * 0.25
    //     const parallaxY = -parallaxCoords.y * 0.25

    //     // modelRef.current.rotation.y += (parallaxX - cameraGroupRef.current.position.x) * 5 * delta * 0.95 
    //     // modelRef.current.rotation.x += (parallaxY - cameraGroupRef.current.position.y) * 5 * delta * 0.95 
    // }

    // useEffect(()=> { //Adding an event listener for resize here, as I'm noticing that the mouse coordinate --> Position mapping gets all messed up for the plane


    // }, [])

    //On mount, let's go ahead and fade the opacity in to the current from 0.0

    useGSAP(()=> {
        gsap.from(
            planeRef.current.material.uniforms.uAlpha,
            {
                value: 0.0,
                ease: 'power3.in',
                duration: 1.5
            }
        )
    })

    useEffect(()=> { //Mouse Event Listener
        const handleMouseMove = (event) => {

            //0 -> 1 coordinates, for parallax + post stuff
            mouse.current.normalized.x = event.clientX / size.width
            mouse.current.normalized.y = event.clientY / size.height // -1 * -1 to convert to event.clientY / size.height      

            //Normalized Coordinates - -1 to 1 
            mouse.current.normalized.x = (event.clientX / size.width) * 2 - 1
            mouse.current.normalized.y = -(event.clientY / size.height) * 2 + 1

            // console.log(mouse.current.normalized)
            
            
            
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

    // useGSAP(()=> {
        
    // })

    useFrame((state, delta) => {

        //Mouse stuff
        // determineParallax(delta)
        calculateMouseSpeed() //we'll need to use the mouse.current.trail to position the plane
        remapMouse()

        cameraRef.current.position.y = -scrollY / size.height * 10
        // planeRef.current.position.y += -scrollY / size.height * distance //Need to comment this out as this prevents the mouse <> plane mapping from working across the entire body

        
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
            {/* <Model innerRef={modelRef}/> */}
            <MagicPlane ref={planeRef}/>
        </>

    )
}

export default Experience