import React, {forwardRef} from 'react'




const MagicPlane = forwardRef((props, ref) => {
    return (
        <>
            <mesh ref={ref} {...props}>
                <planeGeometry args={[1.25, 1.75, 32, 32]} transparent/>              
            </mesh>
        </>
    )
})

export default MagicPlane