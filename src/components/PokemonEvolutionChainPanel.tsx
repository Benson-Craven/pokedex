import type { EvolutionPokemon } from "../types/pokemon";

type PokemonEvolutionChainProps = {
  evolutionPokemon: EvolutionPokemon[];
  isLoading: boolean;
  error: Error | null;
};

const PokemonEvolutionChainPanel = ({
  evolutionPokemon,
  isLoading,
  error,
}: PokemonEvolutionChainProps) => {
  if (isLoading) {
    return <p>Loading evolution chain...</p>;
  }

  if (error) {
    return <p>Error! {error.message}</p>;
  }

  if (evolutionPokemon.length === 0) {
    return <p>No evolution for this Pokémon</p>;
  }

  return (
    <section className="w-full max-w-2xl rounded-xl border-4 border-pokemon-dark-blue bg-white p-4 uppercase text-pokemon-dark-blue shadow-[6px_6px_0_#003a70]">
      <h2 className="mb-3 font-pokemon-solid text-2xl tracking-wide text-pokemon-blue">
        Evolution
      </h2>

      <div className="flex flex-wrap gap-3">
        {evolutionPokemon.map((pokemon) => (
          <div
            key={pokemon.name}
            className="grid min-w-28 place-items-center rounded-lg border-2 border-pokemon-dark-blue bg-pokemon-bg px-3 py-2 text-center text-sm font-black shadow-[2px_2px_0_#003a70]"
          >
            {pokemon.spriteUrl ? (
              <img
                className="h-20 w-20 object-contain"
                src={pokemon.spriteUrl}
                alt={pokemon.name}
              />
            ) : (
              <div className="grid h-20 w-20 place-items-center text-xs">
                No sprite
              </div>
            )}
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PokemonEvolutionChainPanel;
