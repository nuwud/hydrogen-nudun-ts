import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSceneStore } from '../../store/watermelonStore';

type ThemeType = 'black' | 'white' | 'crystal' | 'blue' | 'green' | 'rainbow';

type SceneState = {
  currentTheme: ThemeType;
  fallbackMode: boolean;
  showAdminPanel: boolean;
  isMenuVisible: boolean;
  isAdminVisible: boolean;
  toggleMenu: () => void;
  toggleAdmin: () => void;
  setTheme: (theme: string) => void;
  toggleFallback: () => void;
  triggerPosition: [number, number, number];
  setTriggerPosition: (position: [number, number, number]) => void;
  toggleDebugPanel: () => void;
  theme: ThemeType;
  // Added from your suggested implementation
  adminPanelActive: boolean;
  toggleAdminPanel: () => void;
  toggleFallbackMode: () => void;
  changeTheme: (theme: ThemeType) => void;
  // Adding missing properties
  fallbackEnabled: boolean;
  debugVisible: boolean;
};

const initialState: SceneState = {
  currentTheme: 'black',
  fallbackMode: false,
  showAdminPanel: false,
  isMenuVisible: false,
  isAdminVisible: false,
  toggleMenu: () => {},
  toggleAdmin: () => {},
  setTheme: () => {},
  toggleFallback: () => {},
  triggerPosition: [-2, 2, 0],
  setTriggerPosition: () => {},
  // Added from your suggested implementation
  adminPanelActive: false,
  toggleAdminPanel: () => {},
  toggleFallbackMode: () => {},
  changeTheme: () => {},
  // Adding missing properties with default values
  fallbackEnabled: false,
  debugVisible: false,
  toggleDebugPanel: () => {},
  theme: 'black',
};

const SceneContext = createContext<SceneState>(initialState);

/**
 * SceneManagerProvider Component
 * 
 * Provides context for 3D scene management throughout the application,
 * including theme management, debug panel visibility, admin functionality, 
 * and fallback mode.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the scene context
 * 
 * @remarks
 * This provider combines local state management with the global scene store.
 * It persists user preferences like theme and debug visibility to localStorage.
 * The context includes functionality to:
 * - Toggle admin panel visibility
 * - Switch between normal and fallback rendering modes
 * - Change visual themes
 * - Toggle debug information visibility
 * - Manage scene trigger positions
 */
export function SceneManagerProvider({ children }: { children: React.ReactNode }) {
  const sceneStore = useSceneStore();
  
  // Added local state management for the new functionality
  const [adminPanelActive, setAdminPanelActive] = useState(false);
  const [fallbackMode, setFallbackMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('black');
  // Add state for the missing properties
  const [fallbackEnabled, setFallbackEnabled] = useState(false);
  const [debugVisible, setDebugVisible] = useState(false);

  const toggleAdminPanel = () => {
    setAdminPanelActive(!adminPanelActive);
  };

  const toggleFallbackMode = () => {
    setFallbackMode(!fallbackMode);
    setFallbackEnabled(!fallbackEnabled); // Update the fallbackEnabled state too
  };

  const changeTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);
    sceneStore.setTheme(theme); // Sync with the store
  };

  // Add method to toggle debug panel
  const toggleDebug = () => {
    setDebugVisible(!debugVisible);
  };
  
  useEffect(() => {
    // Load saved theme from localStorage
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('watermelon_theme');
      if (storedTheme) {
        sceneStore.setTheme(storedTheme);
        setCurrentTheme(storedTheme as ThemeType);
      }
      
      // Load saved trigger position from localStorage
      const storedPosition = localStorage.getItem('watermelon_trigger_position');
      if (storedPosition) {
        try {
          const parsed = JSON.parse(storedPosition);
          if (Array.isArray(parsed) && parsed.length === 3) {
            sceneStore.setTriggerPosition(parsed as [number, number, number]);
          }
        } catch (e) {
          console.error("Failed to parse stored trigger position");
        }
      }
      
      // Load saved debug visibility from localStorage
      const storedDebugVisible = localStorage.getItem('watermelon_debug_visible');
      if (storedDebugVisible) {
        sceneStore.toggleDebugPanel();
        setDebugVisible(true); // Set local state too
      }
    }
  }, [sceneStore]);

  // Combine the store with new local state
  const combinedState = {
    ...sceneStore,
    adminPanelActive,
    toggleAdminPanel,
    fallbackMode,
    toggleFallbackMode,
    currentTheme,
    changeTheme,
    fallbackEnabled,
    debugVisible,
    toggleDebugPanel: toggleDebug,
  };

  return (
    <SceneContext.Provider value={combinedState as unknown as SceneState}>
      {children}
    </SceneContext.Provider>
  );
}

export function useSceneContext() {
  const context = useContext(SceneContext);
  if (!context) throw new Error('useSceneContext must be used within SceneManagerProvider');
  return context;
}

export function useSceneManager() {
  return useSceneContext();
}

export function useA(): SceneState {
  return useSceneContext();
}
