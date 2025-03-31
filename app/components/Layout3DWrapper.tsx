import React from 'react';
import WatermelonMenu3D from './WatermelonMenu3D';

export default function Layout3DWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <WatermelonMenu3D />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {children}
      </div>
    </div>
  );
}
