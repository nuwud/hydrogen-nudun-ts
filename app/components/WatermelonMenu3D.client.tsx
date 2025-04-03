// app/components/WatermelonMenu3D.client.tsx

'use client'; // Only run on the client

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import WatermelonMenu3D from './WatermelonMenu3D';

const WatermelonClientOnly = dynamic(() => Promise.resolve(WatermelonMenu3D), {
  ssr: false,
});

export default function WatermelonClientWrapper() {
  return (
    <Suspense fallback={null}>
      <WatermelonClientOnly />
    </Suspense>
  );
}
