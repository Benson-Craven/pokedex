type PokemonSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
};

const PokemonSearchBar = ({
  value,
  onChange,
  onClear,
}: PokemonSearchBarProps) => {
  return (
    <div className="flex">
      <input
        placeholder="Search Pokémon..."
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="border-4 border-pokemon-dark-blue rounded-2xl px-8 py-4 font-bold "
      />{" "}
      {value && (
        <button
          className="uppercase rounded-2xl border-4 bg-pokemon-yellow border-pokemon-dark-blue  px-8 py-4 font-bold text-pokemon-dark-blue shadow-[4px_4px_0_#003a70] transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#003a70] cursor-pointer mx-2 my-2"
          onClick={onClear}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default PokemonSearchBar;
