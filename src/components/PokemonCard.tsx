import type { PokemonDetails } from "../types/pokemon";

type PokemonCardProps = {
  pokemon: PokemonDetails;
  onClear: () => void;
};

const PokemonCard = ({ pokemon, onClear }: PokemonCardProps) => {
  return (
    <article className="relative w-full max-w-sm rounded-xl border-4 border-pokemon-dark-blue p-5 uppercase text-pokemon-dark-blue shadow-[6px_6px_0_#003a70]">
      <button
        type="button"
        className="absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-pokemon-dark-blue bg-pokemon-red font-bold text-pokemon-dark-blue shadow-[2px_2px_0_#003a70] transition hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#003a70]"
        onClick={onClear}
        aria-label="Close Pokémon details"
      >
        X
      </button>

      <div className="mb-4 rounded-lg border-4 border-pokemon-dark-blue bg-pokemon-yellow px-4 py-3 shadow-[3px_3px_0_#003a70]">
        <p className="text-xs font-bold tracking-widest">No. {pokemon.id}</p>
        <h2 className="font-pokemon-solid text-3xl tracking-wide text-pokemon-blue">
          {pokemon.name}
        </h2>
      </div>

      {pokemon.sprites.front_default && (
        <div className="mb-4 rounded-lg border-4 border-pokemon-dark-blue bg-pokemon-bg shadow-inner">
          <img
            className="mx-auto h-36 w-36"
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
        </div>
      )}

      <div className="mb-4 grid grid-cols-2 gap-3">
        <p className="rounded-lg border-2 border-pokemon-dark-blue bg-white px-3 py-2 text-sm font-bold">
          Height: {pokemon.height / 10} m
        </p>
        <p className="rounded-lg border-2 border-pokemon-dark-blue bg-white px-3 py-2 text-sm font-bold">
          Weight: {pokemon.weight / 10} kg
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {pokemon.types.map((pokemon) => (
          <span
            key={pokemon.type.name}
            className="rounded-full border-2 border-pokemon-dark-blue bg-pokemon-blue px-3 py-1 text-sm font-bold uppercase text-white shadow-[2px_2px_0_#003a70]"
          >
            {pokemon.type.name}
          </span>
        ))}
      </div>
    </article>
  );
};

export default PokemonCard;
