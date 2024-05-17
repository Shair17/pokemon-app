import { PokemonResponseType, PokemonType } from "./types";
import { convertCurrency, pickRandomCurrency } from "@/lib/currencies";
import { calcPokemonPrice } from "./utils";

export const pokemonMapper = async (
  pokemon: PokemonResponseType
): Promise<PokemonType> => {
  const currency = pickRandomCurrency();
  const estimatedPriceInUSD = calcPokemonPrice(
    pokemon.base_experience,
    pokemon.height,
    pokemon.weight
  );
  const price = await convertCurrency("USD", currency, estimatedPriceInUSD);

  return {
    ...pokemon,
    currency,
    price,
  };
};
