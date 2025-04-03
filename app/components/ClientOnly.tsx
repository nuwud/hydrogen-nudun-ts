import React, { useState, useEffect } from 'react';
import CanvasShell from './CanvasShell'; // Adjust the import path as needed

type CanvasShellProps = React.ComponentProps<typeof CanvasShell>;

interface ClientOnlyProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    return isMounted ? <>{children}</> : <>{fallback}</>;
}

export function SSRSafeCanvasShell(props: Record<string, unknown>) {
    return (
        <ClientOnly fallback={<div>Loading...</div>}>
            <CanvasShell {...props} />
        </ClientOnly>
    );
}
