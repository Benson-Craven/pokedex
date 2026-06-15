[PLANS]
- 2026-06-11T00:00Z [USER] User asked for a learning-first hypothesis about what to learn next in React using this Pokemon web app.
- 2026-06-14T14:12Z [USER] User asked for a coaching-first suggestion for a new feature; no server startup.
- 2026-06-14T14:39Z [USER] User wants to work coaching-first on making `src/App.tsx` more concise; no server startup.
- 2026-06-14T14:52Z [USER] User wants coaching-first work on improving the selected Pokemon card with more information; no server startup.
- 2026-06-14T17:12Z [USER] User chose compare-two-Pokemon as the next coaching-first feature; no server startup.

[DECISIONS]
- 2026-06-11T00:00Z [ASSUMPTION] Treat the request as coaching/analysis only; no app code edits are needed.
- 2026-06-11T22:23Z [USER] User requested AGENTS.md canary functionality: assistant replies should include their name so instruction drift is visible.
- 2026-06-11T22:23Z [ASSUMPTION] Use `Benson` as the canary name based on workspace username `bensoncraven`.
- 2026-06-13T12:45Z [USER] User requested `AGENTS.md` implement prior recommendations for using this Pokemon app as a React learning surface.
- 2026-06-13T13:01Z [USER] User requested future learning-oriented feature work avoid assistant-written implementation and avoid starting dev/preview/web servers or browser verification unless explicitly asked.

[PROGRESS]
- 2026-06-11T00:00Z [TOOL] Inspected project structure plus main React files: App, hooks, components, API, types, styling, and package scripts.
- 2026-06-12T22:08Z [CODE] Implemented squad-aware list rendering in `PokemonList.tsx` by adding `isPokemonInSquad` prop typing and using block-bodied `map` to derive `isInSquad` per item.
- 2026-06-13T12:05Z [CODE] Updated `src/utils/pokemonTypeStyles.ts` to map all 18 Pokemon types to badge colour classes with per-type text contrast and fallback styling.
- 2026-06-13T13:00Z [USER] User requested reverting the assistant-written clear squad implementation so they can write it themselves.
- 2026-06-13T13:10Z [USER] User implemented clear squad feature with coaching: `useSquad` now returns `clearSquad`, and `App.tsx` renders a disabled-when-empty Clear team button.
- 2026-06-13T13:41Z [USER] User implemented derived average team weight display in `App.tsx` using `getAveragePokemonWeight(squadPokemon)` and `averagePokemonWeightKg`.
- 2026-06-13T13:56Z [USER] User implemented derived unique team types display in `App.tsx` using `getUniquePokemonTypes(squadPokemon)` with a `Set<string>`.
- 2026-06-13T14:29Z [USER] User implemented squad sort control in `App.tsx` with typed `SquadSortMode`, `sortSquadPokemon`, controlled `<select>`, and rendering from `sortedSquadPokemon`.
- 2026-06-14T14:06Z [USER] User implemented squad type filter in `App.tsx` with `selectedSquadType`, `filterSquadPokemonByType`, a controlled type `<select>`, and rendering from `filteredSquadPokemon`.
- 2026-06-14T14:33Z [USER] User implemented heaviest Pokemon summary in `App.tsx` using `getHeaviestPokemon(squadPokemon)`, explicit `PokemonDetails | null` return type, and guarded JSX rendering.
- 2026-06-14T14:46Z [CODE] Cleaned `src/App.tsx` without extracting components: added `MAX_SQUAD_SIZE`, removed stale/typo comments, simplified average and heaviest helper bodies, and normalized broken multiline class strings.
- 2026-06-14T16:52Z [USER] User expanded selected Pokemon details by adding `abilities` and `stats` to `PokemonDetails`, then rendering both sections in `PokemonCard`.
- 2026-06-14T17:02Z [USER] User added `formatStatName` in `PokemonCard` so fetched stat names like `special-defense` render as title-cased labels.
- 2026-06-14T17:18Z [USER] User started compare-two-Pokemon feature by adding `comparisonPokemonA` and `comparisonPokemonB` state in `src/App.tsx`.
- 2026-06-14T17:22Z [USER] User wired compare callbacks from `App.tsx` into `PokemonCard` props; buttons not added yet.
- 2026-06-14T17:27Z [USER] User added Compare A and Compare B buttons to `PokemonCard`.
- 2026-06-14T17:27Z [TOOL] `npm run lint` fails because `comparisonPokemonA` and `comparisonPokemonB` are assigned but not yet read; expected until comparison panel is rendered.
- 2026-06-14T17:31Z [USER] User rendered a conditional compare panel in `App.tsx` showing both selected Pokemon names, heights, and weights.
- 2026-06-14T17:31Z [TOOL] `npm run lint` passes after comparison panel reads both comparison state values.
- 2026-06-14T17:36Z [USER] User added derived `getHeavierPokemon` helper, `heavierComparisonPokemon`, and rendered the heavier/tie result in the compare panel.
- 2026-06-14T17:36Z [TOOL] `npm run lint` passes after heavier comparison result.
- 2026-06-14T17:41Z [USER] User added derived `getSharedPokemonTypes`, `sharedComparisonTypes`, and rendered shared types/None in the compare panel.
- 2026-06-14T17:41Z [TOOL] `npm run lint` passes after shared types comparison result.
- 2026-06-14T17:46Z [USER] User added `getTotalBaseStats` reduce helper and rendered total base stats for both comparison Pokemon in the compare panel.
- 2026-06-14T17:46Z [TOOL] `npm run lint` passes after total base stats rendering.
- 2026-06-14T17:51Z [USER] User added `getHigherBaseStatsPokemon`, derived `higherBaseStatPokemon`, and rendered higher total base stats/tie in the compare panel.
- 2026-06-14T17:51Z [TOOL] `npm run lint` passes after higher base stats comparison; core compare-two-Pokemon feature is functionally complete by static inspection.

