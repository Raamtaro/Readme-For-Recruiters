import React, {useRef} from 'react'

//FrontEnd Icons
import { GrHtml5 } from "react-icons/gr";
import { GrCss3 } from "react-icons/gr";
import { RiJavascriptLine } from "react-icons/ri";
import { GrReactjs } from "react-icons/gr";
import { TbBrandThreejs } from "react-icons/tb";
import { SiWebgl } from "react-icons/si";

//Backend Icons
import { RiNodejsFill } from "react-icons/ri";
import { SiExpress } from "react-icons/si";
import { SiPostgresql } from "react-icons/si";
import { SiPrisma } from "react-icons/si";

//Others
import { SiGithub } from "react-icons/si";
import { SiVite } from "react-icons/si";
import { SiWebpack } from "react-icons/si";

//GSAP
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

//styles
import './style/Skills.css'

gsap.registerPlugin(useGSAP,ScrollTrigger);

function Skills() { 
    /**
     * This is different from the SkillCards.jsx component that's currently in the Projects.jsx section! 
     * This is is own separate section that displays skills.
     */
    const skillsContainer = useRef()

    useGSAP(()=> {
        const skillCards = gsap.utils.toArray(skillsContainer.current.children)
        gsap.to(
            skillCards,
            {
                opacity: 1,
                duration: 1.25,
                ease: 'power3.out',
                stagger: .25,
                scrollTrigger: {
                    trigger: skillsContainer.current,
                    toggleActions: 'restart pause resume none'
                }
            }
        )

    }, {scope: skillsContainer})

    return (
        <section className='skills-section' ref={skillsContainer}> 
            
            <div className="skill-section-item">
                <h3>Front End</h3>
                <ul className="skill-section-list">
                    <div className="row">
                        <li className="skill-section-list-item">
                            <GrHtml5 />
                            <span>HTML</span>
                        </li>
                        <li className="skill-section-list-item">
                            <GrCss3 />
                            <span>CSS</span>
                        </li>
                        <li className="skill-section-list-item">
                            <RiJavascriptLine />
                            <span>Java Script</span>
                        </li>
                    </div>
                    <div className="row">
                        <li className="skill-section-list-item">
                            <GrReactjs />
                            <span>React</span>
                        </li>
                    </div>
                    <div className="row">
                        <li className="skill-section-list-item">
                            <TbBrandThreejs />
                            <span>Three JS</span>
                        </li>
                        <li className="skill-section-list-item">
                            <SiWebgl />
                            <span>WebGL</span>
                        </li>
                    </div>
                </ul>
            </div>
            <div className="skill-section-item">
                <h3>Back End</h3>
                <ul className="skill-section-list">
                    <div className="row">
                        <li className="skill-section-list-item">
                            <RiNodejsFill />
                            <span>Node JS</span>
                        </li>
                        <li className="skill-section-list-item">
                            <SiExpress />
                            <span>Express</span>
                        </li>
                    </div>
                    <div className="row">
                        <li className="skill-section-list-item">
                            <SiPostgresql />
                            <span>pSQL</span>
                        </li>
                        <li className="skill-section-list-item">
                            <SiPrisma />
                            <span>Prisma</span>
                        </li>
                    </div>
                </ul>
            </div>
            <div className="skill-section-item">
                <h3>Build & CI/CD</h3>
                <ul className="skill-section-list">
                    <div className="row">
                        <li className="skill-section-list-item">
                            <SiGithub />
                            <span>Github</span>
                        </li>
                        <li className="skill-section-list-item">
                            <SiVite />
                            <span>Vite</span>
                        </li>
                        <li className="skill-section-list-item">
                            <SiWebpack />
                            <span>WebPack</span>
                        </li>
                    </div>
                </ul>
            </div>
        </section>

    )
}

export default Skills