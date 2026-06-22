# RS School React App

This project has been migrated from a Vite-based React SPA to a Next.js application using the App Router.

## Project setup

- `next` for routing and server rendering
- `react` + `react-dom` for UI
- `@tanstack/react-query` for data fetching
- `zustand` for client state management
- `vitest` and `@testing-library/react` for tests

## Available scripts

- `npm run dev` — start Next.js development server
- `npm run build` — build the Next.js app
- `npm run start` — start the built Next.js app
- `npm run lint` — run ESLint
- `npm run format:fix` — format files with Prettier
- `npm run test` — run Vitest tests
- `npm run coverage` — run Vitest with coverage

## Notes

- Legacy Vite bootstrap files (`vite.config.ts`, `index.html`, `.vite/`, `dist/`) have been removed.
- The application now uses App Router pages under `app/`.
- Environment variables should use Next.js conventions (`NEXT_PUBLIC_*` for client runtime values).
