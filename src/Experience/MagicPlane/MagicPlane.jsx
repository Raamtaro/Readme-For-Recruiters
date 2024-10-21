import React, {forwardRef, useRef} from 'react'
import PlaneShaderMaterial from './PlaneShaderMaterial/PlaneShaderMaterial'
import { useFrame } from '@react-three/fiber'




const MagicPlane = forwardRef((props, ref) => {
    const materialRef = useRef()
    return (
        <>
            <mesh ref={ref} {...props}>
                <planeGeometry args={[1.25, 1.75, 32, 32]}/>   
                <PlaneShaderMaterial ref={materialRef}/>           
            </mesh>
        </>
    )
})

export default MagicPlane