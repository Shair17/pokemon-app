export const calcPokemonPrice = (
  baseExperience: number,
  height: number,
  weight: number
) => {
  const factorExperience = 10;
  const factorHeight = 5;
  const factorWeight = 2;

  const price =
    baseExperience * factorExperience +
    height * factorHeight +
    weight * factorWeight;

  return parseFloat(price.toFixed(2));
};
