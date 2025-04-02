\# WATERMELON.md

🍉 \*\*WatermelonMenu3D Component Guide\*\*

A fully interactive, scrollable, 3D carousel-style navigation menu designed with React Three Fiber, for immersive Hydrogen storefronts.

\---

\#\# Features

\- 📦 Horizontally scrolling \*\*parent ring\*\*  
\- 🎡 Ferris-style \*\*submenus\*\* (future enhancement)  
\- 🌐 Uses \`@react-three/fiber\`, \`@react-three/drei\`, and Three.js  
\- 🧠 TypeScript-native and ESLint-compliant  
\- 🪄 Custom \`TetrahedronButton\` to toggle dat.GUI  
\- 🎯 Menu items link to real Hydrogen routes (dynamic or static)

\---

\#\# Component Tree

\`\`\`tsx  
\<Canvas\>  
  \<Suspense\>  
    \<Menu /\>               // Main carousel of Text3D  
    \<EnvironmentWrapper /\> // Lighting \+ optional ground  
    \<Environment /\>        // Drei preset  
  \</Suspense\>  
  \<OrbitControls /\>  
  \<TetrahedronButton /\>  
\</Canvas\>  
\`\`\`

\---

\#\# File Overview

| File                      | Purpose                                                      |  
|--------------------------|--------------------------------------------------------------|  
| \`WatermelonMenu3D.tsx\`   | Main 3D menu \+ scene graph                                   |  
| \`WatermelonMenuConfig.ts\`| Menu item config, label, route                               |  
| \`TetrahedronButton.tsx\`  | Floating toggle control (future dat.GUI use)                |  
| \`Layout3DWrapper.tsx\`    | Bridge to insert into Hydrogen layout                       |

\---

\#\# Usage Instructions

1\. 🧱 Ensure your font is available at \`/public/assets/font.typeface.json\`  
2\. 🌀 Import \`WatermelonMenu3D\` into your \`Layout3DWrapper\`  
3\. 🔗 Update \`WatermelonMenuConfig.ts\` with label \+ route mappings

\`\`\`ts  
export const menuItems \= \[  
  { label: 'Home', route: '/' },  
  { label: 'Products', route: '/collections/all' },  
  { label: 'Contact', route: '/pages/contact' }  
\]  
\`\`\`

4\. 🔄 Wrap layout around \`\<Outlet /\>\` in your root App.server.tsx

\---

\#\# TODO

\- \[ \] Add vertical submenu system (Ferris wheel-style)  
\- \[ \] Hook into Shopify metafields to dynamically drive menu  
\- \[ \] Smooth transitions via \`@react-spring/three\`  
\- \[ \] Toggleable settings panel via dat.GUI  
\- \[ \] Animations for selected/active states

\---

\#\# Tips

\- Use \`.toArray()\` for Vector3 positions  
\- Wrap all 3D content in \`\<Suspense\>\` when using \`useLoader\`  
\- Avoid assigning raw Three.js types to JSX props without checking accepted types (e.g. \`font\` must be \`string\` or \`FontData\`, not \`Font\`)  
\- Set up ESLint rules to silence false positives for R3F props

\---

\_Trügüd Tip™\_: "Don’t fight the scene graph—embrace it. Think in transformations, not placements." 🍉  
