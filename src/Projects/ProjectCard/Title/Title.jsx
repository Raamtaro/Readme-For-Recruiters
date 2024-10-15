import React, {useState} from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

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
            zIndex: 10,
            width: '100vw',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(40px)',
            transitionDuration: '300ms',
            transitionTimingFunction: 'ease-out',       
          }}
        >
          <DialogTitle>
            Project Description
          </DialogTitle>
          <div className="close-modal" onClick={handleClose}>X</div>
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
        </DialogPanel>
      </Dialog>

      {/* <Modal 
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
      </Modal> */}
    </>
  )
}

export default Title