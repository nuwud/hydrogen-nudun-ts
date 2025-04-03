/**
 * hooks/useBuyNow.tsx
 *
 * 🛒 Hook to trigger Shopify cart mutations via Hydrogen
 * Used by Product3DCard to enable Buy Now functionality
 */

import { useCallback } from 'react';
import { useCart } from '@shopify/hydrogen-react';
import type { ShopifyProduct } from '../../types/shopify';

export function useBuyNow() {
  const { linesAdd } = useCart();

  const buyNow = useCallback(
    async (product: ShopifyProduct) => {
      const variant = product.variants?.[0];
      if (!variant) return;

      const input = [
        {
          merchandiseId: variant.id,
          quantity: 1,
        },
      ];

      try {
        await linesAdd(input);
        console.warn('✅ Product added to cart:', product.title);
      } catch (error) {
        console.error('❌ Failed to add to cart:', error);
      }
    },
    [linesAdd]
  );

  return { buyNow };
}
