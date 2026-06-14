export type PokemonListItem = {
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
