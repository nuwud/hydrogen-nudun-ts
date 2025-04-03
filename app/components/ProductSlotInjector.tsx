/**
 * ProductSlotInjector.tsx
 *
 * 🍉 WatermelonOS Product Injector [GLOW-UP VERSION ✨]
 *
 * Responsibilities:
 * - Dynamically injects products into WatermelonMenu3D slots
 * - Reads metafields like `slotTarget` to place items
 * - Syncs with mock or live Shopify product payloads
 * - Supports injection into center, menu, and submenu positions
 * - Modular slotGroupRef design for carousel interaction
 */

import React, { useEffect } from 'react';
import * as THREE from 'three';
import { useSceneContext } from '../context/SceneManager';
import { useShopifyProducts } from '../hooks/useShopifyProducts';
import { Product3DCard } from './Product3DCard';

// Mock products as fallback data
const mockProducts = [
    {
        id: 'product-1',
        title: 'Watermelon T-Shirt',
        description: 'A cool t-shirt with watermelon print',
        price: '24.99',
        metafields: { slotTarget: 'center' }
    },
    {
        id: 'product-2',
        title: 'Watermelon Hat',
        description: 'A stylish watermelon hat',
        price: '19.99',
        metafields: { slotTarget: 'menu:accessories' }
    },
];

interface ProductSlotInjectorProps {
    slotGroupRef?: React.RefObject<THREE.Group>;
    mountSlot?: (slotTarget: string, node: React.ReactNode) => void;
    theme?: string;
}

export default function ProductSlotInjector({ 
    slotGroupRef, 
    mountSlot, 
    theme = 'default' 
}: ProductSlotInjectorProps) {
    const { isMenuVisible } = useSceneContext();
    const { products, loading } = useShopifyProducts(mockProducts);

    useEffect(() => {
        if (loading) return;
        
        // Handle direct Three.js injection via slotGroupRef
        if (slotGroupRef?.current && isMenuVisible) {
            // Clear existing children before injection
            while (slotGroupRef.current.children.length) {
                slotGroupRef.current.remove(slotGroupRef.current.children[0]);
            }
        }

        products.forEach((product, index) => {
            const slotTarget = 
                (typeof product.metafields === 'object' && !Array.isArray(product.metafields) ? (product.metafields as {slotTarget?: string})?.slotTarget : null) || 
                product.metafields?.find?.((m: { key: string; value: string }) => m.key === 'slotTarget')?.value || 
                `slot-${index}`;
                
            const position = calculateSlotPosition(index, slotTarget, products.length);
            
            const productCard = (
                <Product3DCard 
                    key={product.id} 
                    product={product} 
                    position={position}
                    theme={theme as any}
                />
            );

            // If mountSlot function is provided, use it
            if (mountSlot) {
                mountSlot(slotTarget, productCard);
            }
            // Otherwise assume Three Fiber container handles mounting
        });
    }, [products, isMenuVisible, slotGroupRef, mountSlot, loading, theme]);

    return null;
}

/**
 * Calculate where a product should go based on metafield and index.
 */
function calculateSlotPosition(
    index: number, 
    slotTarget: string, 
    totalProducts: number
): [number, number, number] {
    const baseRadius = 3.2;
    const angle = (index / (totalProducts || 8)) * Math.PI * 2;

    switch (slotTarget) {
        case 'center':
            return [0, 0.25, 0];
        case 'menu':
            return [Math.cos(angle) * baseRadius, 0, Math.sin(angle) * baseRadius];
        case 'submenu:featured':
        case 'menu:accessories':
            return [Math.cos(angle) * (baseRadius * 1.3), 1, Math.sin(angle) * (baseRadius * 1.3)];
        default:
            return [Math.cos(angle) * baseRadius, 0, Math.sin(angle) * baseRadius];
    }
}
