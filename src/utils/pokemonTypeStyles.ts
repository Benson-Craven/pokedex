const baseTypeClassName =
  "rounded-full border-2 border-pokemon-dark-blue px-3 py-1 text-sm font-bold uppercase shadow-[2px_2px_0_#003a70]";

const typeClassByName: Record<string, string> = {
  normal: "bg-stone-400 text-pokemon-dark-blue",
  fire: "bg-red-500 text-white",
  water: "bg-blue-500 text-white",
  electric: "bg-yellow-400 text-pokemon-dark-blue",
  grass: "bg-green-500 text-white",
  ice: "bg-cyan-200 text-pokemon-dark-blue",
  fighting: "bg-red-700 text-white",
  poison: "bg-purple-500 text-white",
  ground: "bg-amber-700 text-white",
  flying: "bg-sky-300 text-pokemon-dark-blue",
  psychic: "bg-pink-600 text-white",
  bug: "bg-lime-600 text-white",
  rock: "bg-stone-600 text-white",
  ghost: "bg-violet-700 text-white",
  dragon: "bg-indigo-700 text-white",
  dark: "bg-zinc-800 text-white",
  steel: "bg-slate-400 text-pokemon-dark-blue",
  fairy: "bg-pink-200 text-pokemon-dark-blue",
};

export function getPokemonTypeClassName(typeName: string) {
  const typeColourClass =
    typeClassByName[typeName.toLowerCase()] ?? "bg-pokemon-blue text-white";

  return `${baseTypeClassName} ${typeColourClass}`;
}
