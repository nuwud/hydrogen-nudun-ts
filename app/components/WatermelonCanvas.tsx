// app/components/WatermelonCanvas.tsx
import { lazy, Suspense, useState, useEffect } from 'react';
import { SSRGate } from './SSRGate';

const WatermelonMenu3D = lazy(() => import('./WatermelonMenu3D'));

export default function WatermelonCanvas() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="loading">🌐 Waiting for client...</div>;

    return (
        <SSRGate fallback={<div className="loading">🌀 Booting 3D Scene...</div>}>
            <Suspense fallback={<div className="loading">🍉 Loading WatermelonMenu3D...</div>}>
                <WatermelonMenu3D />
            </Suspense>
        </SSRGate>
    );
}
