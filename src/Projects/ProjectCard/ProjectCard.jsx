import React from 'react'


import Title from './Title/Title.jsx'
import SkillCard from './SkillCard/SkillCard.jsx'

//styles
import './styles/ProjectCard.css'

function ProjectCard({project}) {
  
  return (
    <div className="project-card">
        <Title title={project.title} skills={project.skills} description={project.description} />
        <SkillCard skills={project.skills} />
    </div>
  )
}

export default ProjectCard