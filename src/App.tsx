import { useEffect, useRef, useState } from "react";

import PokemonCard, { PokemonCardSkeleton } from "./components/PokemonCard";
import PokemonSearchBar from "./components/PokemonSearchBar";
import PokemonSquadCard, {
  EmptySquadSlot,
} from "./components/PokemonSquadCard";

import { getPokemonDetails } from "./api/pokemon";

import PokemonList from "./components/PokemonList";
import { useSquad } from "./hooks/useSquad";
import { usePokemonList } from "./hooks/usePokemonList";
import { usePokemonDetails } from "./hooks/usePokemonDetails";
import type { PokemonDetails, PokemonListItem } from "./types/pokemon";
import { usePokedex } from "./hooks/usePokedex";
import TeamSummary from "./components/TeamSummary";
import PokemonComparison from "./components/PokemonComparison";
import { useFavouritePokemon } from "./hooks/useFavouritePokemon";

const MAX_SQUAD_SIZE = 6;

const RECOMMENDED_COVERAGE_TYPES = [
  "fire",
  "water",
  "grass",
  "electric",
  "ground",
  "flying",
  "psychic",
  "ice",
  "dragon",
  "fairy",
];

function isPokemonInSquad(pokemonId: number, squadPokemon: PokemonDetails[]) {
  return squadPokemon.some((pokemon) => pokemon.id === pokemonId);
}

function isSquadFull(squadPokemon: PokemonDetails[]) {
  return squadPokemon.length >= MAX_SQUAD_SIZE;
}

function filterPokemonByName(pokemon: PokemonListItem[], searchTerm: string) {
  return pokemon.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
}

function filterSquadPokemonByType(
  squadPokemon: PokemonDetails[],
  selectedType: string,
) {
  if (selectedType === "all") {
    return squadPokemon;
  }

  return squadPokemon.filter((pokemon) =>
    pokemon.types.some((pokemonType) => pokemonType.type.name === selectedType),
  );
}

function getPokemonIdFromUrl(url: string): number {
  const urlParts = url.split("/").filter(Boolean);
  const id = urlParts[urlParts.length - 1];

  return Number(id);
}

function getAveragePokemonWeight(squadPokemon: PokemonDetails[]) {
  if (squadPokemon.length === 0) {
    return 0;
  }

  const totalWeight = squadPokemon.reduce(
    (total, pokemon) => total + pokemon.weight,
    0,
  );

  return totalWeight / squadPokemon.length;
}

function getUniquePokemonTypes(squadPokemon: PokemonDetails[]) {
  const types = new Set<string>();

  for (const pokemon of squadPokemon) {
    for (const pokemonType of pokemon.types) {
      types.add(pokemonType.type.name);
    }
  }

  return Array.from(types);
}

function getMissingCoverageTypes(uniquePokemonTypes: string[]) {
  const teamTypeSet = new Set(uniquePokemonTypes);

  return RECOMMENDED_COVERAGE_TYPES.filter(
    (typeName) => !teamTypeSet.has(typeName),
  );
}

type SquadSortMode = "added" | "name" | "weight";

function sortSquadPokemon(
  squadPokemon: PokemonDetails[],
  sortMode: SquadSortMode,
) {
  const sortedPokemon = [...squadPokemon];

  if (sortMode === "name") {
    sortedPokemon.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortMode === "weight") {
    sortedPokemon.sort((a, b) => a.weight - b.weight);
  }

  return sortedPokemon;
}

function getHeaviestPokemon(
  squadPokemon: PokemonDetails[],
): PokemonDetails | null {
  if (squadPokemon.length === 0) {
    return null;
  }

  return squadPokemon.reduce((heaviest, pokemon) =>
    pokemon.weight > heaviest.weight ? pokemon : heaviest,
  );
}

function getHeavierPokemon(
  pokemonA: PokemonDetails,
  pokemonB: PokemonDetails,
): PokemonDetails | null {
  if (pokemonA.weight === pokemonB.weight) {
    return null;
  }

  return pokemonA.weight > pokemonB.weight ? pokemonA : pokemonB;
}

