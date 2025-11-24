# Instructions for `simple-event`

This project is a Next.js 16 app (TypeScript, App Router) for developer event discovery. It uses Tailwind CSS, custom utility classes, and a component-driven structure. Follow these guidelines to be productive as an AI coding agent:

## Architecture & Structure
- **App Directory**: All routing and page logic is in `app/`. Main entry: `app/page.tsx`. Layout and global styles: `app/layout.tsx`, `app/globals.css`.
- **Components**: UI components live in `components/`. Example: `LightRays.tsx` (custom OGL WebGL effect), `ExploreBtn.tsx` (event navigation button).
- **Utilities**: Shared helpers in `lib/`, e.g., `lib/utils.ts` (utility for class name merging).
- **Assets**: Static files in `public/` (e.g., `public/icons/`).

## Styling
- **Tailwind CSS**: Used throughout, configured via `app/globals.css` and `postcss.config.mjs`.
- **Custom Utilities**: Project-specific Tailwind utilities and variants are defined in `app/globals.css` (see `@utility` and `@layer` blocks).
- **Component Styles**: Some components (e.g., `LightRays`) have their own CSS files.

## Conventions & Patterns
- **TypeScript**: All code is strictly typed. Use types and interfaces for props and utility functions.
- **Component Aliases**: Path aliases (e.g., `@/components`, `@/lib/utils`) are set in `tsconfig.json` and `components.json`.
- **Client/Server Components**: Use the `"use client";` directive for interactive components.
- **Font Management**: Fonts are loaded via `next/font` in `app/layout.tsx`.

## Workflows
- **Development**: Start with `npm run dev` (see `package.json` scripts). App runs at `http://localhost:3000`.
- **Build**: Use `npm run build` for production builds.
- **Linting**: Run `npm run lint` (ESLint config in `eslint.config.mjs`).
- **No explicit test setup**: No test scripts or test files present.

## Integration & Dependencies
- **OGL**: Used for custom WebGL effects in `LightRays.tsx`.
- **Lucide**: Icon library via `lucide-react`.
- **Tailwind Merge/clsx**: For class name composition in `lib/utils.ts`.
- **No backend/API**: This codebase is frontend-only.

## Examples
- **Add a new page**: Create a file in `app/` (e.g., `app/about/page.tsx`).
- **Add a component**: Place in `components/`, import using `@/components/ComponentName`.
- **Style an element**: Use Tailwind classes or extend in `app/globals.css`.

## References
- See `README.md` for basic Next.js usage.
- See `components.json` for UI and alias config.
- See `app/globals.css` for custom styles and utility patterns.

---

**When in doubt, follow the patterns in `app/`, `components/`, and `lib/`.**
