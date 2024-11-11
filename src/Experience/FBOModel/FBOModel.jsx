import React, {useEffect, forwardRef, useMemo, useRef, useImperativeHandle} from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

import { GPUComputationRenderer } from 'three/examples/jsm/Addons.js'

import gpgpuShader from './shaders/gpgpu/particles.glsl'
import vertexShader from './shaders/particles/vertex.glsl'
import fragmentShader from './shaders/particles/fragment.glsl'

import * as THREE from 'three'

const FBOModel = forwardRef((props, ref) => {

    const {gl, size} = useThree()

    const model = useGLTF('./femaleOneHundredThousand.glb')
    // const model = useGLTF('./ogFemale.glb')

    /**
     * Base Parameters for the GPGPU Computation
     */
    const baseGeometry = useMemo(()=> model.scene.children[0].geometry, [model])
    const count = baseGeometry.attributes.position.count
    const gpuSize = Math.ceil(Math.sqrt(count))

    /**
     * Refs for the GPGPU Computation
     */
    const gpuCompute = useRef()
    const positionArray = useRef()
    const particlesVariable = useRef()
    const baseParticlesTexture = useRef()

    /**
     * Refs for the particle body
     */

    const particlesUvArray = useRef()
    const sizesArray = useRef()

    /**
     * Misc Refs
     */

    const geometryRef = useRef()
    const pointsRef = useRef()



    /**
     * Config helper functions
     */

    const populateBaseTexture = () => {
        for (let i = 0; i < count; i++) {
            const i3 = i * 3
            const i4 = i * 4

            //Set Positions
            baseParticlesTexture.current.image.data[i4 + 0] = positionArray.current[i3 + 0]
            baseParticlesTexture.current.image.data[i4 + 1] = positionArray.current[i3 + 1]
            baseParticlesTexture.current.image.data[i4 + 2] = positionArray.current[i3 + 2]
            baseParticlesTexture.current.image.data[i4 + 3] = Math.random()
        }
    }

    const configParticlesVariable = () => {
        gpuCompute.current.setVariableDependencies(particlesVariable.current, [particlesVariable.current])

        particlesVariable.current.material.uniforms.uTime = new THREE.Uniform(0)
        particlesVariable.current.material.uniforms.uDeltaTime = new THREE.Uniform(0)
        particlesVariable.current.material.uniforms.uBase = new THREE.Uniform(baseParticlesTexture.current)
        particlesVariable.current.material.uniforms.uFlowFieldInfluence = new THREE.Uniform(0.673)
        particlesVariable.current.material.uniforms.uFlowFieldStrength = new THREE.Uniform(2.0)
        particlesVariable.current.material.uniforms.uFlowFieldFrequency = new THREE.Uniform(0.2379)
        particlesVariable.current.material.uniforms.uVelocity = new THREE.Uniform(0.0)
        particlesVariable.current.material.uniforms.uUpForce = new THREE.Uniform(0.0)
        particlesVariable.current.material.uniforms.uMouse = new THREE.Uniform(new THREE.Vector2(-10.0, 10.0))
    }

    const populateArrays = () => {

        particlesUvArray.current = new Float32Array(count * 2)
        sizesArray.current = new Float32Array(count)

        for (let y = 0; y < gpuSize; y++) {
            for (let x = 0; x < gpuSize; x++) {
                const i = (y * gpuSize + x)
                const i2 = i * 2

                //normalise 0 -> 1 
                const uvX = (x + 0.5) / gpuSize
                const uvY = (y + 0.5) / gpuSize

                particlesUvArray.current[i2 + 0] = uvX
                particlesUvArray.current[i2 + 1] = uvY

                //size
                sizesArray.current[i] = Math.random()
            }
        } 
        // console.log(particlesUvArray.current, sizesArray.current)
    }

    const configGeometry = (bufferGeometry) => {
        bufferGeometry.setDrawRange(0, count)
        bufferGeometry.setAttribute('aParticlesUv', new THREE.BufferAttribute(particlesUvArray.current, 2))
        bufferGeometry.setAttribute('aSize', new THREE.BufferAttribute(sizesArray.current, 1))
    }

    
    /**
     * particle Shader material
     */

    const shaderMaterial = useMemo(()=> {
        return new THREE.ShaderMaterial(
            {
                uniforms: {
                    uSize: new THREE.Uniform(0.0095),
                    uResolution: new THREE.Uniform(new THREE.Vector2(size.width * Math.min(window.devicePixelRatio, 2), size.height * Math.min(window.devicePixelRatio, 2))),
                    uParticlesTexture: new THREE.Uniform(),
                    uMouse: new THREE.Uniform(new THREE.Vector2()),
                    uAlpha: new THREE.Uniform(0.0),


                },

                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                transparent: true
            }
        )
    }, [size])

    useEffect(()=> {

        /**
         * GPGPU Setup
         */
        positionArray.current = baseGeometry.attributes.position.array
        gpuCompute.current = new GPUComputationRenderer(gpuSize, gpuSize, gl)

        //Base Texture init
        baseParticlesTexture.current = gpuCompute.current.createTexture()
        populateBaseTexture()

        //Particles Variable init
        particlesVariable.current = gpuCompute.current.addVariable('uParticles', gpgpuShader, baseParticlesTexture.current)
        configParticlesVariable()

        //GPGPU Init
        gpuCompute.current.init()

        /**
         * Point stuff
         */

        //Populate Size and UV arrays
        populateArrays()

        //Setup the draw range and attributes for the buffer geometry
        if (geometryRef.current) {
            configGeometry(geometryRef.current)
        }

        

    }, [])

    useImperativeHandle(ref, () => ({
        particlesVariable: particlesVariable.current,
        rotation: pointsRef.current.rotation,
        position: pointsRef.current.position,
    }));

    useFrame((state, delta)=> {
        const elapsedTime = state.clock.getElapsedTime()

        particlesVariable.current.material.uniforms.uTime.value = elapsedTime
        particlesVariable.current.material.uniforms.uDeltaTime.value = delta



        gpuCompute.current.compute()

        shaderMaterial.uniforms.uParticlesTexture.value = gpuCompute.current.getCurrentRenderTarget(particlesVariable.current).texture
        
    })

    return (
        <>
            <points 
                scale={0.23}
                position-y={0.2}
                position-z={0}
                
                ref={pointsRef} 
                material={shaderMaterial} 
                frustumCulled={false}>
                <bufferGeometry 
                    ref={geometryRef}
                />

            </points>
        </>
    )
})

export default FBOModel