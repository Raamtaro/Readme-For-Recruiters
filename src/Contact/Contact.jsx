import React from 'react'

import './styles/Contact.css'

import linkedin from '../assets/tech_icons/LinkedIn.svg'

import { SiGithub } from "react-icons/si";
import { MdEmail } from "react-icons/md";

function Contact() {
    /**
     * This will house the overall layout of the Contact Section
     */
    return (
        <>           
            <footer className='contact-section'>  
                          
                <div className="contact-section-flex-container">
                    <a href="https://www.linkedin.com/in/rsanghani/"
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover-item"
                    > 
                        
                        <img src={linkedin} alt="LinkedIn profile" />
                    </a>
                    <a href="mailto:raam.sanghani@gmail.com"
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover-item"
                    >   
                       
                        <MdEmail />
                    </a>
                    <a href="https://github.com/Raamtaro"
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover-item"
                    >
                        
                        <SiGithub />
                    </a>
                </div>
            </footer>
        </>
    )
}

export default Contact