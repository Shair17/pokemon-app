import { create } from "zustand";
import { combine } from "zustand/middleware";
import { CURRENCIES_API_URL } from "@/constants/currencies";
import axios from "axios";

type CurrenciesResponseType = {
  ts: number;
  base: string;
  quotes: { [key: string]: number };
};

export const getDefaultValues = async (): Promise<CurrenciesResponseType> => {
  const currenciesResponse = await axios.get<CurrenciesResponseType>(
    CURRENCIES_API_URL
  );

  return currenciesResponse.data;
};

export const useCurrenciesStore = create(
  combine(getDefaultValues(), (set, get) => ({
    convert: async (from: string, to: string, amount: number) => {
      const { base, quotes } = await getDefaultValues();

      if (!quotes[from] || !quotes[to]) {
        throw new Error("Divisa no soportada");
      }

      const amountInUSD = amount / quotes[base];

      return parseFloat((amountInUSD * quotes[to]).toFixed(2));
    },
  }))
);
