import React, {useState} from 'react'
import Modal from 'react-modal'

import './styles/Title.css'

function Title({title, skills, description}) {
  const [showModal, setShowModal] = useState(false) 


  const handleOpen = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  // console.log(skills)


  return (
    <>
      
      <h2 className="project-link">
        <span className="title-text" onClick={handleOpen}>{title}</span>
        <span className="underline"></span>
      </h2>
      <Modal 
        isOpen={showModal}
        ariaHideApp={false}
        onRequestClose={handleClose}
        contentLabel="Project Description Modal"
        
      > 
        <figure>
          <figcaption>
            Skills List
          </figcaption>
          <ul>
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </figure>

      </Modal>
    </>
  )
}

export default Title