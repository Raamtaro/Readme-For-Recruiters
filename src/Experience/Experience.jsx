import React, {useRef, useEffect} from 'react'
//Three JS stuff
import { useThree, extend, useFrame } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import Particles from './Particles/Particles'
import { PerspectiveCamera } from '@react-three/drei'

//Canvas output setup
import * as THREE from 'three'

//Scroll 
import { useLenis } from 'lenis/react'

//Components
import FBOModel from './FBOModel/FBOModel'

import MagicPlane from './MagicPlane/MagicPlane'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// import { useDarkMode } from './useDarkMode'

gsap.registerPlugin(useGSAP)



// extend({ OrbitControls: OrbitControls }) //can be rewritten as below because name is same
extend({ OrbitControls })
function Experience({landingActive}) {

    // const isDarkMode = useDarkMode()


    /**
     * mouse.current component will set up meshes within the landing page scene as well as control animations.
     */
    const {camera, gl, viewport, size} = useThree()

    //Refs
    const modelRef = useRef()
    const particlesRef = useRef()
    const fboRef = useRef()

    const planeRef = useRef()
    const cameraGroupRef = useRef()
    const cameraRef = useRef()
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
            ease: 0.0075
        }
    )
    const scrollRef = useRef({
        value: 0,
        velocity: 0
    })

    const calculateMouseSpeed = () => {
        mouse.current.velocity = Math.sqrt( (mouse.current.previous.x - mouse.current.normalized.x)**2 + (mouse.current.previous.y - mouse.current.normalized.y)**2)

        mouse.current.targetVelocity -= mouse.current.ease * (mouse.current.targetVelocity - mouse.current.velocity) //This should pretty much be the same between normalized and 0 to 1

        // //0 -> 1 trail - Might not need this and will delete to save cpu. I'm keeping for now as I may or may not include a ShaderPass with some mouse fx...
        mouse.current.trail.x -= mouse.current.ease * (mouse.current.trail.x - mouse.current.current.x)
        mouse.current.trail.y -= mouse.current.ease * (mouse.current.trail.y - mouse.current.current.y)

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

    useLenis((lenis)=> {
        scrollRef.current.velocity = lenis.velocity
        scrollRef.current.value = lenis.scroll
        
    })

    useEffect(()=> { //Mouse Event Listener
        const handleMouseMove = (event) => {

            //0 -> 1 coordinates, for parallax + post stuff
            mouse.current.current.x = event.clientX / size.width
            mouse.current.current.y = event.clientY / size.height // -1 * -1 to convert to event.clientY / size.height      

            //Normalized Coordinates - -1 to 1 
            mouse.current.normalized.x = (event.clientX / size.width) * 2 - 1
            mouse.current.normalized.y = -(event.clientY / size.height) * 2 + 1

            // console.log(mouse.current.normalized)
        }

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [size])

    // useEffect(() => {
    //     console.log(fboRef.current.pointsRef.material.uniforms.uColor.value)

    //     fboRef

    // }, [isDarkMode])

    useFrame((state, delta) => {
        //Mouse stuff
        calculateMouseSpeed() 
        remapMouse()
        
        //Camera Scrolling
        cameraRef.current.position.y = -scrollRef.current.value / size.height * 10
        // cameraRef.current.position.y = -(scrollRef.current.value) / size.height * 10
        fboRef.current.rotation.y = mouse.current.normalizedTrail.x * 0.25
        fboRef.current.rotation.x = -mouse.current.normalizedTrail.y * 0.25

        fboRef.current.particlesVariable.material.uniforms.uVelocity.value = Math.min(mouse.current.targetVelocity, 0.075)  * 2.25
        fboRef.current.particlesVariable.material.uniforms.uVelocity.value += scrollRef.current.velocity * .05
        mouse.current.targetVelocity *= .98999
        fboRef.current.rotation.x += 0.1 * Math.sin(fboRef.current.rotation.y + state.clock.getElapsedTime()*.55)
              
    })

    return (
        <>
            {/* <orbitControls args={ [ camera, gl.domElement ] } /> */}
            <group ref={cameraGroupRef}>
                <PerspectiveCamera
                    ref={cameraRef}
                    makeDefault              
                    position={[0, 0, 6.5]}     
                    fov={35}                 
                    near={0.1}
                    far={100}
                />
            </group>
           
            <Particles />
            {/* <Model innerRef={modelRef}/> */}
            <MagicPlane ref={planeRef}/>
            <FBOModel ref={fboRef}/>
        </>

    )
}

export default Experience