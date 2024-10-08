import React, {useState, useEffect, useRef} from 'react'

import Title from './Title/Title'
import SkillCard from './SkillCard/SkillCard'
import ModalInfo from './ModalInfo/ModalInfo'


function Projects() {
    /**
     * This will house the overall layout of the Projects Section
     * I think it should also compile each child component and we should have this component solely handle gsap logic for horizontal scroll fnctlty
     */
    return (
        <section className='projects-section'>
            Projects
            {/* Title (Displays the project Name*/}
            {/* Horizontal Scroll (------->) Area 1 for Thumbnails (or a Mesh) 
            On Click ---> Modal Item pops up with Description of project and Live Link/Source Link
            */}
            {/* Horizontal Scroll (<-------) Area 2 for Tech Icons */}
            
            {/* 
                In Total:
                1. Title.jsx x # of Projects
                2. ProjectMesh.jsx (Contained in the first scrollable area) x # of projects
                3. ModalDescription.jsx x # of Projects
                4. Tech List (Dynamically sets up list of tech items in a single row)
            */}

            
        </section>
    )
}

export default Projects