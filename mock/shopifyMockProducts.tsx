// mock/shopifyMockProducts.tsx
export const mockShopifyProducts = [
    {
      id: 'prod-001',
      title: 'Neon Watermelon T-Shirt',
      metafields: {
        slotTarget: 'center',
      },
      imageUrl: '/assets/mock-tshirt.png',
    },
    {
      id: 'prod-002',
      title: 'Floating Fruit Sneakers',
      metafields: {
        slotTarget: 'menu:shoes',
      },
      imageUrl: '/assets/mock-sneakers.png',
    },
    {
      id: 'prod-003',
      title: 'Glowing Cap',
      metafields: {
        slotTarget: 'submenu:hats',
      },
      imageUrl: '/assets/mock-cap.png',
    },
  ];
  
export function mockProducts() {
  return mockShopifyProducts;
}