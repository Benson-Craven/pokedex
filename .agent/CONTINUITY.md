[PLANS]
- 2026-06-11T00:00Z [USER] User asked for a learning-first hypothesis about what to learn next in React using this Pokemon web app.

[DECISIONS]
- 2026-06-11T00:00Z [ASSUMPTION] Treat the request as coaching/analysis only; no app code edits are needed.

[PROGRESS]
- 2026-06-11T00:00Z [TOOL] Inspected project structure plus main React files: App, hooks, components, API, types, styling, and package scripts.

[DISCOVERIES]
- 2026-06-11T00:00Z [CODE] App is a Vite React 19 TypeScript project. `App.tsx` orchestrates custom hooks, derived state, search filtering, squad management, and rendering.
- 2026-06-11T00:00Z [CODE] Hooks demonstrate async fetch state, `AbortController`, `useRef`, `useCallback`, lazy `useState`, and localStorage persistence.
- 2026-06-11T00:00Z [CODE] User added helper functions in `App.tsx`; current draft has a duplicate `isSquadFull` identifier and a `filterPokemonByName` typo: `item,name`.

[OUTCOMES]
- 2026-06-11T00:00Z [ASSUMPTION] Final response should map specific React learning topics to this repo's existing files and suggest small exercises.
