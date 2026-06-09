import { useEffect, useRef, useState } from "react";
import type { PokemonDetails } from "../types/pokemon";
import { getPokemonDetails } from "../api/pokemon";

export function usePokemonDetails() {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(
    null,
  );
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState<Error | null>(null);
  const detailsAbortController = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      detailsAbortController.current?.abort();
    };
  }, []);

  async function fetchPokemonDetails(url: string) {
    detailsAbortController.current?.abort();

    const controller = new AbortController();
    detailsAbortController.current = controller;

    setDetailsLoading(true);
    setDetailsError(null);
    setSelectedPokemon(null);

    try {
      const data = await getPokemonDetails(url, controller.signal);

      if (detailsAbortController.current === controller) {
        setSelectedPokemon(data);
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }

      if (detailsAbortController.current === controller) {
        const e = err instanceof Error ? err : new Error(String(err));
        setDetailsError(e);
      }
    } finally {
      if (detailsAbortController.current === controller) {
        setDetailsLoading(false);
      }
    }
  }
  return {
    selectedPokemon,
    detailsLoading,
    detailsError,
    fetchPokemonDetails,
    setSelectedPokemon,
  };
}
