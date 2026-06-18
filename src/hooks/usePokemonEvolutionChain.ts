import {
  getPokemonDetails,
  getPokemonEvolutionChain,
  getPokemonSpecies,
} from "../api/pokemon";
import { useEffect, useRef, useState } from "react";
import type { EvolutionPokemon, PokemonEvolutionChain } from "../types/pokemon";

function getEvolutionNames(chain: PokemonEvolutionChain) {
  const names: string[] = [];
  let current = chain.chain;

  while (current) {
    names.push(current.species.name);
    current = current.evolves_to[0];
  }

  return names;
}

export function usePokemonEvolutionChain(pokemonId: number | null) {
  const [evolutionPokemon, setEvolutionPokemon] = useState<EvolutionPokemon[]>(
    [],
  );
  const [isEvolutionChainLoading, setEvolutionChainLoading] = useState(false);
  const [evolutionChainError, setEvolutionChainError] = useState<Error | null>(
    null,
  );
  const evolutionAbortController = useRef<AbortController | null>(null);

  useEffect(() => {
    if (pokemonId === null) {
      evolutionAbortController.current?.abort();
      return;
    }

    const selectedPokemonId = pokemonId;

    evolutionAbortController.current?.abort();
    const controller = new AbortController();
    evolutionAbortController.current = controller;

    async function fetchEvolutionChain() {
      setEvolutionChainLoading(true);
      setEvolutionChainError(null);
      setEvolutionPokemon([]);

      try {
        const species = await getPokemonSpecies(
          selectedPokemonId,
          controller.signal,
        );
        const chain = await getPokemonEvolutionChain(
          species.evolution_chain.url,
          controller.signal,
        );
        const evolutionNames = getEvolutionNames(chain);
        const pokemonDetails = await Promise.all(
          evolutionNames.map((name) =>
            getPokemonDetails(
              `https://pokeapi.co/api/v2/pokemon/${name}`,
              controller.signal,
            ),
          ),
        );
        const nextEvolutionPokemon = pokemonDetails.map((pokemon) => ({
          name: pokemon.name,
          spriteUrl: pokemon.sprites.front_default,
        }));

        if (evolutionAbortController?.current === controller) {
          setEvolutionPokemon(nextEvolutionPokemon);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;

        if (evolutionAbortController.current === controller) {
          setEvolutionChainError(
            err instanceof Error ? err : new Error(String(err)),
          );
        }
      } finally {
        if (evolutionAbortController.current === controller) {
          setEvolutionChainLoading(false);
        }
      }
    }

    fetchEvolutionChain();

    return () => {
      if (evolutionAbortController.current === controller) {
        controller.abort();
      }
    };
  }, [pokemonId]);

  return {
    evolutionPokemon,
    isEvolutionChainLoading,
    evolutionChainError,
  };
}
