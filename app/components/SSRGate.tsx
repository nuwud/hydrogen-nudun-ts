// components/SSRGate.tsx
import { useIsBrowser } from '~/hooks/useIsBrowser';
import { useEffect, useState, Suspense } from 'react';


interface SSRGateProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function SSRGate({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
    const [isClient, setIsClient] = useState(false);
  
    useEffect(() => {
      setIsClient(true);
    }, []);
  
    return <>{isClient ? children : fallback ?? null}</>;
  }