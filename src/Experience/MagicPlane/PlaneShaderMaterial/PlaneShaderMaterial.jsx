import * as THREE from 'three'
import React, { forwardRef, useMemo, useEffect } from 'react'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

//Texture Loader stuff
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'





const PlaneShaderMaterial = forwardRef((props, ref) => {    
    const helloWorld = useLoader(TextureLoader, './textures/sunflower.jpg')
    const helloNewWorld = useLoader(TextureLoader, './textures/bonzai.jpeg')

    const shaderMaterial = useMemo(()=> {
        return new THREE.ShaderMaterial(
            {
                uniforms: {
                    uOffset: {value: new THREE.Vector2(0.0, 0.0)},
                    uAlpha: {value: .75},
                    uTexture: {value: helloNewWorld}
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