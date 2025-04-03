import { Html } from '@react-three/drei';
import { useSceneManager } from '../context/SceneManager';
import { useEffect, useState } from 'react';

export function WelcomeSplash() {
  const { isMenuVisible } = useSceneManager();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (isMenuVisible) {
      setTimeout(() => setVisible(false), 1000); // Auto-dismiss on menu open
    }
  }, [isMenuVisible]);

  if (!visible) return null;

  return (
    <Html center className="pointer-events-none">
      <div className="text-center text-white bg-black/60 px-8 py-6 rounded-2xl shadow-xl animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Welcome to WatermelonOS v1.0</h1>
        <p className="text-sm text-gray-300">Powered by Nuwud Multimedia</p>
      </div>
    </Html>
  );
}
