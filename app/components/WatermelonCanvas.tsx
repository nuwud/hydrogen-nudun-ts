// app/components/WatermelonCanvas.tsx
import { Canvas } from '@react-three/fiber';
import { Suspense, lazy, useState, useEffect } from 'react';

const WatermelonMenu3D = lazy(() => import('./WatermelonMenu3D'));

export default function WatermelonCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="loading">🌐 Waiting for client...</div>;

  return (
    <Canvas>
      <Suspense fallback={<div className="loading">🍉 Loading WatermelonMenu3D...</div>}>
        <WatermelonMenu3D />
      </Suspense>
    </Canvas>
  );
}
