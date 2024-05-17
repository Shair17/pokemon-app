import { create } from "zustand";
import { persist, combine, createJSONStorage } from "zustand/middleware";
import { type PokemonType } from "../providers/pokemon/types";
import { getDefaultValues as getCurrencies } from "./currencies.store";
import { parseAmount } from "@/lib/currencies";

const CART_STORAGE_KEY = "cart-storage";

export type PriceWithCurrency = {
  price: number;
  currency: string;
};

type CartItem = {
  id: number;
  item: PokemonType;
  ts: number;
};

type Cart = {
  cart: CartItem[];
};

const getDefaultValues = (): Cart => {
  if (typeof window === "undefined") {
    return {
      cart: [],
    };
  }

  const cartFromStorage = window.localStorage.getItem(CART_STORAGE_KEY);

  if (!cartFromStorage) {
    return {
      cart: [],
    };
  }

  const cart = JSON.parse(cartFromStorage) as CartItem[];

  return {
    cart: cart,
  };
};

export const useCartStore = create(
  persist(
    combine(getDefaultValues(), (set, get) => ({
      isInCart: (id: number) => {
        const { cart } = get();

        return !!cart.find((pokemon) => pokemon.id === id);
      },
      add: (item: PokemonType) => {
        const { cart } = get();
        const updatedCart = addToCart(cart, item);

        set({ cart: updatedCart });
      },
      remove: (id: number) => {
        const { cart } = get();
        const updatedCart = removeFromCart(cart, id);

        set({ cart: updatedCart });
      },
      removeAll: () => {
        set({ cart: [] });
      },
      count: () => {
        const { cart } = get();

        return cart.length;
      },
      // return all prices in USD
      getTotalPrice: async () => {
        const { cart } = get();

        const total = await getTotalInUSD(cart);

        return total;
      },
    })),
    {
      name: CART_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

const addToCart = (cart: CartItem[], pokemon: PokemonType): CartItem[] => {
  const newItem: CartItem = {
    id: pokemon.id,
    item: pokemon,
    ts: Date.now(),
  };

  return [...cart, newItem];
};

const removeFromCart = (cart: CartItem[], id: number): CartItem[] => {
  const item = cart.find((item) => item.id === id);

  if (item) {
    return cart.filter((item) => item.id !== id);
  }

  return cart;
};

const getTotalInUSD = async (cart: CartItem[]): Promise<number> => {
  const pricesWithCurrency: PriceWithCurrency[] = cart.map(
    ({ item: { price, currency } }) => ({
      price,
      currency,
    })
  );

  let pricesWithCurrencyUSD: PriceWithCurrency[] = [];

  const { base, quotes } = await getCurrencies();

  for (const { currency, price } of pricesWithCurrency) {
    if (!quotes[currency]) {
      throw new Error("Divisa no soportada");
    }

    const priceInUSD = price * quotes[base];

    pricesWithCurrencyUSD.push({ currency: base, price: priceInUSD });
  }

  const totalAmount = pricesWithCurrencyUSD.length
    ? pricesWithCurrencyUSD
        .map(({ price }) => price)
        .reduce((prev, next) => prev + next)
    : 0;

  return parseAmount(totalAmount);
};
