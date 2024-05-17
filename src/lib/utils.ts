import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import "dayjs/locale/es";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale("es");
dayjs.extend(relativeTime);

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomArray = (n: number = 20) => {
  const arregloAleatorio = [];

  for (let i = 0; i < n; i++) {
    arregloAleatorio.push(Math.random());
  }

  return arregloAleatorio;
};

export const timeStampToFromNow = (ts: number): string => {
  const date = new Date(ts);
  return dayjs(date).fromNow();
};

export const getOffset = (
  pageNumber: number,
  limitPerPage: number,
  totalElements: number
) => {
  const offset = (pageNumber - 1) * limitPerPage;

  if (offset >= totalElements) {
    throw new Error(
      "El número de página excede la cantidad total de elementos disponibles."
    );
  }

  return offset;
};
