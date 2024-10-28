import './App.css'
import Landing from './Landing/Landing'
import Skills from './Skills/Skills'
import Projects from './Projects/Projects'
import Contact from './Contact/Contact'
import Experience from './Experience/Experience'

//Canvas output setup
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

import {ReactLenis} from 'lenis/react'

function App() {

  //Track active section
  

  return (
    <>
      <ReactLenis root>
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
          <Experience />
        </Canvas>
        
        <Landing />
        <Skills />
        <Projects />
        <Contact />
      </ReactLenis>
    </>
  )
}

export default App
