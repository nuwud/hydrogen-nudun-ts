// hooks/useIsBrowser.ts
import { useEffect, useState } from 'react';

export function useIsBrowser(): boolean {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(typeof window !== 'undefined');
  }, []);
  return isBrowser;
}
