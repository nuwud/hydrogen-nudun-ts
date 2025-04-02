# ABOUT.md

## 🍉 Watermelon3D + Hydrogen Integration

This project is a bold fusion of immersive UI and cutting-edge headless commerce, combining **Shopify Hydrogen** with a fully interactive **React Three Fiber** 3D menu system known as `WatermelonMenu3D`.

We believe that storytelling and user experience begin at first render. With Three.js at the helm of visual navigation, and Hydrogen powering performance and Shopify-first priorities, this stack delivers a storefront that *feels* alive.

---

### ✨ Mission
To transform static Shopify storefronts into immersive, memorable brand portals through:
- Intuitive 3D interaction with accessible fallback experiences
- Deep integration with Shopify routes, metafields, and data APIs
- Lightning-fast performance with SSR-aware design
- AI-assisted development & maintainability

### 🧩 Core Components
- `WatermelonMenu3D.tsx`: Horizontal carousel with submenu Ferris wheel logic
- `TetrahedronButton.tsx`: UI toggle for developer and debug controls
- `Layout3DWrapper.tsx`: Scene-safe wrapper that avoids disrupting Shopify root hydration
- `WatermelonMenuConfig.ts`: Config-driven route & product linking
- `prelint.ts`: Project integrity validator

### 🛠 Tech Stack
- Shopify Hydrogen (Remix-based)
- Three.js + React Three Fiber
- @react-three/drei
- TypeScript, ESLint, Prettier
- Tailwind (planned)
- Vite (Hydrogen-native)

### 🔒 Safety Principles
- **Root preservation**: We never mutate Hydrogen’s root until verified
- **Lint + Type First**: If it doesn’t pass lint/TS checks, it doesn’t ship
- **SSG/SSR-aware**: Canvas never renders during server pass
- **Accessibility next**: 3D-first is optional — graceful degradation required

### 🧠 Trügüd Doctrine
> *"Flow emerges when form and function are in balance. Add magic without breaking the math."*

### 💬 Next Targets
- Integrate Layout3DWrapper at root level
- Map menu items to Shopify products/collections
- Animate transitions & reveal effects
- Scaffold metafields & CMS bridge

---

_This repo is not just an app — it’s a philosophy of immersive ecommerce._
