import type { PokemonListItem } from "../types/pokemon";

type PokemonListProps = {
  pokemon: PokemonListItem[];
  isSearching: boolean;
  isPokedexLoading: boolean;
  pokedexError: Error | null;
  onSelectPokemon: (url: string) => void;
  isPokemonInSquad: (url: string) => boolean;
  isPokemonFavourite: (pokemonId: number) => boolean;
};

const PokemonList = ({
  pokemon,
  isSearching,
  isPokedexLoading,
  pokedexError,
  onSelectPokemon,
  isPokemonInSquad,
  isPokemonFavourite,
}: PokemonListProps) => {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {isSearching && pokedexError ? (
          <p>Error loading Pokédex</p>
        ) : isSearching && isPokedexLoading ? (
          <p>Loading Pokédex...</p>
        ) : pokemon.length === 0 ? (
          <p>Try another Pokémon...</p>
        ) : (
          pokemon.map((pokemonItem) => {
            const isInSquad = isPokemonInSquad(pokemonItem.url);
            const isFavourite = isPokemonFavourite(pokemonItem.id);

            const buttonClassName = isInSquad
              ? "cursor-pointer rounded-xl border-4 border-pokemon-dark-blue bg-slate-200 px-8 py-4 font-bold uppercase text-pokemon-dark-blue opacity-75 shadow-[2px_2px_0_#003a70] transition"
              : "cursor-pointer rounded-xl border-4 border-pokemon-dark-blue bg-pokemon-yellow px-8 py-4 font-bold uppercase text-pokemon-dark-blue shadow-[4px_4px_0_#003a70] transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#003a70]";

            return (
              <button
                className={buttonClassName}
                key={pokemonItem.name}
                onClick={() => onSelectPokemon(pokemonItem.url)}
              >
                {pokemonItem.name}
                {isInSquad ? " - In team" : ""} {isFavourite ? "❤️" : "🤍"}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PokemonList;
