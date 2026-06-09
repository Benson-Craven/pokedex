import { useCallback, useEffect, useRef, useState } from "react";
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
  const listAbortController = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      listAbortController.current?.abort();
    };
  }, []);

  const fetchPokemonList = useCallback(async (url: string) => {
    listAbortController.current?.abort();
    const controller = new AbortController();
    listAbortController.current = controller;

    setListLoading(true);
    setListError(null);
    try {
      const data = await getPokemonList(url, controller.signal);

      if (listAbortController.current === controller) {
        setPokemon(data.results);
        setNextUrl(data.next);
        setPreviousUrl(data.previous);
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }
      if (listAbortController.current === controller) {
        const e = err instanceof Error ? err : new Error(String(err));
        setListError(e);
      }
    } finally {
      if (listAbortController.current === controller) {
        setListLoading(false);
      }
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
