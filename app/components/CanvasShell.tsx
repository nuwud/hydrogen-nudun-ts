// components/CanvasShell.tsx
import {Suspense, lazy} from 'react';

const WatermelonCanvas = lazy(() => import('./WatermelonCanvas'));

export default function CanvasShell() {
  return (
    <Suspense fallback={<div className="loading">Loading 3D...</div>}>
      <WatermelonCanvas />
    </Suspense>
  );
}
