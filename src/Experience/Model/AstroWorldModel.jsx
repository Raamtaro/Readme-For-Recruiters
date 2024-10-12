import React, {useMemo, forwardRef, useEffect, useRef} from 'react'
import { createHalftoneShaderMaterial } from '../CustomShaderMaterial/NewShaderMaterial'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'

function AstroWorldModel() {
    const groupRef = useRef()

    const gltf = useGLTF('./floatingAstronaut.glb')

    const {animations} = gltf
    const {actions} = useAnimations(animations, groupRef)

    const myShaderMaterial = useMemo(() => createHalftoneShaderMaterial(), []);
    const clonedScene = useMemo(() => gltf.scene.clone(), [gltf.scene])

    useEffect(() => {
        clonedScene.traverse((child) => {
          if (child.isMesh) {
            child.material = myShaderMaterial;
          }
        });
    }, [clonedScene, myShaderMaterial]);

    useEffect(() => {
        const handleResize = () => {
          myShaderMaterial.uniforms.uResolution.value.set(
            window.innerWidth * Math.min(window.devicePixelRatio, 2),
            window.innerHeight * Math.min(window.devicePixelRatio, 2)
          );
        };
    
        window.addEventListener('resize', handleResize);
    
        // Initial call to set the correct resolution
        handleResize();
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, [myShaderMaterial]);
    

    // Start animations
    useEffect(() => {
        if (actions) {
        Object.values(actions).forEach((action) => {
            action.play();
        });
        }
    }, [actions]);

  return (
    <group ref={groupRef} scale={100.0} position={[0, 0, 0]}>
      <primitive object={clonedScene} />
    </group>
  )
}

export default AstroWorldModel