import { useRef, useEffect, useState } from 'react'; // Add useState
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';
import { useSceneContext } from '../context/SceneManager';
import { useThemeConfig } from '../hooks/useThemeConfig';
import { useShimmerMaterial } from '../hooks/useShimmerMaterial';

// Augment JSX interface with module syntax
declare module 'react' {
  interface JSX {
    intrinsicElements: {
      primitive: any;
    }
  }
}

type Props = {
  position?: Vector3 | [number, number, number];
  scale?: number | Vector3 | [number, number, number];
  onClick?: () => void;
};

export default function TetrahedronButton({ 
  position = [2.7, -1.8, 3], 
  scale = 0.2,
  onClick 
}: Props) {
  const meshRef = useRef<Mesh>(null);
  const { scene } = useGLTF('/assets/tetrahedron.glb');
  const { toggleMenu } = useSceneContext();
  const { color } = useThemeConfig();
  const material = useShimmerMaterial(color);
  const [showDebug, setShowDebug] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Use the handler from props or scene context
  const handleClick = () => {
    setClickCount(prev => prev + 1);
    if (onClick) onClick();
    else toggleMenu();
  };

  // Calculate scale array based on input type
  const scaleArray = typeof scale === 'number' ? [scale, scale, scale] : scale;

  // Set castShadow and receiveShadow on the scene objects
  useEffect(() => {
    scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
    
    // Secret key combination to toggle debug panel (Ctrl+Shift+D)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setShowDebug(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scene]);

  return (
    <>
      <group position={position} onClick={handleClick}>
        <primitive 
          ref={meshRef} 
          object={scene} 
          scale={scaleArray} 
          //castShadow 
          //receiveShadow
        />
      </group>
      
      {/* Hidden Debug Panel - Press Ctrl+Shift+D to toggle */}
      {showDebug && (
        <div style={{
          position: 'fixed',
          bottom: '10px',
          left: '10px',
          background: 'rgba(0,0,0,0.7)',
          color: 'lime',
          padding: '10px',
          borderRadius: '5px',
          fontFamily: 'monospace',
          fontSize: '12px',
          zIndex: 9999,
        }}>
          <h4>TetrahedronButton Debug</h4>
          <p>Position: [{(position as any).join(', ')}]</p>
          <p>Scale: {typeof scale === 'number' ? scale : JSON.stringify(scale)}</p>
          <p>Color: {JSON.stringify(color)}</p>
          <p>Click count: {clickCount}</p>
        </div>
      )}
    </>
  );
}

useGLTF.preload('/assets/tetrahedron.glb');
