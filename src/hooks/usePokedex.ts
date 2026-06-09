import { useCallback, useEffect, useRef, useState } from "react";
import type { PokemonListItem } from "../types/pokemon";
import { getPokemonList } from "../api/pokemon";

const INITIAL_POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon?limit=1000";

export function usePokedex() {
  // pokédex
  const [pokedex, setPokedex] = useState<PokemonListItem[]>([]);
  const [isPokedexLoading, setPokedexLoading] = useState(true);
  const [pokedexError, setPokedexError] = useState<Error | null>(null);
  const pokedexAbortController = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      pokedexAbortController.current?.abort();
    };
  }, []);

  const fetchPokedex = useCallback(async (url: string) => {
    pokedexAbortController.current?.abort();
    const controller = new AbortController();
    pokedexAbortController.current = controller;

    setPokedexLoading(true);
    setPokedexError(null);

    try {
      const data = await getPokemonList(url, controller.signal);

      if (pokedexAbortController.current === controller) {
        setPokedex(data.results);
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }
      if (pokedexAbortController.current === controller) {
        const e = err instanceof Error ? err : new Error(String(err));
        setPokedexError(e);
      }
    } finally {
      if (pokedexAbortController.current === controller) {
        setPokedexLoading(false);
      }
    }
  }, []);

  return {
    pokedex,
    isPokedexLoading,
    pokedexError,
    fetchPokedex,
    INITIAL_POKEDEX_URL,
  };
}
