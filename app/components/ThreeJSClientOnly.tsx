// components/ThreeJSClientOnly.tsx
import { useEffect, useState } from 'react';

type ThreeJSClientOnlyProps = {
    children: React.ReactNode;
    fallback?: React.ReactNode;
};

export default function ThreeJSClientOnly({ 
    children, 
    fallback = null 
}: ThreeJSClientOnlyProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    return mounted ? children : fallback;
}
