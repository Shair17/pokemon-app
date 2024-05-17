import {
  getDefaultValues as getCurrencies,
  getDefaultValues,
} from "@/stores/currencies.store";
import { getRandomNumber } from "./utils";
import { DEFAULT_CURRENCIES } from "@/constants/currencies";

export const getRandomBalance = async (currency: string) => {
  const currencies = await getCurrencies();

  const newBalanceUSD = getRandomNumber(50000, 200000);
  const USD_TO_MXN = currencies.quotes[currency];

  return parseFloat((newBalanceUSD * USD_TO_MXN).toFixed(2));
};

export const pickRandomCurrency = () =>
  DEFAULT_CURRENCIES[Math.floor(Math.random() * DEFAULT_CURRENCIES.length)];

export const convertCurrency = async (
  from: string,
  to: string,
  amount: number
) => {
  const { base, quotes } = await getDefaultValues();

  if (!quotes[from] || !quotes[to]) {
    throw new Error("Divisa no soportada");
  }

  const amountInUSD = amount / quotes[base];

  return parseAmount(amountInUSD * quotes[to]);
};

export const parseAmount = (amount: number) => {
  return parseFloat(amount.toFixed(2));
};
