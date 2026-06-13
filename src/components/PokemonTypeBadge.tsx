import {
  getPokemonTypeClassName,
  type TypeBadgeVariant,
} from "../utils/pokemonTypeStyles";

type PokemonTypeBadgeProps = {
  typeName: string;
  variant?: TypeBadgeVariant;
};

const PokemonTypeBadge = ({
  typeName,
  variant = "default",
}: PokemonTypeBadgeProps) => {
  return (
    <span className={getPokemonTypeClassName(typeName, variant)}>
      {typeName}
    </span>
  );
};

export default PokemonTypeBadge;
