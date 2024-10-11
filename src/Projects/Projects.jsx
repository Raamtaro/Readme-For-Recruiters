import React, {useState, useEffect, useRef} from 'react'

import ProjectCard from './ProjectCard/ProjectCard.jsx'
import ModalInfo from './ModalInfo/ModalInfo'

import data from '../utils/data.js'

//styles
import './styles/Projects.css'


function Projects() {
    /**
     * This will house the overall layout of the Projects Section
     * I think it should also compile each child component and we should have this component solely handle gsap logic for horizontal scroll fnctlty
     */



    return (
        <section className='projects-section'>
            
            {
                data.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))
            }

            {/* Horizontal Scroll (------->) for Thumbnails (or a Mesh) 
            On Click ---> Modal Item pops up with Description of project and Live Link/Source Link
            */}
            <section className="horizontal-scroll-section">
                Horizontal Scroll
            </section>

            
        </section>
    )
}

export default Projects