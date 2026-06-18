export type PokemonListItem = {
  id: number;
  name: string;
  url: string;
};

export type PokemonDetails = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
  };
  types: {
    type: {
      name: string;
    };
  }[];

  abilities: {
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
};

export type PokemonSpecies = {
  id: number;
  name: string;
  evolution_chain: {
    url: string;
  };
};

export type EvolutionChainLink = {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionChainLink[];
};

export type PokemonEvolutionChain = {
  id: number;
  chain: EvolutionChainLink;
};

export type EvolutionPokemon = {
  name: string;
  spriteUrl: string | null;
};

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
};

export type SquadPokemonDetails = {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
  };
};
