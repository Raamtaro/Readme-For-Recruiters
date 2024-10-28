import * as THREE from 'three'
import React, { forwardRef, useMemo, useEffect } from 'react'

import { useThree } from '@react-three/fiber'


import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'




const ParticleShaderMaterial = forwardRef((props, ref) => {    
    const {gl} = useThree()

    const shaderMaterial = useMemo(()=> {
        return new THREE.ShaderMaterial(
            {
                uniforms: {
                    uSize: { value: 100.0 * gl.getPixelRatio() }
                },
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                blending: THREE.AdditiveBlending,
                transparent: true,
                depthWrite: false
                

            }
        )
    },[])
    return <primitive object={shaderMaterial} ref={ref} attach="material" {...props} />
})

export default ParticleShaderMaterial