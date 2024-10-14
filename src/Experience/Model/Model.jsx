import React, {useEffect, useState, useRef, useMemo} from 'react'

import * as THREE from 'three'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import HalftoneShaderMaterial from '../CustomShaderMaterial/HalftoneShaderMaterial'
import { Clock } from 'three'
import CustomShaderMaterial from 'three-custom-shader-material'


function Model( {innerRef}) {
    const model = useGLTF('./translatedMask.glb')
    const geometry = model.scene.children[0].geometry

    // console.log(model)

    const materialRef = useRef()
    const meshRef = useRef()

    //Materials - depth and custom. Planning to transfer the halftone shader material on top of the color processing.

    useEffect(()=> {
        // geometry.setAttribute('aColor', new THREE.BufferAttribute(geometry.attributes._vertexcolor.array, 4))
    }, [geometry, meshRef])

    useEffect(()=> {
        const handleResize = () => {
            materialRef.current.uniforms.uResolution.value.set(window.innerWidth * Math.min(window.devicePixelRatio, 2), window.innerHeight * Math.min(window.devicePixelRatio, 2))
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [materialRef])

    // useFrame((state, delta) => {
    //     meshRef.current.rotation.y += delta * 0.05
    // })


    return (
        <>
            <mesh
                ref={innerRef}
                geometry={geometry}
                scale={0.195}
                position-z={0}
                position-y={-.45}
            >
            <HalftoneShaderMaterial
                ref={materialRef}
            />
            </mesh>
            {/* <mesh>
                <primitive object={model.scene} />

            </mesh> */}
        </>
    )
}

export default Model