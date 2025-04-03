/**
 * Product3DCard.tsx
 *
 * 🍉 WatermelonOS 3D Product Visualization Card
 *
 * Responsibilities:
 * - Displays a product as a rotating 3D card
 * - Reacts to hover (shimmer + scale) and click (expand)
 * - Shows product info & "Buy Now" button on expand
 * - Reads slotTarget to map into WatermelonMenu3D
 * - Applies visual theme: 'black', 'white', 'rainbow'
 * - Integrated with Hydrogen cart API via useBuyNow hook
 *
 * Mounted by: ProductSlotInjector.tsx
 * Used within: WatermelonMenu3D.tsx
 */

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { Html } from '@react-three/drei';
import { a, useSpring } from '@react-spring/three';
import { useBuyNow } from '../hooks/useBuyNow';
import { useShimmerMaterial } from '../hooks/useShimmerMaterial';
import { ShopifyProduct } from '../../types/shopify';

interface Product3DCardProps {
    product: ShopifyProduct;
    position?: [number, number, number];
    slotTarget?: string; // e.g., 'center', 'menu:shoes', 'submenu:accessories'
    isExpanded?: boolean; // Controls whether the card is in zoomed-in state
    onClick?: () => void; // Triggered when the user clicks the card
    theme?: 'black' | 'white' | 'rainbow'; // Visual appearance theme
}

export function Product3DCard({
    product,
    position = [0, 0, 0],
    slotTarget = 'center',
    isExpanded = false,
    onClick,
    theme = 'white',
}: Product3DCardProps) {
    const meshRef = useRef<Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const { buyNow } = useBuyNow();
    const shimmerMaterial = useShimmerMaterial(hovered ? '#e0ffff' : '#ffffff');

    // 🔄 Continuous slow rotation unless expanded
    useFrame((_, delta) => {
        if (meshRef.current && !isExpanded) {
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    // 🌟 Smooth scale animation on hover
    const { scale } = useSpring({
        scale: hovered ? 1.15 : 1,
        config: { tension: 300, friction: 10 },
    });

    const handleClick = (e: any) => {
        e.stopPropagation();
        if (onClick) onClick();
        else buyNow(product);
    };

    return (
        <a.mesh
            ref={meshRef}
            position={position}
            scale={isExpanded ? 1.5 : scale}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={handleClick}
            castShadow
            receiveShadow
        >
            <boxGeometry args={[0.8, 1.2, 0.1]} />
            
            {theme === 'rainbow' ? (
                <primitive object={shimmerMaterial} attach="material" />
            ) : (
                <meshStandardMaterial
                    color={theme === 'white' ? '#fff' : '#222'}
                    emissive={hovered ? 'magenta' : 'black'}
                    metalness={0.4}
                    roughness={0.3 as unknown as number}
                    attach="material"
                />
            )}

            {/* 🪟 UI Overlay on Expand (HTML in 3D space) */}
            {isExpanded && (
                <Html center>
                    <div className="bg-black/80 text-white p-2 rounded shadow-xl w-40 text-xs space-y-2">
                        <h4 className="font-bold">{product.title}</h4>
                        <p className="truncate">{product.description}</p>
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded"
                            onClick={(e) => {
                                e.stopPropagation();
                                buyNow(product);
                            }}
                        >
                            Buy Now
                        </button>
                    </div>
                </Html>
            )}
        </a.mesh>
    );
}
