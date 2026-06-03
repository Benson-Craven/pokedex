# Pokédex Web App

A React and TypeScript Pokédex built with Vite, Tailwind CSS, and data from the [PokéAPI](https://pokeapi.co/). The app lets users browse Pokémon, search the wider Pokédex, and open a detail card with sprite, type, height, and weight information.

## Features

- Browse Pokémon in paginated groups.
- Search Pokémon by name.
- View selected Pokémon details.
- Clear the active search or selected Pokémon card.
- Pokémon-inspired styling with custom fonts and theme colors.
- Loading and error states for list and detail requests.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- ESLint
- PokéAPI

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## Project Structure

```text
src/
  api/              API-related code
  assets/           Images, icons, and custom fonts
  components/       Reusable React components
  types/            TypeScript types for Pokémon data
  App.tsx           Main app state and UI flow
  main.tsx          React entry point
```

## Data Source

Pokémon list and detail data are loaded from:

```text
https://pokeapi.co/api/v2/pokemon
```

The app currently fetches the visible paginated list separately from a larger Pokédex list used for search.

## Notes

This project is private by default in `package.json`. If you publish it, check that generated files like `dist/`, dependency folders like `node_modules/`, and local environment files are ignored by git.
