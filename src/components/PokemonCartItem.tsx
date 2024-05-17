"use client";

import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import { CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { PokemonType } from "@/providers/pokemon/types";
import { timeStampToFromNow } from "@/lib/utils";
import { useStore } from "@/hooks/useStore";
import { useCartStore } from "@/stores/cart.store";

interface Props {
  pokemon: PokemonType;
  ts: number;
}

export const PokemonCartItem: React.FC<Props> = ({ pokemon, ts }) => {
  const cartStore = useStore(useCartStore, (s) => s);

  if (!cartStore) {
    return null;
  }

  const { remove } = cartStore;

  const timeAgo = timeStampToFromNow(ts);

  const handleRemove = () => remove(pokemon.id);

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex items-center">
      <div className="w-[100px] h-[100px]">
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
      </div>

      <CardHeader>
        <CardTitle>{pokemon.name}</CardTitle>
        <CardDescription className="text-green-500">
          {pokemon.price} {pokemon.currency}
        </CardDescription>
        <p>{timeAgo}</p>
      </CardHeader>

      <div className="flex ml-auto items-center flex-col space-y-1.5 p-6 justify-center">
        <Button size="icon" variant="destructive" onClick={handleRemove}>
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
