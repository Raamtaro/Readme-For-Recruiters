import React, {useEffect, useState, useRef} from 'react'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import HalftoneShaderMaterial from '../CustomShaderMaterial/HalftoneShaderMaterial'
import { Clock } from 'three'


function Model() {
    const model = useGLTF('./translatedMask.glb')
    const geometry = model.scene.children[0].geometry

    const materialRef = useRef()
    const meshRef = useRef()

    useEffect(()=> {
        const handleResize = () => {
            materialRef.current.uniforms.uResolution.value.set(window.innerWidth * Math.min(window.devicePixelRatio, 2), window.innerHeight * Math.min(window.devicePixelRatio, 2))
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [materialRef])

    useFrame((state, delta) => {
        meshRef.current.rotation.y += delta * 0.25
    })


    return (
        <>
        <mesh
            ref={meshRef}
            geometry={geometry}
            scale={0.5}
            position-z={-1}
            position-y={-1.75}
        >
            <HalftoneShaderMaterial
                ref={materialRef}
             />
        </mesh>
            
        </>
    )
}

export default Model