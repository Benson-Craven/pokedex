import type { PokemonDetails } from "../types/pokemon";

type PokemonComparisonProps = {
  pokemonA: PokemonDetails;
  pokemonB: PokemonDetails;
  pokemonATotalBaseStats: number;
  pokemonBTotalBaseStats: number;
  heavierPokemon: PokemonDetails | null;
  higherBaseStatPokemon: PokemonDetails | null;
  sharedComparisonTypes: string[];
};

const PokemonComparison = ({
  pokemonA,
  pokemonB,
  pokemonATotalBaseStats,
  pokemonBTotalBaseStats,
  heavierPokemon,
  higherBaseStatPokemon,
  sharedComparisonTypes,
}: PokemonComparisonProps) => {
  return (
    <section className="w-full max-w-2xl rounded-xl border-4 border-pokemon-dark-blue bg-white p-4 uppercase text-pokemon-dark-blue shadow-[6px_6px_0_#003a70]">
      <h2 className="mb-3 font-pokemon-solid text-2xl tracking-wide text-pokemon-blue">
        Compare
      </h2>

      <div className="grid grid-cols-2 gap-3 text-sm font-bold">
        <div className="mb-4 rounded-lg border-4 border-pokemon-dark-blue bg-pokemon-bg shadow-inner">
          {pokemonA.sprites.front_default && (
            <img
              className="mx-auto h-36 w-36"
              src={pokemonA.sprites.front_default}
              alt={pokemonA.name}
            />
          )}
        </div>
        <div className="mb-4 rounded-lg border-4 border-pokemon-dark-blue bg-pokemon-bg shadow-inner">
          {pokemonB.sprites.front_default && (
            <img
              className="mx-auto h-36 w-36"
              src={pokemonB.sprites.front_default}
              alt={pokemonB.name}
            />
          )}
        </div>
        <p>{pokemonA.name}</p>
        <p>{pokemonB.name}</p>

        <p>Height: {pokemonA.height / 10} m</p>
        <p>Height: {pokemonB.height / 10} m</p>

        <p>Weight: {pokemonA.weight / 10} kg</p>
        <p>Weight: {pokemonB.weight / 10} kg</p>

        <p>Total Base Stats: {pokemonATotalBaseStats}</p>
        <p>Total Base Stats: {pokemonBTotalBaseStats}</p>

        <p className="col-span-2 rounded-lg border-2 border-pokemon-dark-blue bg-pokemon-yellow px-3 py-2">
          Heavier Pokémon: {heavierPokemon?.name ?? "Tie"}
        </p>
        <p className="col-span-2 rounded-lg border-2 border-pokemon-dark-blue bg-white px-3 py-2">
          Shared types:{" "}
          {sharedComparisonTypes.length > 0
            ? sharedComparisonTypes.join(", ")
            : "None"}
        </p>
        <p className="col-span-2 rounded-lg border-2 border-pokemon-dark-blue bg-pokemon-yellow px-3 py-2">
          Higher Base Stats: {higherBaseStatPokemon?.name ?? "Tie"}
        </p>
      </div>
    </section>
  );
};

export default PokemonComparison;
