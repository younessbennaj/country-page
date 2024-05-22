export type Country = {
  flag: string;
  name: string;
  population: number;
  area: number;
  region: string;
};

export type RestCountry = {
  area: number;
  flags: { png: string };
  name: { common: string };
  population: number;
  region: string;
};

export type SortBy = "population" | "name" | "area";

export type Region =
  | "americas"
  | "antartics"
  | "africa"
  | "asia"
  | "europe"
  | "oceania";
