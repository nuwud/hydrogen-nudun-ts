/*
 * Layout3DWrapper.tsx
 * ---------------------
 * Purpose: This file serves as the master wrapper for the 3D Hydrogen scene.
 * It controls theme selection, admin panel visibility, the fallback toggle,
 * and overall environmental context. This is the first file to load 3D UI overlays
 * like the WatermelonMenu3D and AdminHUDModule.
 *
 * Features:
 * - SceneManager context integration
 * - Fallback mode toggle for returning to classic Hydrogen
 * - Dynamic environment control and theme application
 * - Admin panel and tetrahedron trigger handling
 */

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { SceneManagerProvider, useSceneManager } from '../../app/context/SceneManager';
import WatermelonMenu3D from '../components/WatermelonMenu3D';
import { AdminHUDModule } from './AdminHUDModule';

function SceneContent() {
  const { fallbackMode, currentTheme } = useSceneManager();

  if (fallbackMode) return null;

  const getEnvironmentPreset = () => {
    switch (currentTheme) {
      case 'white': return 'apartment';
      case 'rainbow': return 'studio';
      case 'black':
      default: return 'night';
    }
  };

  return (
    <Canvas camera={{ position: [0, 2, 7], fov: 50 }} shadows>
      <Suspense fallback={null}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <Environment preset={getEnvironmentPreset()} background blur={0.4} />
        <WatermelonMenu3D />
        <AdminHUDModule />
      </Suspense>
    </Canvas>
  );
}

export default function Layout3DWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SceneManagerProvider>
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <SceneContent />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {children}
        </div>
      </div>
    </SceneManagerProvider>
  );
}
