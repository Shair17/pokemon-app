"use client";

import { PokemonCartItem } from "./PokemonCartItem";
import { useCartStore } from "@/stores/cart.store";
import { useStore } from "@/hooks/useStore";

export const PokemonsCartGrid: React.FC = () => {
  const cartStore = useStore(useCartStore, (s) => s);

  if (!cartStore) {
    return null;
  }

  const { cart } = cartStore;

  if (!Array.isArray(cart)) {
    return null;
  }

  return (
    <div className="grid gap-4">
      {cart.map(({ id, item, ts }) => (
        <PokemonCartItem key={id} pokemon={item} ts={ts} />
      ))}
    </div>
  );
};
