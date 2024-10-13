import React from 'react'

import './styles/Title.css'

function Title({title}) {
  return (
    <>
      {/* <h2 className="project-link">{title}</h2> */}
      <h2 className="project-link">
        <span className="title-text">{title}</span>
        <span className="underline"></span>
    </h2>
    </>
  )
}

export default Title