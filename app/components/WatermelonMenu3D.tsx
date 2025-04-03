/**
 * WatermelonMenu3D.tsx
 *
 * 🍉 WatermelonOS Interactive 3D Menu [GLOW-UP VERSION ✨]
 *
 * Responsibilities:
 * - Renders the central rotating 3D carousel menu
 * - Injects products into slots dynamically via ProductSlotInjector
 * - Supports admin themes, entrance animations, and splash screen
 * - Handles hover glow, click-to-expand, and fallback toggle
 */

import React, { useRef, useState, useEffect, Suspense } from 'react';
import ThreeJSClientOnly from './ThreeJSClientOnly';
import { useSceneStore } from '../../store/watermelonStore';
// Import Three.js dependencies inside this component to ensure client-side only execution
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls, Text3D, Html } from '@react-three/drei';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { Group, Mesh, Vector3 } from 'three';

// Import local dependencies that depend on Three.js
import TetrahedronButton from './TetrahedronButton';
import { menuItems } from '../config/WatermelonMenuConfig';
import { useSceneContext } from '../context/SceneManager';
import ProductSlotInjector from './ProductSlotInjector';
import { useSplashFadeIn } from '../hooks/useSplashFadeIn';
import fontData from 'public/assets/font.typeface.json';

// Move Menu and EnvironmentWrapper inside WatermelonMenuInner
const WatermelonMenuInner = () => {

  const { theme, setTheme } = useSceneStore();

  // Inner function components
  function Menu() {
    const groupRef = useRef<Group>(null!);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const { isMenuVisible = true, theme = 'default' } = useSceneContext?.() || {};
    const [slots, setSlots] = useState<Array<{ key: any; node: any }>>([]);
    const fadeInValues = useSplashFadeIn?.(isMenuVisible) || { opacity: 0, scale: 0 };
    const { opacity: splashOpacity } = fadeInValues;
    
    // Load the 3D font
    const fontLoader = new FontLoader();
    const font = fontLoader.parse(fontData);
    const radius = 3; // Distance of menu items from center
    
    useFrame(({ clock }, delta) => {
      if (groupRef.current && isMenuVisible) {
        // Use improved, smoother rotation
        groupRef.current.rotation.y += delta * 0.25;
      }
    });

    const onMountToSlot = (slotTarget: string | number, node: React.ReactNode) => {
      setSlots((prev) => [...prev, { key: slotTarget, node }]);
    };

    useEffect(() => {
      if (!isMenuVisible) setSlots([]);
    }, [isMenuVisible]);

    return (
      <group ref={groupRef}>
        {/* Splash Screen */}
        {typeof splashOpacity === 'number' ? 
          (splashOpacity > 0 && (
            <mesh position={[0, 1.5, 0]}>
              <Text3D
                font={font}
                size={0.2}
                height={0.02}
              >
                Welcome to WatermelonOS v1.0
                <meshStandardMaterial color="#fdf6e3" transparent={true} opacity={splashOpacity} />
              </Text3D>
            </mesh>
          ))
          : (splashOpacity?.get?.() > 0 && (
            <mesh position={[0, 1.5, 0]}>
              <Text3D
                font={font}
                size={0.2}
                height={0.02}
              >
                Welcome to WatermelonOS v1.0
                <meshStandardMaterial color="#fdf6e3" transparent={true} opacity={splashOpacity?.get?.()} />
              </Text3D>
            </mesh>
          ))
        }
        
        {/* Original Menu Items */}
        {menuItems.map((item, i) => {
          const angle = (i / menuItems.length) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const position = new Vector3(x, 0, z);

          return (
            <Text3D
              key={item.label}
              font={font}
              size={0.5}
              height={0.1}
              bevelSegments={5}
              position={position.toArray()}
              onClick={() => setActiveIndex(i)}
            >
              {item.label}
              <meshStandardMaterial color={i === activeIndex ? 'hotpink' : 'white'} />
            </Text3D>
          );
        })}
        
        {/* Injected Product Slots */}
        {slots.map(({ key, node }) => (
          <group key={key}>{node}</group>
        ))}

        {/* Injector logic mount */}
        {typeof ProductSlotInjector === 'function' && (
          <ProductSlotInjector 
            mountSlot={onMountToSlot} 
            theme={theme} 
          />
        )}
      </group>
    );
  }

  function EnvironmentWrapper() {
    const groundRef = useRef<Mesh>(null!);
    const [showGround, setShowGround] = useState(false);

    return (
      <>
        <ambientLight intensity={1.2} />
        <directionalLight intensity={0.6} position={[5, 5, 5]} />
        {showGround && (
          <mesh ref={groundRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial color="#111" />
          </mesh>
        )}
      </>
    );
  }
  
  return (
    <Canvas camera={{ position: [0, 2, 7], fov: 50 }} shadows>
      <Suspense fallback={<Html>Loading...</Html>}>
        <Menu />
        <EnvironmentWrapper />
        <Environment preset="city" background={false} blur={0.5} />
      </Suspense>
      <OrbitControls enablePan={false} />
      <TetrahedronButton />
    </Canvas>
  );
};

// Main component that uses client-only rendering for Three.js
export default function WatermelonMenu3D() {
  return (
    <ThreeJSClientOnly fallback={<div className="loading">Loading 3D experience...</div>}>
      <WatermelonMenuInner />
    </ThreeJSClientOnly>
  );
}
