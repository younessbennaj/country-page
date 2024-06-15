export type Country = {
  flags: { png: string };
  name: { common: string };
  population: number;
  area: number;
  region: string;
  independent: boolean;
  unMember: boolean;
  subregion: string;
};

export type SortBy = "population" | "name" | "area";

export type Region =
  | "americas"
  | "antartics"
  | "africa"
  | "asia"
  | "europe"
  | "oceania";