[DISCOVERIES]
- 2026-06-11T00:00Z [CODE] App is a Vite React 19 TypeScript project. `App.tsx` orchestrates custom hooks, derived state, search filtering, squad management, and rendering.
- 2026-06-11T00:00Z [CODE] Hooks demonstrate async fetch state, `AbortController`, `useRef`, `useCallback`, lazy `useState`, and localStorage persistence.
- 2026-06-11T00:00Z [CODE] User added helper functions in `App.tsx`; superseded by 2026-06-11T22:16Z.
- 2026-06-11T22:16Z [CODE] `App.tsx` currently has single `isSquadFull` and working `filterPokemonByName`; earlier duplicate-helper/search typo note is no longer current.
- 2026-06-14T14:39Z [CODE] `src/App.tsx` is 374 lines; wordiness is concentrated in squad derived helpers at lines 30-109, derived values at lines 190-203, and squad panel JSX at lines 232-320.
- 2026-06-14T14:52Z [CODE] Selected-card data flow: `PokemonList` calls `fetchPokemonDetails`; `usePokemonDetails` stores `selectedPokemon`; `App.tsx` passes it to `PokemonCard`; `PokemonCard` currently renders id, name, sprite, height, weight, types, and add status.

[OUTCOMES]
- 2026-06-11T00:00Z [ASSUMPTION] Final response should map specific React learning topics to this repo's existing files and suggest small exercises.
- 2026-06-11T22:23Z [CODE] Added `Canary phrase` section to `AGENTS.md`; it requires `Benson` in every substantive assistant reply and avoids inserting it into generated artifacts unless requested.
- 2026-06-12T22:08Z [TOOL] `npm run lint` and `npm run build` both passed after `PokemonList.tsx` change.
- 2026-06-13T12:05Z [TOOL] `npm run lint` and `npm run build` both passed after Pokemon type style utility update.
- 2026-06-13T12:45Z [CODE] Added `This Pokémon app as a React learning lab` subsection to `AGENTS.md`, requiring future React tasks to map changes to repo-specific concepts, data flow, stored-vs-derived state, a small exercise, and a patch plan before editing.
- 2026-06-13T13:00Z [CODE] Reverted clear squad edits from `src/hooks/useSquad.ts` and `src/App.tsx`; no remaining code diff for that feature.
- 2026-06-13T13:01Z [CODE] Updated `AGENTS.md` so Codex defaults to letting the user write code for learning-oriented feature work and must not start dev/preview/web servers or browser verification unless explicitly asked in that turn.
- 2026-06-13T13:10Z [TOOL] `npm run lint` and `npm run build` passed after user-implemented clear squad feature; no dev server or browser verification was run.
- 2026-06-13T13:41Z [TOOL] `npm run lint` and `npm run build` passed after average team weight display; no dev server or browser verification was run.
- 2026-06-13T13:56Z [TOOL] `npm run lint` and `npm run build` passed after unique team types display; no dev server or browser verification was run.
- 2026-06-13T14:29Z [TOOL] `npm run lint` and `npm run build` passed after squad sort control; no dev server or browser verification was run.
- 2026-06-14T14:06Z [TOOL] `npm run lint` and `npm run build` passed after squad type filter; no dev server or browser verification was run.
- 2026-06-14T14:33Z [TOOL] `npm run lint` and `npm run build` passed after heaviest Pokemon summary; no dev server or browser verification was run.
- 2026-06-14T14:46Z [TOOL] `npm run lint` passed after `App.tsx` cleanup. `npm run build` failed during Vite startup because local `node_modules` is missing Rolldown optional native package `@rolldown/binding-darwin-x64`; TypeScript completed before the Vite/Rolldown failure.
- 2026-06-14T16:52Z [TOOL] `npm run lint` passed after user-added selected card abilities and stats sections; no server startup or browser verification was run.
- 2026-06-14T17:02Z [TOOL] `npm run lint` passed after user-added stat-name formatting helper; no server startup or browser verification was run.
