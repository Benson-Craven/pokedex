import type { PokemonListResponse, PokemonDetails } from "../types/pokemon";

export async function getPokemonList(
  url: string,
  signal?: AbortSignal,
): Promise<PokemonListResponse> {
  const res = await fetch(url, { signal });

  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon list");
  }

  const data: PokemonListResponse = await res.json();

  return data;
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
