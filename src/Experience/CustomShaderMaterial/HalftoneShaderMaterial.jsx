import * as THREE from 'three'
import React, { forwardRef, useMemo, useEffect } from 'react'
import { extend, useThree } from '@react-three/fiber'

//Shaders
import vertexShader from './shaders/halftone/vertex.glsl'
import fragmentShader from './shaders/halftone/fragment.glsl'

const HalftoneShaderMaterial = forwardRef((props, ref) => {

    
    const shaderMaterial = useMemo(()=> {
        return new THREE.ShaderMaterial(
            {
                uniforms: {
                    uColor: new THREE.Uniform(new THREE.Color('#007EA7')),
                    uResolution: new THREE.Uniform(new THREE.Vector2(window.innerWidth * Math.min(window.devicePixelRatio, 2), window.innerHeight * Math.min(window.devicePixelRatio, 2))),
                    uShadowRepetitions: new THREE.Uniform(1024),
                    uShadowColor: new THREE.Uniform(new THREE.Color('#B70B65')),
                    uLightRepetitions: new THREE.Uniform(1024),
                    uLightColor: new THREE.Uniform(new THREE.Color('#ACF7C1'))
                },
                vertexShader: vertexShader,
                fragmentShader: fragmentShader

            }
        )
    },[])

    return <primitive object={shaderMaterial} ref={ref} attach="material" {...props} />

})

// extend({HalftoneShaderMaterial})

export default HalftoneShaderMaterial