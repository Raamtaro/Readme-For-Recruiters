import React from 'react'
import skillIcons from '../../../utils/skillIcons.js'

//styles
import './styles/SkillCard.css'

function SkillCard({skills}) {
  return (
    <div className="skills-container">
      {skills.map((skill) => (
        <div key={skill} className='skill-icon'> 
          <img src={skillIcons[skill.toLowerCase()]} alt={skill} />
        </div>
      ))}
    </div>
  )
}

export default SkillCard