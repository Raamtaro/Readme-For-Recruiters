import React, {useState} from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

import { RiLiveLine } from "react-icons/ri";
import { SiGithub } from "react-icons/si";

import './styles/Title.css'

function Title({title, skills, description, links}) {
  const [showModal, setShowModal] = useState(false) 

  const handleOpen = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }


  return (
    <>      
      <h2 className="project-link">
        <span className="title-text" onClick={handleOpen}>{title}</span>
        <span className="underline"></span>
      </h2>
      <Dialog
        open={showModal}
        onClose={handleClose}
        style={{
          position: 'relative',
          zIndex: 10,
        }}
        transition
      >
        <DialogPanel
          transition={true}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 99,
            width: '100vw',
            overflowY: 'auto',
            display: 'flex',
            // alignItems: 'center',
            // justifyContent: 'center',
            backdropFilter: 'blur(1rem)',
            padding: '2rem'
      
          }}
        >
          <DialogTitle 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              margin: 0,
              fontWeight: 100,
              display: 'flex',
              flexDirection: 'column',
              padding: '.5rem'
            }}
          >
            <span className="dialog-title" onClick={handleClose}>X</span>
            {/* <span className="dialog-title" style={{paddingLeft: '2rem'}}>{title}</span> */}
          </DialogTitle>
          <div className="modal-flex-container">
            <div className="modal-flex-section">
              <div className="project-links">
                  <a href={links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-links-live"
                  >
                    <RiLiveLine />                    
                  </a>
              
                  <a href={links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-links-live"
                  >
                    <SiGithub />
                  </a>
              </div>
              <ul>
                {skills.map((skill) => (
                  <li key={skill}>{skill.toUpperCase()}</li>
                ))}
              </ul>
            </div>
            <p style={{
              margin: 0
            }}>
              {description}
            </p>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  )
}

export default Title