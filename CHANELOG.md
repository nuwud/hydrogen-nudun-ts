# Changelog

All notable changes to this Hydrogen + Watermelon3D integration will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] - 2025-03-30
### Added
- 🍉 `WatermelonMenu3D.tsx`: Main 3D carousel menu component using React Three Fiber.
- 🧠 `Layout3DWrapper.tsx`: Wrapper layout designed to mount 3D content without breaking Hydrogen.
- ✨ `TetrahedronButton.tsx`: Corner toggle button using simple tetrahedron geometry.
- 📁 `WatermelonMenuConfig.ts`: Centralized menu item config, supports linking to Hydrogen routes.
- 🗂 `global.d.ts`: Declared missing types and Font typings.
- 🧪 `prelint.ts`: Utility script to validate Hydrogen, React, ESLint, and Shopify versions.
- 🧰 Updated `eslint.config.js` with custom rules for React Three Fiber props.
- 🧼 Workspace formatting settings for long-term maintainability.
- 🔧 VS Code settings scaffolded for type safety, ESLint support, and developer clarity.

### Fixed
- 🧩 `Text3D` type mismatch by explicitly loading font as `FontData`.
- 🧽 Cleaned up imports, normalized prop usage across all 3D elements.
- 🛠 ESLint false positives from valid R3F props like `position`, `rotation`, `args`.

### Notes
- 👁 Verified that `Canvas` usage avoids server-side rendering during first paint.
- 💡 OrbitControls default enabled, drag/scroll/zoom tested.
- 🔄 Ground toggle exists for debug but off by default.
- 💾 Hydrogen untouched at root level as of this version.

---

Next target: Injecting `Layout3DWrapper` into root while keeping Shopify-first priorities intact. Commit wisely.
