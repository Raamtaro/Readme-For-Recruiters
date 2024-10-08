import React from 'react'
//Three JS stuff
import { useThree, extend, useFrame } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

// extend({ OrbitControls: OrbitControls }) //can be rewritten as below because name is same
extend({ OrbitControls })
function Experience() {
    /**
     * This component will set up meshes within the landing page scene as well as control animations.
     */
    const {camera, gl} = useThree()

    return (
        <>
            <orbitControls args={ [ camera, gl.domElement ] } />
            <mesh>
                <torusKnotGeometry />
                <meshNormalMaterial />
            </mesh>
        </>

    )
}

export default Experience