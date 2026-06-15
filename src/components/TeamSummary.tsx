import type { PokemonDetails } from "../types/pokemon";

type TeamSummaryProps = {
  squadSize: number;
  uniquePokemonTypes: string[];
  averagePokemonWeightKg: number;
  heaviestPokemon: PokemonDetails | null;
  fastestPokemon: PokemonDetails | null;
  strongestAttackPokemon: PokemonDetails | null;
  strongestDefensePokemon: PokemonDetails | null;
  getStatValue: (pokemon: PokemonDetails, statName: string) => number;
};

const TeamSummary = ({
  squadSize,
  uniquePokemonTypes,
  averagePokemonWeightKg,
  heaviestPokemon,
  fastestPokemon,
  strongestAttackPokemon,
  strongestDefensePokemon,
  getStatValue,
}: TeamSummaryProps) => {
  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_1.3fr]">
      <div className="rounded-lg border-2 border-pokemon-dark-blue bg-white/80 p-4">
        <p className="mb-3 text-xs font-black tracking-widest text-pokemon-blue">
          Team overview
        </p>

        <div className="flex flex-wrap gap-2">
          {uniquePokemonTypes.length > 0 && (
            <p className="rounded-full border-2 border-pokemon-dark-blue bg-white px-3 py-1.5 text-xs font-black shadow-[2px_2px_0_#003a70]">
              Types: {uniquePokemonTypes.join(", ")}
            </p>
          )}

          {squadSize !== 0 && (
            <p className="rounded-full border-2 border-pokemon-dark-blue bg-white px-3 py-1.5 text-xs font-black shadow-[2px_2px_0_#003a70]">
              Avg weight: {averagePokemonWeightKg.toFixed(2)} kg
            </p>
          )}

          {heaviestPokemon && (
            <p className="rounded-full border-2 border-pokemon-dark-blue bg-white px-3 py-1.5 text-xs font-black shadow-[2px_2px_0_#003a70]">
              Heaviest: {heaviestPokemon.name} ({heaviestPokemon.weight / 10}{" "}
              kg)
            </p>
          )}

          {squadSize === 0 && (
            <p className="text-sm font-black text-pokemon-dark-blue/70">
              Add Pokemon to see team insights.
            </p>
          )}
        </div>
      </div>

      <div className="rounded-lg border-2 border-pokemon-dark-blue bg-white/80 p-4">
        <p className="mb-3 text-xs font-black tracking-widest text-pokemon-blue">
          Stat leaders
        </p>

        <div className="grid gap-2 sm:grid-cols-3">
          {fastestPokemon && (
            <p className="rounded-lg border-2 border-pokemon-dark-blue bg-pokemon-yellow px-3 py-2 text-xs font-black shadow-[2px_2px_0_#003a70]">
              Fastest
              <span className="mt-1 block text-sm text-pokemon-blue">
                {fastestPokemon.name} ({getStatValue(fastestPokemon, "speed")})
              </span>
            </p>
          )}

          {strongestAttackPokemon && (
            <p className="rounded-lg border-2 border-pokemon-dark-blue bg-white px-3 py-2 text-xs font-black shadow-[2px_2px_0_#003a70]">
              Attack
              <span className="mt-1 block text-sm text-pokemon-blue">
                {strongestAttackPokemon.name} (
                {getStatValue(strongestAttackPokemon, "attack")})
              </span>
            </p>
          )}

          {strongestDefensePokemon && (
            <p className="rounded-lg border-2 border-pokemon-dark-blue bg-pokemon-yellow px-3 py-2 text-xs font-black shadow-[2px_2px_0_#003a70]">
              Defense
              <span className="mt-1 block text-sm text-pokemon-blue">
                {strongestDefensePokemon.name} (
                {getStatValue(strongestDefensePokemon, "defense")})
              </span>
            </p>
          )}

          {squadSize === 0 && (
            <p className="text-sm font-black text-pokemon-dark-blue/70 sm:col-span-3">
              Stat leaders appear once your team has Pokemon.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamSummary;
