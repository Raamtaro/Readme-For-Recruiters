import React, {useEffect, useRef, useMemo} from 'react'

import * as THREE from 'three'

import { useGLTF } from '@react-three/drei'
import { useFrame, extend } from '@react-three/fiber'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'

import wobbleVertexShader from './WobbleShaders/wobble/vertex.glsl'
import wobbleFragmentShader from './WobbleShaders/wobble/fragment.glsl'

import GUI from 'lil-gui'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)


function WobbleModel({innerRef}) {

    /**
     * Model
     */
    const model = useGLTF('./tangentedMask.glb')
    const geometry = model.scene.children[0].geometry

    /**
     * Color ref
     */
        const debugColors = useRef(
            {
                colorA: '#D6531B',
                colorB: '#D7432C'
            }
        )

    /**
     * Uniforms
     */
    const uniforms = useRef(
        {
            uTime: new THREE.Uniform(0.0),
            uPositionFrequency: new THREE.Uniform(0.25),
            uTimeFrequency: new THREE.Uniform(0.1),
            uStrength: new THREE.Uniform(0.25),
            uWarpPositionFrequency: new THREE.Uniform(0.444),
            uWarpTimeFrequency: new THREE.Uniform(0.12),
            uWarpStrength: new THREE.Uniform(0.752),
            uColorA: new THREE.Uniform(new THREE.Color(debugColors.current.colorA)),
            uColorB: new THREE.Uniform(new THREE.Color(debugColors.current.colorB))
        }
    )



    


    const wobbleShaderMaterial = useMemo(()=> {
        return new CustomShaderMaterial(
            {
                baseMaterial: THREE.MeshPhysicalMaterial,
                vertexShader: wobbleVertexShader,
                fragmentShader: wobbleFragmentShader,

                uniforms: uniforms.current,

                metalness: 0.344,
                roughness: 0.5,
                color: '#ffffff',
                transmission: 0.546,
                ior: 1.326,
                thickness: 1.5,
                transparent: true,
                
            }
        )
    }, [])

    const depthMaterial = useMemo(()=> {
        return new CustomShaderMaterial(
            {
                baseMaterial: THREE.MeshDepthMaterial,
                vertexShader: wobbleVertexShader,

                uniforms: uniforms.current,

                depthPacking: THREE.RGBADepthPacking
            }
        )
    }, [])


    return (
        <>
            <directionalLight
                position={[3.3, 1.0, 4.4]}
                castShadow
             
                intensity={Math.PI * 2}
            />

            <mesh
                ref={innerRef}
                geometry={geometry}

                material={wobbleShaderMaterial}
                depthMaterial={depthMaterial}

                scale={0.23}
                position-z={0}
                position-y={-.65}
            />
        </>
    )
}

export default WobbleModel