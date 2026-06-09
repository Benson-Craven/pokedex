import { useCallback, useState } from "react";
import type { PokemonListItem } from "../types/pokemon";
import { getPokemonList } from "../api/pokemon";

export function usePokedex() {
  // pokédex
  const [pokedex, setPokedex] = useState<PokemonListItem[]>([]);
  const [isPokedexLoading, setPokedexLoading] = useState(true);
  const [pokedexError, setPokedexError] = useState<Error | null>(null);

  const INITIAL_POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon?limit=1000";

  const fetchPokedex = useCallback(async (url: string) => {
    setPokedexLoading(true);
    setPokedexError(null);

    try {
      const data = await getPokemonList(url);

      setPokedex(data.results);
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err));
      setPokedexError(e);
    } finally {
      setPokedexLoading(false);
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
