// app/components/Layout3DWrapper.tsx
import { ReactNode } from 'react';
import WatermelonCanvas from './WatermelonCanvas';

interface Layout3DWrapperProps {
  children: ReactNode;
}

export default function Layout3DWrapper({ children }: Layout3DWrapperProps) {
  return (
    <>
      <WatermelonCanvas />
      <div id="portal">{children}</div>
    </>
  );
}
