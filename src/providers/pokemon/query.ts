import axios from "axios";
import { PokemonResponseType, PokemonType } from "./types";
import { pokemonMapper } from "./mapper";

export const getPokemonByUrl = async (
  url: string
): Promise<PokemonResponseType> => {
  const pokemonResponse = await axios.get<PokemonResponseType>(url);

  return pokemonResponse.data;
};

export const getPokemon = async (url: string): Promise<PokemonType> => {
  const pokemon = await getPokemonByUrl(url);

  return pokemonMapper(pokemon);
};
