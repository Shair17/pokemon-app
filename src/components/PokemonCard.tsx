import { type PokemonsResponseResultType } from "@/providers/pokemons/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import { getPokemon } from "@/providers/pokemon/query";
import { AddPokemonToCart } from "./AddPokemonToCart";

interface Props extends PokemonsResponseResultType {}

export async function PokemonCard({ name, url }: Props) {
  const pokemon = await getPokemon(url);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{pokemon.name ?? name}</CardTitle>
        <CardDescription className="text-green-500">
          {pokemon.price} {pokemon.currency}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AspectRatio ratio={1 / 1}>
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name ?? name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </CardContent>
      <CardFooter>
        <AddPokemonToCart pokemon={pokemon} />
      </CardFooter>
    </Card>
  );
}
