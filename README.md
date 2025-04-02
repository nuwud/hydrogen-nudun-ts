### ✅ Upgraded `README.md`

```md
# 🍉 Hydrogen Skeleton + WatermelonMenu3D System

Welcome to the **Hydrogen Skeleton + WatermelonMenu3D** edition — a Shopify-first 3D layout starter using Hydrogen 2025, Remix, and React Three Fiber. Designed for immersive product menus, futuristic interaction, and a scalable dev environment.

---

## 🚀 Features

- 🌐 Hydrogen 2025 + Remix routing
- 🍉 `WatermelonMenu3D`: Orbiting 3D route-aware menu
- 🧱 `Layout3DWrapper`: Optional layout shell for persistent 3D scenes
- 🧲 Shopify-compatible routes + `<TetrahedronButton />` for toggles/dev UI
- 🎨 Custom fonts, lighting, and GLTF assets for interaction
- ⚙️ Flat ESLint config + VSCode developer settings
- 🧪 `prelint.ts` CLI to validate project config & catch type drift
- 🧰 TypeScript-first scaffolding with Shopify's generated storefront types

---

## 📁 Project Structure (Key Custom Additions)

```
app/
├── components/
│   ├── WatermelonMenu3D.tsx        ← 3D Menu w/ orbit, routing, and text
│   ├── Layout3DWrapper.tsx         ← Optional layout with Canvas
│   ├── TetrahedronButton.tsx       ← Dev mode or GUI toggle
├── config/
│   └── WatermelonMenuConfig.ts     ← Label + route data
├── lib/
│   └── threeUtils.ts               ← Future R3F helpers
public/assets/
│   ├── font.typeface.json          ← Custom JSON font
│   ├── tetrahedron.glb             ← Button model (GLTF)
│   ├── skyball.jpg                 ← Environment lighting placeholder
tools/
│   └── prelint.ts                  ← Dev sanity checker (ESLint, versions)
.vscode/
│   └── settings.json               ← Auto-format, prop sorting, DX boosts
```

---

## ⚙️ Shopify + Dev Tooling

| Tool               | Status         |
|--------------------|----------------|
| Hydrogen 2025      | ✅ Ready        |
| Remix              | ✅ Stable       |
| Shopify CLI        | ✅ Integrated   |
| TypeScript         | ✅ Strict mode  |
| ESLint + Prettier  | ✅ Flat config  |
| React Three Fiber  | ✅ 8.18.x       |
| Drei               | ✅ 9.122.x      |

---

## 🧠 Local Development

### 🔨 Requirements

- Node 18+
- Shopify CLI installed
- `@shopify/hydrogen` v2025.1.x
- 3D-friendly VSCode setup (`TypeScript Hero`, `ESLint`, `Shader support`)

### 🔧 Install & Start

```bash
npm install
npm run dev
```

Then visit: `http://localhost:3000`

---

## 🧪 Tooling Commands

```bash
npm run lint        # Run ESLint manually
npm run prelint     # Run pre-checks for config, deps, and lint sanity
npm run build       # Build for production
```

---

## 📌 Roadmap / WIP

- [ ] Link menu items to real Shopify products & collections
- [ ] Integrate `@react-spring/three` for animation
- [ ] Expose menu structure via metafields or CMS
- [ ] Animate camera or auto-focus on hover
- [ ] Wrap into `App.server.tsx` for global control
- [ ] Add `watermelon.config.ts` CLI or seed system for extending layouts

---

## 💬 Why This Matters

This starter goes **beyond static layout** by giving Hydrogen the ability to:
- Present immersive menus with live product routes
- Use 3D interaction to represent categories, promos, brands
- Transition into full-page 3D experiences for luxury, games, or interactive narratives

---

## 🧠 Trügüd’s Dev Manifesto

> “Don’t just build pages — build portals. Code is a gift to your future self.”

If something works once, document it. If it fails twice, automate the fix. If it delights, ship it.

---

## ✍️ Author

Patrick Allan Wood – `Nuwud Multimedia`  
[https://nuwud.net](https://nuwud.net)  
*Built with AI, family, and a little watermelon juice.*

```

# 🍉 WatermelonMenu3D Integration Guide

This document outlines the setup, purpose, and developer usage patterns for the 3D interactive main menu system integrated into Hydrogen.

## 🚀 Purpose
WatermelonMenu3D is a 3D orbiting menu system designed to:
- Act as a main site navigation UI in 3D space
- Be visually captivating and reactive
- Connect seamlessly to Hydrogen/Shopify routes
- Serve as a modular and extensible layout base

## 🧱 Tech Stack
- [@react-three/fiber](https://github.com/pmndrs/react-three-fiber)
- [@react-three/drei](https://github.com/pmndrs/drei)
- Remix / Hydrogen 2025
- TypeScript + ESLint + Vite

## 🧩 Components
- `WatermelonMenu3D.tsx`: Main Canvas entrypoint
- `Menu()`: Carousel group with orbiting clickable `Text3D`
- `TetrahedronButton.tsx`: dat.GUI toggle launcher (bottom-right)
- `Layout3DWrapper.tsx`: Encapsulates 3D layer and passes children

## 📦 Setup Instructions

1. Ensure the following font is present:
```
public/assets/font.typeface.json
```
2. Update Hydrogen root in `App.server.tsx`:
```tsx
<Layout3DWrapper>
  <Suspense fallback={<div>Loading site...</div>}>
    <RouterProvider router={router} />
  </Suspense>
</Layout3DWrapper>
```
3. Menu Items:
```ts
// config/WatermelonMenuConfig.ts
export const menuItems = [
  { label: 'Home', route: '/' },
  { label: 'Shop', route: '/collections' },
  { label: 'Contact', route: '/pages/contact' },
];
```

## ✨ Features
- Animated rotation using `useFrame`
- Clickable `Text3D` using `navigate()` from Remix
- Suspense and lazy loading support
- OrbitControls with pan disabled

## 🔄 Future Tasks
- Add spring-based hover/click animation
- Inject Shopify metafield data dynamically
- Add submenu vertical wheel logic
- Toggle UI elements with dat.GUI / Tetrahedron

## 🧠 Developer Notes
- ESLint `react/no-unknown-property` must be overridden for props like `rotation`, `font`, `args`, etc.
- FontLoader must be handled via `useLoader(FontLoader, 'path')` to get a `FontData`, not `Font`
- Don't use raw `Font` types from `three`
- Canvas must remain SSR-safe via `Suspense` and `lazy` boundaries

## 🗂️ Optional: Docs Locations
- `docs/ABOUT.md` (Project story)
- `docs/WATERMELON.md` (Technical guide)
- `CHANGELOG.md` (Semver-style log)
- `.github/ISSUE_TEMPLATE/` (Feature / bug tracking)

---

> Built with joy, creativity, and one juicy commit at a time 🍉

— Team Nuwud x Trügüd


