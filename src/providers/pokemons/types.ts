export type PokemonsResponseType = {
  count: number;
  next: null | string;
  previous: null | string;
  results: PokemonsResponseResultType[];
};

export type PokemonsResponseResultType = {
  name: string;
  url: string;
};
