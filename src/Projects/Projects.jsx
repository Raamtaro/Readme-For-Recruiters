import React, {useState, useEffect, useRef} from 'react'

import ProjectCard from './ProjectCard/ProjectCard.jsx'
import ModalInfo from './ModalInfo/ModalInfo'

import data from '../utils/data.js'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP,ScrollTrigger);

//styles
import './styles/Projects.css'


function Projects() {
    /**
     * This will house the overall layout of the Projects Section
     * I think it should also compile each child component and we should have this component solely handle gsap logic for horizontal scroll fnctlty
     */

    const projectContainer = useRef()


    useGSAP(()=> {
        // console.log('running') //Verification
        const projectCards = gsap.utils.toArray(projectContainer.current.children)
        // console.log(projectCards)

        gsap.to(
            projectCards,
            {
                xPercent: -100 * (projectCards.length - 1),
                scrollTrigger: {
                    trigger: projectContainer.current,
                    pin: true,
                    scrub: .75,
                    end: () => `+=${projectContainer.current.offsetWidth * (projectCards.length - 1)}`, // Dynamic end based on content width
                }
            }
        )

    }, {scope: projectContainer})


    return (
        <section ref={projectContainer} className='projects-section'>
            
            {
                data.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))
            }

            {/* Horizontal Scroll (------->) for Thumbnails (or a Mesh) 
            On Click ---> Modal Item pops up with Description of project and Live Link/Source Link
            */}

            
        </section>
    )
}

export default Projects