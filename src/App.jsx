import './App.css'
import Landing from './Landing/Landing'
import Projects from './Projects/Projects'
import Contact from './Contact/Contact'
import Experience from './Experience/Experience'

//Canvas output setup
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

import { PerspectiveCamera } from '@react-three/drei'

function App() {

  return (
    <>
      <Canvas
        style={{ width: '100%', height: '100vh', margin: 0, padding: 0, position: "fixed", zIndex: -1}}
        gl={(canvas) => {
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.physicallyCorrectLights = true;
        return renderer;
        }}>
      <PerspectiveCamera
        makeDefault              // Makes this camera the default camera
        position={[0, 0, 6]}     // Set camera position
        fov={35}                 // Field of View
        near={0.1}
        far={100}
      />
        <Experience />
      </Canvas>
      
      <Landing />
      <Projects />
      <Contact />
    </>
  )
}

export default App
