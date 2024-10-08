import React from 'react'

import { useGLTF } from '@react-three/drei'

function Model() {
    const model = useGLTF('./translatedMask.glb')
    return (
        <>
            <primitive object={model.scene} />
        </>
    )
}

export default Model