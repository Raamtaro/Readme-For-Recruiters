import React from 'react'
//Three JS stuff
import { useThree, extend, useFrame } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import Particles from './Particles/Particles'

//Canvas output setup
import * as THREE from 'three'

//Components
import Model from './Model/Model'


// extend({ OrbitControls: OrbitControls }) //can be rewritten as below because name is same
extend({ OrbitControls })
function Experience() {
    /**
     * This component will set up meshes within the landing page scene as well as control animations.
     */
    const {camera, gl, viewport, size} = useThree()

    return (
        <>
            {/* <orbitControls args={ [ camera, gl.domElement ] } /> */}
            {/* <mesh>
                <torusKnotGeometry />
                <meshNormalMaterial />
            </mesh> */}
            {/* <Model /> */}
            <Particles />


        </>

    )
}

export default Experience