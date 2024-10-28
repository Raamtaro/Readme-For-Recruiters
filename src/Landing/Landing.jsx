import React, {forwardRef} from 'react'

//Components
import Bio from './Bio/Bio'
import Name from './Name/Name'

//Styles
import './styles/Landing.css'


const Landing = forwardRef((props, ref) => {
    /**
     * This will house the overall layout of the Landing Section
     */
    return (
        <>  
            <Name />
            <section ref={ref} className='landing-section'>
                <Bio />
            </section>
        </>
    )
})

export default Landing