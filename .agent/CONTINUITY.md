[PLANS]
- 2026-06-11T00:00Z [USER] User asked for a learning-first hypothesis about what to learn next in React using this Pokemon web app.

[DECISIONS]
- 2026-06-11T00:00Z [ASSUMPTION] Treat the request as coaching/analysis only; no app code edits are needed.
- 2026-06-11T22:23Z [USER] User requested AGENTS.md canary functionality: assistant replies should include their name so instruction drift is visible.
- 2026-06-11T22:23Z [ASSUMPTION] Use `Benson` as the canary name based on workspace username `bensoncraven`.

[PROGRESS]
- 2026-06-11T00:00Z [TOOL] Inspected project structure plus main React files: App, hooks, components, API, types, styling, and package scripts.
- 2026-06-12T22:08Z [CODE] Implemented squad-aware list rendering in `PokemonList.tsx` by adding `isPokemonInSquad` prop typing and using block-bodied `map` to derive `isInSquad` per item.
- 2026-06-13T12:05Z [CODE] Updated `src/utils/pokemonTypeStyles.ts` to map all 18 Pokemon types to badge colour classes with per-type text contrast and fallback styling.

[DISCOVERIES]
- 2026-06-11T00:00Z [CODE] App is a Vite React 19 TypeScript project. `App.tsx` orchestrates custom hooks, derived state, search filtering, squad management, and rendering.
- 2026-06-11T00:00Z [CODE] Hooks demonstrate async fetch state, `AbortController`, `useRef`, `useCallback`, lazy `useState`, and localStorage persistence.
- 2026-06-11T00:00Z [CODE] User added helper functions in `App.tsx`; superseded by 2026-06-11T22:16Z.
- 2026-06-11T22:16Z [CODE] `App.tsx` currently has single `isSquadFull` and working `filterPokemonByName`; earlier duplicate-helper/search typo note is no longer current.

[OUTCOMES]
- 2026-06-11T00:00Z [ASSUMPTION] Final response should map specific React learning topics to this repo's existing files and suggest small exercises.
- 2026-06-11T22:23Z [CODE] Added `Canary phrase` section to `AGENTS.md`; it requires `Benson` in every substantive assistant reply and avoids inserting it into generated artifacts unless requested.
- 2026-06-12T22:08Z [TOOL] `npm run lint` and `npm run build` both passed after `PokemonList.tsx` change.
- 2026-06-13T12:05Z [TOOL] `npm run lint` and `npm run build` both passed after Pokemon type style utility update.
