// hooks/useShimmerMaterial.tsx

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshStandardMaterial, Color } from 'three';

export function useShimmerMaterial(baseColor: string = '#ffffff') {
    const materialRef = useRef<MeshStandardMaterial | null>(null);
    
    const material = useMemo(() => {
        const newMaterial = new MeshStandardMaterial({
            color: new Color(baseColor),
            emissive: new Color(baseColor),
            emissiveIntensity: 0.5,
            metalness: 0.8,
            roughness: 0.2,
        });
        materialRef.current = newMaterial;
        return newMaterial;
    }, [baseColor]);
    
    useFrame(({ clock }) => {
        if (materialRef.current) {
            const t = clock.getElapsedTime();
            const pulseIntensity = (Math.sin(t * 2) * 0.5 + 0.5) * 0.3 + 0.2; // Range from 0.2 to 0.5
            materialRef.current.emissiveIntensity = pulseIntensity;
        }
    });
    
    return material;
}
