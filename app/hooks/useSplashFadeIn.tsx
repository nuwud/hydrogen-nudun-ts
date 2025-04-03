// hooks/useSplashFadeIn.tsx
import { useSpring, animated } from '@react-spring/three';
import { useEffect, useState } from 'react';

export function useSplashFadeIn(isVisible: boolean = false) {
  const [shouldShow, setShouldShow] = useState(isVisible);
  
  // Auto-hide splash after 3 seconds
  useEffect(() => {
    if (isVisible) {
      setShouldShow(true);
      
      const hideTimer = setTimeout(() => {
        setShouldShow(false);
      }, 3000);
      
      return () => {
        clearTimeout(hideTimer);
      };
    } else {
      setShouldShow(false);
    }
  }, [isVisible]);

  // Spring animation
  return useSpring({
    scale: shouldShow ? 1 : 0,
    opacity: shouldShow ? 1 : 0,
    config: { mass: 1, tension: 120, friction: 12 },
  });
}
