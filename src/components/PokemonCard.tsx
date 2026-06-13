import type { PokemonDetails } from "../types/pokemon";

import PokemonTypeBadge from "./PokemonTypeBadge";

type SquadStatus = "available" | "added" | "full";

type PokemonCardProps = {
  pokemon: PokemonDetails;
  onClear: () => void;
  onAdd: () => void;
  squadStatus: SquadStatus;
};

const addButtonLabelByStatus = {
  available: "Add",
  added: "Added",
  full: "Team full",
};

const addButtonClassByStatus = {
  available:
    "bg-lime-500 text-white hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#003a70] cursor-pointer",
  added: "bg-slate-300 text-pokemon-dark-blue cursor-not-allowed opacity-80",
  full: "bg-pokemon-red text-white cursor-not-allowed opacity-80",
};

const PokemonCard = ({
  pokemon,
  onClear,
  onAdd,
  squadStatus,
}: PokemonCardProps) => {
  const canAdd = squadStatus === "available";
  const addButtonLabel = addButtonLabelByStatus[squadStatus];
  const addButtonClass = addButtonClassByStatus[squadStatus];

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
        {pokemon.types.map((pokemonType) => (
          <PokemonTypeBadge
            key={pokemonType.type.name}
            typeName={pokemonType.type.name}
          />
        ))}
        <button
          className={`rounded-full border-2 border-pokemon-dark-blue px-3 py-1 text-sm font-bold uppercase shadow-[2px_2px_0_#003a70] transition ${addButtonClass}`}
          disabled={!canAdd}
          onClick={onAdd}
        >
          {addButtonLabel}
        </button>
      </div>
    </article>
  );
};

export const PokemonCardSkeleton = () => {
  return (
    <article className="relative w-full max-w-sm animate-pulse rounded-xl border-4 border-pokemon-dark-blue p-5 uppercase text-pokemon-dark-blue shadow-[6px_6px_0_#003a70]">
      <div className="absolute right-3 top-3 h-8 w-8 rounded-full border-2 border-pokemon-dark-blue bg-slate-200" />

      <div className="mb-4 rounded-lg border-4 border-pokemon-dark-blue bg-pokemon-yellow px-4 py-3 shadow-[3px_3px_0_#003a70]">
        <div className="mb-3 h-3 w-16 rounded bg-slate-200" />
        <div className="h-8 w-40 rounded bg-slate-200" />
      </div>

      <div className="mb-4 rounded-lg border-4 border-pokemon-dark-blue bg-pokemon-bg shadow-inner">
        <div className="mx-auto h-36 w-36 rounded-full bg-slate-200" />
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="h-10 rounded-lg border-2 border-pokemon-dark-blue bg-slate-200" />
        <div className="h-10 rounded-lg border-2 border-pokemon-dark-blue bg-slate-200" />
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="h-8 w-20 rounded-full border-2 border-pokemon-dark-blue bg-slate-200" />
        <div className="h-8 w-24 rounded-full border-2 border-pokemon-dark-blue bg-slate-200" />
        <div className="h-8 w-16 rounded-full border-2 border-pokemon-dark-blue bg-slate-200" />
      </div>
    </article>
  );
};

export default PokemonCard;
