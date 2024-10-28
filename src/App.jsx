import React, {useState, useRef, useEffect} from 'react'

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

import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from 'gsap'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

function App() {

  const [onLanding, setOnLanding] = useState(true)
  const landingRef = useRef()

  useGSAP(()=> {
    ScrollTrigger.create(
      {
        trigger: landingRef.current,
        onLeave: () => {
          setOnLanding(false)
        },
        onEnterBack: () => { 
          setOnLanding(true)
        }
      }
    )
  }) 

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
          <Experience landingActive={onLanding}/>
        </Canvas>
        
        <Landing ref={landingRef}/>
        <Skills />
        <Projects />
        <Contact />
      </ReactLenis>
    </>
  )
}

export default App
