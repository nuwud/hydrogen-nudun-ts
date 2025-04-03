/**
 * AdminHUDModule.tsx
 *
 * 🛠️ WatermelonOS Admin Heads-Up Display [GLOW-UP VERSION ✨]
 *
 * Responsibilities:
 * - Display floating admin HUD for theme control & debug options
 * - Provide toggles for 3D mode fallback, theme switcher, debug panel visibility
 * - Persist config via localStorage
 * - Integrate cleanly into Layout3DWrapper
 */

import React, { useEffect, useState, useRef, Suspense } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { useSceneContext } from '../context/SceneManager';
import { useThemeConfig } from '../hooks/useThemeConfig';
import Stats from 'stats.js';

// Stats.js wrapper component
function StatsPanel() {
  const statsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!statsRef.current) return;
    
    // Store a reference to the current DOM node
    const currentRef = statsRef.current;
    
    const stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3: custom
    currentRef.appendChild(stats.dom);
    
    // Position the stats panel
    stats.dom.style.position = 'absolute';
    stats.dom.style.top = '2px';
    stats.dom.style.left = '2px';
    
    let animationFrameId: number;
    
    const animate = () => {
      stats.begin();
      stats.end();
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      if (currentRef && stats.dom.parentNode === currentRef) {
        currentRef.removeChild(stats.dom);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return <div ref={statsRef} />;
}

export function AdminHUDModule() {
    const {
        theme, 
        setTheme, 
        fallbackEnabled: fallbackMode, 
        toggleFallback, 
        debugVisible: isAdminVisible, 
        toggleDebugPanel: toggleAdmin
    } = useSceneContext();
    
    const [mounted, setMounted] = useState(false);
    const meshRef = useRef<Mesh>(null!);
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [triggerPosition, setTriggerPosition] = useState<[number, number, number]>([-2, 2, 0]);

    const toggleMenu = () => setIsMenuVisible(!isMenuVisible);

    useEffect(() => {
        setMounted(true);
    }, []);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
        }
    });

    if (!mounted) return null;

    return (
        <>
            <group position={triggerPosition}>
                <mesh
                    ref={meshRef}
                    onClick={() => {
                        setClicked(!clicked);
                        toggleMenu();
                    }}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                >
                <StatsPanel />
                    <tetrahedronGeometry args={[0.3, 0]} />
                    <meshStandardMaterial
                        color={hovered ? 'hotpink' : 'black'}
                        emissive={hovered ? 'white' : 'black'}
                        emissiveIntensity={0.5}
                    />
                </mesh>

                {/* HUD Overlay - Menu Visibility Indicator */}
                <mesh position={[0, -0.5, 0]}>
                    <planeGeometry args={[1, 0.25]} />
                    <meshStandardMaterial 
                        color={isMenuVisible ? 'limegreen' : 'darkred'} 
                        transparent={true} 
                        opacity={0.5} 
                    />
                </mesh>

                {/* Admin Toggle Zone */}
                <mesh
                    position={[0, -1.2, 0]}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (toggleAdmin) toggleAdmin();
                    }}
                >
                    <boxGeometry args={[0.25, 0.25, 0.25]} />
                    <meshStandardMaterial color={isAdminVisible ? 'gold' : 'gray'} emissiveIntensity={0.2} />
                </mesh>
            </group>

            {/* Performance Debug HUD */}
            <Suspense fallback={null}>
                <Html position={[-2, 2.5, 0]} distanceFactor={10} transform>
                    <div className="pointer-events-none select-none text-xs text-white bg-black/70 px-2 py-1 rounded-md shadow-lg">
                        <span>Status: {isMenuVisible ? 'Menu Open' : 'Idle'}</span>
                    </div>
                </Html>
                <StatsPanel />
            </Suspense>

            {/* Scene Settings Panel */}
            {isAdminVisible && (
                <Html position={[0, 3, 0]} distanceFactor={10} transform>
                    <div className="bg-black/80 text-white p-4 rounded-lg shadow-xl w-64 space-y-2">
                        <h3 className="font-bold mb-2">Scene Settings</h3>

                        {/* Theme Selector */}
                        <label htmlFor="theme-select" className="block text-sm">Theme:</label>
                        <select
                            id="theme-select"
                            className="w-full p-1 text-black"
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                        >
                            <option value="black">Black on Black</option>
                            <option value="white">White on White</option>
                            <option value="rainbow">Rainbow Crystal</option>
                        </select>

                        {/* Fallback Mode Toggle */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={fallbackMode}
                                onChange={toggleFallback}
                            />
                            <span className="text-sm">Fallback to Hydrogen</span>
                        </div>

                        {/* Trigger UI Position Adjuster */}
                        <div>
                            <label htmlFor="trigger-position-controls" className="block text-sm mt-2">Trigger Position</label>
                            <div id="trigger-position-controls" className="flex gap-2 text-xs">
                                <input
                                    className="w-full text-black"
                                    type="number"
                                    placeholder="X"
                                    value={triggerPosition[0]}
                                    onChange={(e) => setTriggerPosition([+e.target.value, triggerPosition[1], triggerPosition[2]])}
                                />
                                <input
                                    className="w-full text-black"
                                    type="number"
                                    placeholder="Y"
                                    value={triggerPosition[1]}
                                    onChange={(e) => setTriggerPosition([triggerPosition[0], +e.target.value, triggerPosition[2]])}
                                />
                                <input
                                    className="w-full text-black"
                                    type="number"
                                    placeholder="Z"
                                    value={triggerPosition[2]}
                                    onChange={(e) => setTriggerPosition([triggerPosition[0], triggerPosition[1], +e.target.value])}
                                />
                            </div>
                        </div>
                    </div>
                </Html>
            )}
        </>
    );
}

export default AdminHUDModule;
