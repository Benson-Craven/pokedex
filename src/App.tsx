import { useEffect, useState } from "react";

import PokemonCard, { PokemonCardSkeleton } from "./components/PokemonCard";
import PokemonSearchBar from "./components/PokemonSearchBar";
import PokemonSquadCard, {
  EmptySquadSlot,
} from "./components/PokemonSquadCard";

import PokemonList from "./components/PokemonList";
import { useSquad } from "./hooks/useSquad";
import { usePokemonList } from "./hooks/usePokemonList";
import { usePokedex } from "./hooks/usePokedex";
import { usePokemonDetails } from "./hooks/usePokemonDetails";

function App() {
  // pokemon list
  const {
    pokemon,
    isListLoading,
    listError,
    previousUrl,
    nextUrl,
    fetchPokemonList,
    isInitialListLoading,
    INITIAL_POKEMON_LIST_URL,
  } = usePokemonList();

  // squad pokemon
  const { squadPokemon, addToSquad, removeFromSquad } = useSquad();

  // pokdex
  const {
    pokedex,
    isPokedexLoading,
    pokedexError,
    fetchPokedex,
    INITIAL_POKEDEX_URL,
  } = usePokedex();

  // individual pokémon

  const {
    selectedPokemon,
    detailsLoading,
    detailsError,
    fetchPokemonDetails,
    setSelectedPokemon,
  } = usePokemonDetails();

  const isSelectedPokemonInSquad = selectedPokemon
    ? squadPokemon.some((pokemon) => pokemon.id === selectedPokemon.id)
    : false;

  const isSquadFull = squadPokemon.length >= 6;

  const [searchPokemon, setSearchPokemon] = useState<string>("");

  // initialise the abort controller to ensure repeat requests are handled correctly

  // fetch the internal pokedex and the actual pokemon list
  useEffect(() => {
    fetchPokemonList(INITIAL_POKEMON_LIST_URL);
    fetchPokedex(INITIAL_POKEDEX_URL);
  }, [
    fetchPokemonList,
    fetchPokedex,
    INITIAL_POKEDEX_URL,
    INITIAL_POKEMON_LIST_URL,
  ]);

  if (isInitialListLoading) {
    return <p>Loading...</p>;
  }

  if (listError) {
    return <p>Error! {listError.message}</p>;
  }

  const isSearching = searchPokemon.trim() !== "";

  const filteredPokemon = isSearching
    ? pokedex.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase()),
      )
    : pokemon;
  const emptySquadSlots = Array.from({ length: 6 - squadPokemon.length });

  return (
    <main className="min-h-screen bg-pokemon-bg text-pokemon-black ">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-12 px-6 py-12 ">
        <div className="max-w-2xl text-center md:text-left">
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-pokemon-blue">
            Gotta catch 'em all!
          </p>

          <h1
            className="mb-6 font-pokemon-solid text-5xl leading-tight tracking-widest text-pokemon-yellow md:text-7xl pokemon-title-shadow drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
"
          >
            Pokédex
          </h1>

          <p className="mb-8 max-w-xl text-lg leading-8 text-slate-700">
            Discover and explore the world of Pokémon. Search your favourites,
            view detailed stats, and build a clean Pokédex experience from
            scratch.
          </p>
        </div>
        <PokemonSearchBar
          value={searchPokemon}
          onChange={setSearchPokemon}
          onClear={() => setSearchPokemon("")}
        />

        <section className="w-full rounded-xl border-4 border-pokemon-dark-blue bg-sky-200 p-4 text-pokemon-dark-blue shadow-[6px_6px_0_#003a70] sm:p-6">
          <div className="mb-4 flex flex-col gap-3 uppercase sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black tracking-widest text-pokemon-blue">
                Battle ready roster
              </p>
              <h2 className="font-pokemon-solid text-3xl tracking-wide text-pokemon-yellow pokemon-title-shadow">
                My Team
              </h2>
            </div>
            <p className="w-fit rounded-full border-2 border-pokemon-dark-blue bg-white px-4 py-2 text-sm font-black shadow-[2px_2px_0_#003a70]">
              {squadPokemon.length}/6 selected
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {squadPokemon.map((pokemon, index) => (
              <PokemonSquadCard
                key={pokemon.id}
                pokemon={pokemon}
                slotNumber={index + 1}
                onRemove={() => removeFromSquad(pokemon.id)}
              />
            ))}

            {emptySquadSlots.map((_, index) => (
              <EmptySquadSlot
                key={`empty-${index}`}
                slotNumber={squadPokemon.length + index + 1}
              />
            ))}
          </div>
        </section>

        <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center">
          {detailsLoading && <PokemonCardSkeleton />}
          {detailsError && <p>Error! {detailsError.message}</p>}

          {selectedPokemon && (
            <PokemonCard
              pokemon={selectedPokemon}
              onClear={() => setSelectedPokemon(null)}
              onAdd={() => addToSquad(selectedPokemon)}
              squadStatus={
                isSelectedPokemonInSquad
                  ? "added"
                  : isSquadFull
                    ? "full"
                    : "available"
              }
            />
          )}

          <PokemonList
            pokemon={filteredPokemon}
            isSearching={isSearching}
            isPokedexLoading={isPokedexLoading}
            pokedexError={pokedexError}
            onSelectPokemon={fetchPokemonDetails}
          />

          {!isSearching && (
            <div className="flex w-full gap-3">
              <button
                disabled={!previousUrl || isListLoading}
                onClick={() => previousUrl && fetchPokemonList(previousUrl)}
                className="w-full cursor-pointer rounded-xl border-4 border-pokemon-dark-blue bg-pokemon-blue px-8 py-4 font-bold uppercase text-white shadow-[4px_4px_0_#003a70] transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#003a70] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_#003a70]"
              >
                Previous
              </button>
              <button
                disabled={!nextUrl || isListLoading}
                onClick={() => nextUrl && fetchPokemonList(nextUrl)}
                className="w-full cursor-pointer rounded-xl border-4 border-pokemon-dark-blue bg-pokemon-red px-8 py-4 font-bold uppercase text-white shadow-[4px_4px_0_#003a70] transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#003a70] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_#003a70]"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
