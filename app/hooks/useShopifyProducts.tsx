// hooks/useShopifyProducts.tsx

import { useEffect, useState } from 'react';
import { ShopifyProduct } from '../../types/shopify';
import { mockShopifyProducts } from '../../mock/shopifyMockProducts';

interface UseShopifyProductsReturn {
  products: ShopifyProduct[];
  loading: boolean;
}

export function useShopifyProducts(mockProducts: { id: string; title: string; description: string; price: string; metafields: { slotTarget: string; }; }[]): UseShopifyProductsReturn {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      // Transform mock products to match ShopifyProduct type
      const completeProducts = mockShopifyProducts.map(product => ({
        id: product.id,
        title: product.title,
        imageUrl: product.imageUrl,
        description: '',  // Default value
        handle: '',       // Default value
        variants: [],     // Default empty array
        // Convert metafields object to expected array format
        metafields: [
          {
            key: 'slotTarget',
            value: product.metafields.slotTarget
          }
        ]
      })) as ShopifyProduct[];
      
      setProducts(completeProducts);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return { products, loading };
}
