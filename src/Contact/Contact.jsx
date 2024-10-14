import React from 'react'

import './styles/Contact.css'

import linkedin from '../assets/tech_icons/LinkedIn.svg'
import github from '../assets/tech_icons/github.svg'

import { SiGithub } from "react-icons/si";
import { MdEmail } from "react-icons/md";

function Contact() {
    /**
     * This will house the overall layout of the Contact Section
     */
    return (
        <section className='contact-section'>             
            <div className="contact-section-group">
                <img src={linkedin} alt="" />
                <MdEmail />
            </div>
            
            <SiGithub />
            
        </section>
    )
}

export default Contact