import React, {useEffect, useState, useRef, useMemo} from 'react'

import * as THREE from 'three'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import CustomShaderMaterial from 'three-custom-shader-material'


function Model( {innerRef}) {
    const model = useGLTF('./tangentedMask.glb')
    const geometry = model.scene.children[0].geometry
    // geometry.computeTangents()

    console.log(geometry)

    //Materials - depth and custom. Planning to transfer the halftone shader material on top of the color processing.

    // useEffect(()=> {
    //     // geometry.setAttribute('aColor', new THREE.BufferAttribute(geometry.attributes._vertexcolor.array, 4))
    // }, [geometry, meshRef])

    // useEffect(()=> {
    //     const handleResize = () => {
    //         materialRef.current.uniforms.uResolution.value.set(window.innerWidth * Math.min(window.devicePixelRatio, 2), window.innerHeight * Math.min(window.devicePixelRatio, 2))
    //     }

    //     window.addEventListener('resize', handleResize)
    //     return () => {
    //         window.removeEventListener('resize', handleResize)
    //     }
    // }, [materialRef])

    // useFrame((state, delta) => {
    //     meshRef.current.rotation.y += delta * 0.05
    // })


    return (
        <>
            <mesh
                ref={innerRef}
                geometry={geometry}
                scale={0.23}
                position-z={0}
                position-y={-.65}
            />


        </>
    )
}

export default Model