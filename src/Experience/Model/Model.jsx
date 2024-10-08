import React from 'react'

import { useGLTF } from '@react-three/drei'

function Model() {
    const model = useGLTF('./translatedMask.glb')
    return (
        <>
            <primitive object={model.scene} scale={0.5}/>
        </>
    )
}

export default Model