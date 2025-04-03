/**
 * types/shopify.tsx
 *
 * 🌐 Type definitions for Shopify product structures
 * Used throughout WatermelonOS for consistent typing
 */

export interface ShopifyProductVariant {
    id: string;
    title: string;
    price: string;
    availableForSale: boolean;
    selectedOptions?: { name: string; value: string }[];
  }
  
  export interface ShopifyProduct {
    id: string;
    title: string;
    description: string;
    handle: string;
    featuredImage?: {
      url: string;
      altText?: string;
    };
    variants: ShopifyProductVariant[];
    metafields?: {
      key: string;
      value: string;
    }[];
    slotTarget?: string; // Custom metafield alias for product slot targeting
  }
  
  export interface ShopifyCartItem {
    id: string;
    quantity: number;
    merchandiseId: string;
  }
  
  export interface ShopifyCart {
    id: string;
    lines: ShopifyCartItem[];
    totalQuantity: number;
    totalAmount: string;
  }