import create from 'zustand';

type Vector3 = [number, number, number];

export interface SceneState {
  // Menu visibility
  isMenuVisible: boolean;
  toggleMenu: () => void;
  
  // Admin panel
  isAdminVisible: boolean;
  toggleAdmin: () => void;
  
  // Theme
  theme: string;
  setTheme: (theme: string) => void;
  
  // Fallback mode
  fallbackEnabled: boolean;
  toggleFallback: () => void;
  
  // Debug panel
  debugVisible: boolean;
  toggleDebugPanel: () => void;
  
  // UI positioning
  triggerPosition: Vector3;
  setTriggerPosition: (position: Vector3) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  // Menu visibility
  isMenuVisible: false,
  toggleMenu: () => set((state) => ({ isMenuVisible: !state.isMenuVisible })),
  
  // Admin panel
  isAdminVisible: false,
  toggleAdmin: () => set((state) => ({ isAdminVisible: !state.isAdminVisible })),
  
  // Theme
  theme: 'default',
  setTheme: (theme) => set({ theme }),
  
  // Fallback mode
  fallbackEnabled: false,
  toggleFallback: () => set((state) => ({ fallbackEnabled: !state.fallbackEnabled })),
  
  // Debug panel
  debugVisible: false,
  toggleDebugPanel: () => set((state) => ({ debugVisible: !state.debugVisible })),
  
  // UI positioning
  triggerPosition: [-2, 2, 0],
  setTriggerPosition: (position) => set({ triggerPosition: position }),
}));