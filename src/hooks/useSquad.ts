import { useEffect, useState } from "react";
import type { PokemonDetails } from "../types/pokemon";

const SQUAD_STORAGE_KEY = "pokemon-squad";

export function useSquad() {
  const [squadPokemon, setSquadPokemon] = useState<PokemonDetails[]>(() => {
    const savedSquad = localStorage.getItem(SQUAD_STORAGE_KEY);

    if (!savedSquad) {
      return [];
    }

    try {
      return JSON.parse(savedSquad);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(SQUAD_STORAGE_KEY, JSON.stringify(squadPokemon));
  }, [squadPokemon]);

  function addToSquad(pokemonToAdd: PokemonDetails) {
    setSquadPokemon((currentSquad) => {
      const alreadyAdded = currentSquad.some(
        (pokemon) => pokemon.id === pokemonToAdd.id,
      );

      if (alreadyAdded || currentSquad.length >= 6) {
        return currentSquad;
      }

      return [...currentSquad, pokemonToAdd];
    });
  }

  function removeFromSquad(pokemonId: number) {
    setSquadPokemon((currentSquad) =>
      currentSquad.filter((pokemon) => pokemon.id !== pokemonId),
    );
  }

  function clearSquad() {
    setSquadPokemon([]);
  }

  function setSquad(nextSquad: PokemonDetails[]) {
    setSquadPokemon(nextSquad.slice(0, 6));
  }

  return {
    squadPokemon,
    addToSquad,
    removeFromSquad,
    clearSquad,
    setSquad,
  };
}
