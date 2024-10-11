import React from 'react'


import Title from './Title/Title.jsx'
import SkillCard from './SkillCard/SkillCard.jsx'

function ProjectCard({project}) {
  return (
    <div className="project-card">
        <Title title={project.title} />
        <SkillCard skills={project.skills} />
    </div>
  )
}

export default ProjectCard