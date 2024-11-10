import React, {useRef, useEffect, useMemo} from 'react'
import { GPUComputationRenderer } from 'three/examples/jsm/Addons.js'
import { useFrame, useThree } from '@react-three/fiber'

import gpgpuShader from './shaders/gpgpu/particles.glsl'

import * as THREE from 'three'

function GPGPUCompute({baseGeometry, count, size}) {
    const {gl} = useThree()
    const gpuCompute = useRef()
    const positionArray = useRef()
    const particlesVariable = useRef()
    const baseParticlesTexture = useRef()

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
        particlesVariable.current.material.uniforms.uFlowFieldInfluence = new THREE.Uniform(0.823)
        particlesVariable.current.material.uniforms.uFlowFieldStrength = new THREE.Uniform(4.0)
        particlesVariable.current.material.uniforms.uFlowFieldFrequency = new THREE.Uniform(0.585)
        particlesVariable.current.material.uniforms.uVelocity = new THREE.Uniform(0.0)
        particlesVariable.current.material.uniforms.uMouse = new THREE.Uniform(new THREE.Vector2(-10.0, 10.0))
    }

    useEffect(()=> {
        positionArray.current = baseGeometry.attributes.position.array
        gpuCompute.current = new GPUComputationRenderer(size, size, gl)

        //Base Texture init
        baseParticlesTexture.current = gpuCompute.current.createTexture()
        populateBaseTexture()

        //Particles Variable init
        particlesVariable.current = gpuCompute.current.addVariable('uParticles', gpgpuShader, baseParticlesTexture.current)
        configParticlesVariable()

        //GPGPU Init
        gpuCompute.current.init()
        

    }, [baseGeometry])

    useEffect(()=>{
        if (gpuCompute.current) {
            console.log(gpuCompute.current, baseParticlesTexture.current, positionArray.current, particlesVariable.current)
        }
    },[gpuCompute, particlesVariable, baseParticlesTexture, positionArray])

    useFrame(({clock})=> {
        particlesVariable.current.material.uniforms.uTime.value = clock.getElapsedTime()
        particlesVariable.current.material.uniforms.uDeltaTime.value = clock.getDelta()

        gpuCompute.current.compute()
    })


    return null
}

export default GPGPUCompute