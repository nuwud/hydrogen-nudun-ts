// hooks/useThemeConfig.tsx
/**
 * useThemeConfig.tsx
 *
 * 🎨 Hook to manage and persist theme selection across sessions.
 * Interfaces with localStorage and global SceneManager context.
 */

import { useEffect, useMemo } from 'react';
import { useSceneContext } from '../context/SceneManager';

type ThemeType = 'black' | 'white' | 'crystal' | 'rainbow';

interface ThemeConfig {
    color: string;
    emissive: string;
    background: string;
}

export function useThemeConfig() {
    const { theme = 'black', setTheme } = useSceneContext();

    // Define theme configurations
    const config = useMemo<ThemeConfig>(() => {
        switch (theme) {
            case 'white':
                return {
                    color: '#ffffff',
                    emissive: '#ccccff',
                    background: '#f0f0f0'
                };
            case 'crystal':
                return {
                    color: '#00ffff',
                    emissive: '#00cccc',
                    background: '#002222'
                };
            case 'rainbow':
                return {
                    color: '#ff00ff',
                    emissive: '#ffff00',
                    background: '#000000'
                };
            case 'black':
            default:
                return {
                    color: '#222222',
                    emissive: '#cc00cc',
                    background: '#111111'
                };
        }
    }, [theme]);

    // Load theme from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('watermelon-theme') as ThemeType;
            if (saved && saved !== theme && setTheme) {
                setTheme(saved);
            }
        }
    }, [setTheme, theme]);

    // Persist theme when it changes
    useEffect(() => {
        if (typeof window !== 'undefined' && theme) {
            localStorage.setItem('watermelon-theme', theme);
        }
    }, [theme]);

    return { theme, setTheme, ...config };
}
