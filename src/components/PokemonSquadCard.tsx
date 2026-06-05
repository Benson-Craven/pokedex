import type { PokemonDetails } from "../types/pokemon";

type PokemonSquadCardProps = {
  pokemon: PokemonDetails;
  slotNumber: number;
  onRemove: () => void;
};

const PokemonSquadCard = ({
  pokemon,
  slotNumber,
  onRemove,
}: PokemonSquadCardProps) => {
  return (
    <article className="group relative min-h-44 overflow-hidden rounded-xl border-4 border-pokemon-dark-blue bg-white p-3 uppercase text-pokemon-dark-blue shadow-[4px_4px_0_#003a70] transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#003a70]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-pokemon-yellow" />
      <div className="pointer-events-none absolute -right-7 -top-7 h-24 w-24 rounded-full border-4 border-pokemon-dark-blue bg-pokemon-red opacity-90" />

      <button
        type="button"
        className="absolute right-2 top-2 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-pokemon-dark-blue bg-white text-sm font-black text-pokemon-dark-blue shadow-[2px_2px_0_#003a70] transition hover:-translate-y-0.5 hover:bg-pokemon-red hover:text-white hover:shadow-[3px_3px_0_#003a70] focus:outline-none focus:ring-2 focus:ring-pokemon-yellow focus:ring-offset-2"
        onClick={onRemove}
        aria-label={`Remove ${pokemon.name} from squad`}
      >
        x
      </button>

      <div className="relative z-10 flex items-start justify-between pr-8">
        <div>
          <p className="text-[0.65rem] font-black tracking-widest text-pokemon-dark-blue">
            Slot {slotNumber} | No. {pokemon.id}
          </p>
          <h3 className="max-w-32 truncate font-pokemon-solid text-xl tracking-wide text-pokemon-blue">
            {pokemon.name}
          </h3>
        </div>
      </div>

      <div className="relative z-10 mt-2 flex items-end justify-between gap-3">
        {pokemon.sprites.front_default ? (
          <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full border-4 border-pokemon-dark-blue bg-pokemon-bg shadow-inner">
            <img
              className="h-24 w-24 object-contain transition group-hover:scale-110"
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
            />
          </div>
        ) : (
          <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full border-4 border-pokemon-dark-blue bg-pokemon-bg text-xs font-black">
            No sprite
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col items-end gap-2">
          <div className="flex flex-wrap justify-end gap-1.5">
            {pokemon.types.map((pokemonType) => (
              <span
                key={pokemonType.type.name}
                className="rounded-full border-2 border-pokemon-dark-blue bg-pokemon-blue px-2 py-0.5 text-[0.65rem] font-black uppercase text-white shadow-[1px_1px_0_#003a70]"
              >
                {pokemonType.type.name}
              </span>
            ))}
          </div>

          <div className="grid w-full grid-cols-2 gap-1.5 text-center text-[0.65rem] font-black">
            <p className="rounded-md border-2 border-pokemon-dark-blue bg-white px-2 py-1">
              {pokemon.height / 10} m
            </p>
            <p className="rounded-md border-2 border-pokemon-dark-blue bg-white px-2 py-1">
              {pokemon.weight / 10} kg
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export const EmptySquadSlot = ({ slotNumber }: { slotNumber: number }) => {
  return (
    <div className="grid min-h-44 place-items-center rounded-xl border-4 border-dashed border-pokemon-dark-blue/45 bg-white/50 p-4 text-center uppercase text-pokemon-dark-blue/65">
      <div>
        <p className="text-xs font-black tracking-widest">Slot {slotNumber}</p>
        <p className="mt-2 font-pokemon-solid text-2xl tracking-wide text-pokemon-blue/55">
          Empty
        </p>
      </div>
    </div>
  );
};

export const PokemonSquadCardSkeleton = () => {
  return (
    <article
      className="min-h-44 animate-pulse overflow-hidden rounded-xl border-4 border-pokemon-dark-blue bg-white p-3
      shadow-[4px_4px_0_#003a70]"
    >
      <div className="mb-4 h-14 rounded-md bg-slate-200" />

      <div className="flex items-end justify-between gap-3">
        <div className="h-24 w-24 shrink-0 rounded-full border-4 border-pokemon-dark-blue bg-slate-200" />

        <div className="flex flex-1 flex-col items-end gap-2">
          <div className="h-5 w-24 rounded-full bg-slate-200" />
          <div className="h-5 w-16 rounded-full bg-slate-200" />

          <div className="grid w-full grid-cols-2 gap-1.5">
            <div className="h-8 rounded-md bg-slate-200" />
            <div className="h-8 rounded-md bg-slate-200" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default PokemonSquadCard;
