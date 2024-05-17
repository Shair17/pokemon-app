import { Suspense } from "react";
import axios from "axios";
import { PokemonsResponseType } from "@/providers/pokemons/types";
import { PokemonCard } from "@/components/PokemonCard";
import { Search } from "@/components/Search";
import { GridPokemonsSkeleton } from "@/components/GridPokemonsSkeleton";
import { PokemonsPagination } from "@/components/PokemonsPagination";
import { getOffset } from "@/lib/utils";
import { type PokemonsResponseResultType } from "@/providers/pokemons/types";
import { type PokemonResponseType } from "@/providers/pokemon/types";

interface Props {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const limitPerPage = 24;
  const offset = getOffset(currentPage, limitPerPage, 1302);
  const pokemonsResponse = await axios.get<PokemonsResponseType>(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limitPerPage}`
  );
  const hasSearchInput = !!query;

  let queryPokemonsResponseResult: PokemonsResponseResultType | undefined =
    undefined;
  let notFound = false;

  if (hasSearchInput) {
    try {
      const pokemonResponse = await axios.get<PokemonResponseType>(
        `https://pokeapi.co/api/v2/pokemon/${query}`
      );
      queryPokemonsResponseResult = {
        name: pokemonResponse.data.name,
        url: `https://pokeapi.co/api/v2/pokemon/${pokemonResponse.data.id}`,
      };
      notFound = false;
    } catch (error) {
      queryPokemonsResponseResult = undefined;
      notFound = true;
    }
  }

  const pokemons: PokemonsResponseType = {
    count: pokemonsResponse.data.count,
    previous: pokemonsResponse.data.previous,
    next: pokemonsResponse.data.next,
    results:
      hasSearchInput && !!queryPokemonsResponseResult
        ? [queryPokemonsResponseResult]
        : notFound
        ? []
        : pokemonsResponse.data.results,
  };

  return (
    <div className="container max-w-screen-2xl py-8">
      <div className="mx-auto max-w-2xl">
        <Search />
      </div>

      <Suspense key={query + currentPage} fallback={<GridPokemonsSkeleton />}>
        {pokemons.results.length ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
            {pokemons.results.map(({ name, url }) => (
              <PokemonCard key={`${name}-${url}`} name={name} url={url} />
            ))}
          </div>
        ) : (
          <p className="text-center mt-8">No se encontraron resultados.</p>
        )}
      </Suspense>

      <div className="mt-8 flex w-full justify-center">
        <PokemonsPagination previous={pokemons.previous} next={pokemons.next} />
      </div>
    </div>
  );
}
