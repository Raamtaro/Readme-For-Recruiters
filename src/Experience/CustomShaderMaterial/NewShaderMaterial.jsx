// Modified HalftoneShaderMaterial.jsx
import * as THREE from 'three';

// Shaders
import vertexShader from './shaders/halftone/vertex.glsl';
import fragmentShader from './shaders/halftone/fragment.glsl';


export function createHalftoneShaderMaterial() {
    return new THREE.ShaderMaterial({
    
      uniforms: {
        
        uColor: { value: new THREE.Color('#D6531B') },
        uResolution: {
          value: new THREE.Vector2(
            window.innerWidth * Math.min(window.devicePixelRatio, 2),
            window.innerHeight * Math.min(window.devicePixelRatio, 2)
          ),
        },
        uShadowRepetitions: { value: 512 },
        uShadowColor: { value: new THREE.Color('#B70B65') },
        uLightRepetitions: { value: 512 },
        uLightColor: { value: new THREE.Color('#00F593') },
      },
      skinning: true,
      vertexShader,
      fragmentShader,
    });
  }