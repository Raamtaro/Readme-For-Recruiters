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

  //I want to control the plane visibility based on whether or not the user is currently on the landing section or not
  //I turned Landing.jsx into a forwardRef from being a normal component... However, I think that it makes more sense to do this with the skills section
  //i.e.
  //When entering skills, I can simply use a callback inside of the scrollTrigger() based on when the skillsRef is in view
  //Alternatively... I can set the callbacks against the ref for landing, which might be better since it's already set up that way

  //Let's try landing, and then skills if it doesn't work out with Landing

  const [onLanding, setOnLanding] = useState(true)
  const landingRef = useRef()


  //On load, useGsap to create a scroll trigger

  useGSAP(()=> {
    ScrollTrigger.create(
      {
        trigger: landingRef.current,
        markers: true,
        onLeave: () => {
          setOnLanding(false)
        },
        onEnterBack: () => { //For now I'm omitting the `onEnter` arg because it's the first thing that is loaded, and so the onEnter is never technically triggered.
          setOnLanding(true)
        }
      }
    )
  }) //I'm also leaving the dependency array empty for now, as the landingRef shouldn't change as everything that is mounted will pretty much remain mounted.

  // useEffect(()=> { //Debug statement
  //   console.log(onLanding)
  // }, [onLanding])


  

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
