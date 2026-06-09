import { useCallback, useState } from "react";
import type { PokemonListItem } from "../types/pokemon";
import { getPokemonList } from "../api/pokemon";

const INITIAL_POKEMON_LIST_URL = "https://pokeapi.co/api/v2/pokemon?limit=20";

export function usePokemonList() {
  // pokemon list
  const [pokemon, setPokemon] = useState<PokemonListItem[]>([]);
  const [isListLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState<Error | null>(null);
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const isInitialListLoading = isListLoading && pokemon.length === 0;

  const fetchPokemonList = useCallback(async (url: string) => {
    setListLoading(true);
    setListError(null);
    try {
      const data = await getPokemonList(url);
      setPokemon(data.results);
      setNextUrl(data.next);
      setPreviousUrl(data.previous);
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err));
      setListError(e);
    } finally {
      setListLoading(false);
    }
  }, []);

  return {
    pokemon,
    isListLoading,
    listError,
    previousUrl,
    nextUrl,
    fetchPokemonList,
    isInitialListLoading,
    INITIAL_POKEMON_LIST_URL,
  };
}
