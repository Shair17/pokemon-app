"use client";

import { PokemonType } from "@/providers/pokemon/types";
import { Button } from "./ui/button";
import { useCartStore } from "@/stores/cart.store";
import { useStore } from "@/hooks/useStore";
import { Skeleton } from "./ui/skeleton";

interface Props {
  pokemon: PokemonType;
}

export const AddPokemonToCart: React.FC<Props> = ({ pokemon }) => {
  const cartStore = useStore(useCartStore, (state) => state);

  if (!cartStore) return <Skeleton className="w-full h-10 rounded-md" />;

  const { add, remove, isInCart } = cartStore;

  const hasAddedToCart = isInCart(pokemon.id);

  return (
    <Button
      className="w-full"
      variant={hasAddedToCart ? "destructive" : "default"}
      onClick={() => {
        if (hasAddedToCart) {
          remove(pokemon.id);
        } else {
          add(pokemon);
        }
      }}
    >
      {hasAddedToCart ? "Remover del carrito" : "Agregar al carrito"}
    </Button>
  );
};
