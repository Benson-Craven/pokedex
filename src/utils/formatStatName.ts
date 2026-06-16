export function formatStatName(statName: string) {
  return statName
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
