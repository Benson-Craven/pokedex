import type {
  PokemonListResponse,
  PokemonDetails,
  PokemonSpecies,
  PokemonEvolutionChain,
} from "../types/pokemon";

export async function getPokemonList(
  url: string,
  signal?: AbortSignal,
): Promise<PokemonListResponse> {
  const res = await fetch(url, { signal });

  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon list");
  }

  const data: PokemonListResponse = await res.json();

  return {
    ...data,
    results: data.results.map((pokemon) => ({
      ...pokemon,
      id: getPokemonIdFromUrl(pokemon.url),
    })),
  };
}

function getPokemonIdFromUrl(url: string) {
  const urlParts = url.split("/").filter(Boolean);
  return Number(urlParts[urlParts.length - 1]);
}

export async function getPokemonDetails(
  url: string,
  signal?: AbortSignal,
): Promise<PokemonDetails> {
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon details");
  }

  const data: PokemonDetails = await res.json();

  return data;
}

export async function getPokemonSpecies(
  id: number,
  signal?: AbortSignal,
): Promise<PokemonSpecies> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`, {
    signal,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon species");
  }

  const data: PokemonSpecies = await res.json();

  return data;
}

export async function getPokemonEvolutionChain(
  url: string,
  signal?: AbortSignal,
): Promise<PokemonEvolutionChain> {
  const res = await fetch(url, { signal });

  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon evolution chain");
  }

  const data: PokemonEvolutionChain = await res.json();

  return data;
}
