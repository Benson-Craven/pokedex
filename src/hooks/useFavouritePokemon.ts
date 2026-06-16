import { useEffect, useState } from "react";

const FAVOURITE_POKEMON_STORAGE_KEY = "favourite-pokemon";

export function useFavouritePokemon() {
  const [favouritePokemon, setFavouritePokemon] = useState<number[]>(() => {
    const savedFavourite = localStorage.getItem(FAVOURITE_POKEMON_STORAGE_KEY);

    if (!savedFavourite) {
      return [];
    }

    try {
      return JSON.parse(savedFavourite);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      FAVOURITE_POKEMON_STORAGE_KEY,
      JSON.stringify(favouritePokemon),
    );
  }, [favouritePokemon]);

  function toggleFavouritePokemon(pokemonToFavourite: number) {
    setFavouritePokemon((currentFaves) => {
      const alreadyFaved = currentFaves.some(
        (pokemon) => pokemon === pokemonToFavourite,
      );

      if (alreadyFaved) {
        return currentFaves.filter((pokemon) => pokemon !== pokemonToFavourite);
      }

      if (currentFaves.length >= 3) {
        return currentFaves;
      }

      return [...currentFaves, pokemonToFavourite];
    });
  }

  function isFavouritePokemon(pokemonId: number) {
    return favouritePokemon.some((pokemon) => pokemon === pokemonId);
  }

  return {
    favouritePokemon,
    toggleFavouritePokemon,
    isFavouritePokemon,
  };
}
