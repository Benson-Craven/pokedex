import { useState } from "react";
import type { PokemonDetails } from "../types/pokemon";

export function useSquad() {
  const [squadPokemon, setSquadPokemon] = useState<PokemonDetails[]>([]);

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

  return {
    squadPokemon,
    addToSquad,
    removeFromSquad,
  };
}