function getSharedPokemonTypes(
  pokemonA: PokemonDetails,
  pokemonB: PokemonDetails,
) {
  const pokemonBTypes = new Set(
    pokemonB.types.map((pokemonType) => pokemonType.type.name),
  );

  return pokemonA.types
    .map((pokemonType) => pokemonType.type.name)
    .filter((typeName) => pokemonBTypes.has(typeName));
}

function getTotalBaseStats(pokemon: PokemonDetails) {
  return pokemon.stats.reduce(
    (total, pokemonStat) => total + pokemonStat.base_stat,
    0,
  );
}

function getHigherBaseStatsPokemon(
  pokemonA: PokemonDetails,
  pokemonB: PokemonDetails,
): PokemonDetails | null {
  const pokemonATotalStats = getTotalBaseStats(pokemonA);
  const pokemonBTotalStats = getTotalBaseStats(pokemonB);

  if (pokemonATotalStats === pokemonBTotalStats) {
    return null;
  }

  return pokemonATotalStats > pokemonBTotalStats ? pokemonA : pokemonB;
}

function getStatValue(pokemon: PokemonDetails, statName: string) {
  const matchingStat = pokemon.stats.find(
    (pokemonStat) => pokemonStat.stat.name === statName,
  );

  return matchingStat?.base_stat ?? 0;
}

function getBestPokemonByStat(
  squadPokemon: PokemonDetails[],
  statName: string,
): PokemonDetails | null {
  if (squadPokemon.length === 0) {
    return null;
  }

  return squadPokemon.reduce((bestPokemon, pokemon) =>
    getStatValue(pokemon, statName) > getStatValue(bestPokemon, statName)
      ? pokemon
      : bestPokemon,
  );
}

function getRandomPokemonItems(pokedex: PokemonListItem[], count: number) {
  return [...pokedex].sort(() => Math.random() - 0.5).slice(0, count);
}

// APP STARTS HERE

