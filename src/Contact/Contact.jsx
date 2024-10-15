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
        <>
            
            <footer className='contact-section'>  
                <h2>Contact Me</h2>           
                <div className="contact-section-flex-container">
                    <div className="flex-group">
                        <a href="https://www.linkedin.com/in/rsanghani/"
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover-item"
                        >
                            <span className="contact-item-text">Let's Connect</span>
                            <img src={linkedin} alt="LinkedIn profile" />
                        </a>
                        <a href="mailto:raam.sanghani@gmail.com"
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover-item"
                        >
                            <span className="contact-item-text">Let's Chat</span>
                            <MdEmail />
                        </a>
                    </div>
                    <a href="https://github.com/Raamtaro"
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover-item"
                    >
                        <span className="contact-item-text">Let's Collaborate</span>
                        <SiGithub />
                    </a>
                </div>
                
            </footer>
        </>
    )
}

export default Contact