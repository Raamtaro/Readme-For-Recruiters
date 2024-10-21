import * as THREE from 'three'
import React, { forwardRef, useMemo, useEffect } from 'react'
import { extend, useThree } from '@react-three/fiber'


import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'



const PlaneShaderMaterial = forwardRef((props, ref) => {   
    const shaderMaterial = useMemo(()=> {
        return new THREE.ShaderMaterial(
            {
                uniforms: {
                    uOffset: {value: new THREE.Vector2(0.0, 0.0)},
                    uAlpha: {value: 0.3}
                },
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,

                transparent: true,

            }
        )
    },[])
    return <primitive object={shaderMaterial} ref={ref} attach="material" {...props} />
})

export default PlaneShaderMaterial