function App() {
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

  const { squadPokemon, addToSquad, removeFromSquad, clearSquad, setSquad } =
    useSquad();

  const {
    pokedex,
    isPokedexLoading,
    pokedexError,
    fetchPokedex,
    INITIAL_POKEDEX_URL,
  } = usePokedex();

  const {
    selectedPokemon,
    detailsLoading,
    detailsError,
    fetchPokemonDetails,
    setSelectedPokemon,
  } = usePokemonDetails();

  const { toggleFavouritePokemon, isFavouritePokemon } = useFavouritePokemon();

  const isSelectedPokemonFavourite = selectedPokemon
    ? isFavouritePokemon(selectedPokemon.id)
    : false;

  const isSelectedPokemonInSquad = selectedPokemon
    ? isPokemonInSquad(selectedPokemon.id, squadPokemon)
    : false;

  const squadIsFull = isSquadFull(squadPokemon);

  function isPokemonUrlInSquad(url: string) {
    const pokemonId = getPokemonIdFromUrl(url);

    return isPokemonInSquad(pokemonId, squadPokemon);
  }

  const [searchPokemon, setSearchPokemon] = useState<string>("");

  const [squadSortMode, setSquadSortMode] = useState<SquadSortMode>("added");

  const [selectedSquadType, setSelectedSquadType] = useState("all");

  const [comparisonPokemonA, setComparisonPokemonA] =
    useState<PokemonDetails | null>(null);
  const [comparisonPokemonB, setComparisonPokemonB] =
    useState<PokemonDetails | null>(null);

  const [isRandomSquadLoading, setIsRandomSquadLoading] = useState(false);
  const [randomSquadError, setRandomSquadError] = useState<Error | null>(null);
  const randomSquadAbortController = useRef<AbortController | null>(null);

  async function handleGenerateRandomSquad() {
    randomSquadAbortController.current?.abort();
    const controller = new AbortController();
    randomSquadAbortController.current = controller;

    setIsRandomSquadLoading(true);
    setRandomSquadError(null);

    try {
      const randomPokemonItems = getRandomPokemonItems(pokedex, MAX_SQUAD_SIZE);

      const randomPokemonDetails = await Promise.all(
        randomPokemonItems.map((pokemonItem) =>
          getPokemonDetails(pokemonItem.url, controller.signal),
        ),
      );
      if (randomSquadAbortController.current === controller) {
        setSquad(randomPokemonDetails);
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }
      if (randomSquadAbortController.current === controller) {
        const e = err instanceof Error ? err : new Error(String(err));
        setRandomSquadError(e);
      }
    } finally {
      if (randomSquadAbortController.current === controller) {
        setIsRandomSquadLoading(false);
      }
    }
  }

  useEffect(() => {
    fetchPokemonList(INITIAL_POKEMON_LIST_URL);
    fetchPokedex(INITIAL_POKEDEX_URL);
  }, [
    fetchPokemonList,
    fetchPokedex,
    INITIAL_POKEDEX_URL,
    INITIAL_POKEMON_LIST_URL,
  ]);

  useEffect(() => {
    return () => {
      randomSquadAbortController.current?.abort();
    };
  }, []);

  if (isInitialListLoading) {
    return <p>Loading...</p>;
  }

  if (listError) {
    return <p>Error! {listError.message}</p>;
  }

  const isSearching = searchPokemon.trim() !== "";

  const filteredPokemon = isSearching
    ? filterPokemonByName(pokedex, searchPokemon)
    : pokemon;
  const emptySquadSlots = Array.from({
    length: MAX_SQUAD_SIZE - squadPokemon.length,
  });

  const averagePokemonWeightKg = getAveragePokemonWeight(squadPokemon) / 10;

  const uniquePokemonTypes = getUniquePokemonTypes(squadPokemon);

  const sortedSquadPokemon = sortSquadPokemon(squadPokemon, squadSortMode);

  const filteredSquadPokemon = filterSquadPokemonByType(
    sortedSquadPokemon,
    selectedSquadType,
  );

  const heaviestPokemon = getHeaviestPokemon(squadPokemon);

  const heavierComparisonPokemon =
    comparisonPokemonA && comparisonPokemonB
      ? getHeavierPokemon(comparisonPokemonA, comparisonPokemonB)
      : null;

  const sharedComparisonTypes =
    comparisonPokemonA && comparisonPokemonB
      ? getSharedPokemonTypes(comparisonPokemonA, comparisonPokemonB)
      : [];

  const higherBaseStatPokemon =
    comparisonPokemonA && comparisonPokemonB
      ? getHigherBaseStatsPokemon(comparisonPokemonA, comparisonPokemonB)
      : null;

  const fastestPokemon = getBestPokemonByStat(squadPokemon, "speed");
  const strongestAttackPokemon = getBestPokemonByStat(squadPokemon, "attack");
  const strongestDefensePokemon = getBestPokemonByStat(squadPokemon, "defense");

  const comparisonPokemonATotalBaseStats = comparisonPokemonA
    ? getTotalBaseStats(comparisonPokemonA)
    : 0;

  const comparisonPokemonBTotalBaseStats = comparisonPokemonB
    ? getTotalBaseStats(comparisonPokemonB)
    : 0;

  const missingCoverageTypes = getMissingCoverageTypes(uniquePokemonTypes);

  return (
    <main className="min-h-screen bg-pokemon-bg text-pokemon-black ">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-12 px-6 py-12 ">
        <div className="max-w-2xl text-center md:text-left">
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-pokemon-blue">
            Gotta catch 'em all!
          </p>

          <h1 className="mb-6 font-pokemon-solid text-5xl leading-tight tracking-widest text-pokemon-yellow md:text-7xl pokemon-title-shadow drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
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
          <div className="mb-5 flex flex-col gap-4 uppercase">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-black tracking-widest text-pokemon-blue">
                  Battle ready roster
                </p>
                <h2 className="font-pokemon-solid text-3xl tracking-wide text-pokemon-yellow pokemon-title-shadow">
                  My Team
                </h2>
              </div>

              <p className="w-fit rounded-full border-2 border-pokemon-dark-blue bg-white px-4 py-2 text-sm font-black shadow-[2px_2px_0_#003a70]">
                {squadPokemon.length}/{MAX_SQUAD_SIZE} selected
              </p>
            </div>

            <TeamSummary
              squadSize={squadPokemon.length}
              uniquePokemonTypes={uniquePokemonTypes}
              averagePokemonWeightKg={averagePokemonWeightKg}
              heaviestPokemon={heaviestPokemon}
              fastestPokemon={fastestPokemon}
              strongestAttackPokemon={strongestAttackPokemon}
              strongestDefensePokemon={strongestDefensePokemon}
              missingCoverageTypes={missingCoverageTypes}
              getStatValue={getStatValue}
            />

            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-sm font-black">
                Sort By:
                <select
                  value={squadSortMode}
                  onChange={(event) =>
                    setSquadSortMode(event.target.value as SquadSortMode)
                  }
                  className="rounded-full border-2 border-pokemon-dark-blue bg-white px-3 py-2 font-black shadow-[2px_2px_0_#003a70]"
                >
                  <option value="added">Added</option>
                  <option value="name">Name</option>
                  <option value="weight">Weight</option>
                </select>
              </label>
              <label className="flex items-center gap-2 text-sm font-black">
                Filter Type:
                <select
                  value={selectedSquadType}
                  onChange={(event) => setSelectedSquadType(event.target.value)}
                  className="rounded-full border-2 border-pokemon-dark-blue bg-white px-3 py-2 font-black shadow-[2px_2px_0_#003a70]"
                >
                  <option value="all">All</option>
                  {uniquePokemonTypes.map((typeName) => (
                    <option key={typeName} value={typeName}>
                      {typeName}
                    </option>
                  ))}
                </select>
              </label>
              <button
                className="w-fit cursor-pointer rounded-full border-2 border-pokemon-dark-blue bg-pokemon-red px-4 py-2 font-black text-white shadow-[2px_2px_0_#003a70] transition disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
                type="button"
                onClick={clearSquad}
                disabled={squadPokemon.length === 0}
              >
                Clear team
              </button>
              <button
                className="w-fit cursor-pointer rounded-full border-2 border-pokemon-dark-blue bg-pokemon-yellow px-4 py-2 font-black text-pokemon-dark-blue shadow-[2px_2px_0_#003a70] transition disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
                type="button"
                onClick={handleGenerateRandomSquad}
                disabled={
                  isPokedexLoading ||
                  pokedex.length === 0 ||
                  isRandomSquadLoading
                }
              >
                {isRandomSquadLoading ? "Generating..." : "Random Team"}
              </button>
              {randomSquadError && <p>Error! {randomSquadError.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {filteredSquadPokemon.map((pokemon, index) => (
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
                  : squadIsFull
                    ? "full"
                    : "available"
              }
              onCompareA={() => setComparisonPokemonA(selectedPokemon)}
              onCompareB={() => setComparisonPokemonB(selectedPokemon)}
              isFavourite={isSelectedPokemonFavourite}
              onFavourite={() => toggleFavouritePokemon(selectedPokemon.id)}
            />
          )}

          {comparisonPokemonA && comparisonPokemonB && (
            <PokemonComparison
              pokemonA={comparisonPokemonA}
              pokemonB={comparisonPokemonB}
              pokemonATotalBaseStats={comparisonPokemonATotalBaseStats}
              pokemonBTotalBaseStats={comparisonPokemonBTotalBaseStats}
              heavierPokemon={heavierComparisonPokemon}
              higherBaseStatPokemon={higherBaseStatPokemon}
              sharedComparisonTypes={sharedComparisonTypes}
            />
          )}

          <PokemonList
            pokemon={filteredPokemon}
            isSearching={isSearching}
            isPokedexLoading={isPokedexLoading}
            pokedexError={pokedexError}
            onSelectPokemon={fetchPokemonDetails}
            isPokemonInSquad={isPokemonUrlInSquad}
            isPokemonFavourite={isFavouritePokemon}
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
