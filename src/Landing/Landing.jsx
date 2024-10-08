import React from 'react'

//Components
import Bio from './Bio/Bio'
import Name from './Name/Name'

//Styles
import './styles/Landing.css'


function Landing() {
    /**
     * This will house the overall layout of the Landing Section
     */
    return (
        <>  
            <Name />
            <section className='landing-section'>
                <Bio />
            </section>
        </>
    )
}

export default Landing