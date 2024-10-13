import React, {useMemo, useEffect} from 'react'

import * as THREE from 'three'

function Particles() {


    let positions = useMemo(()=> {
        const particlesCount = 200
        const positions = new Float32Array(particlesCount * 3)
        const objectsDistance = 5

        for (let i = 0; i < particlesCount; i++) {
            positions[i * 3 + 0] = (Math.random() - 0.5) * 10
            positions[i * 3 + 1] = objectsDistance * (0.5 - Math.random() * 3)
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10
        
        }

        return positions
    })

    return (
        <points>
            <bufferGeometry attach="geometry">
                <bufferAttribute 
                    attach="attributes-position"
                    array={positions}
                    count={200}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                attach="material"
                
                color={0xe6fbf3}
                size={0.06}
                sizeAttenuation 
                
            />
        </points>
    )
}

export default Particles