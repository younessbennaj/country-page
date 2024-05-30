import axios from "axios";

export function getAllCountries() {
  return axios.get("https://restcountries.com/v3.1/all");
}

export function getCountriesByName(name: string) {
  return axios.get(`https://restcountries.com/v3.1/name/${name}`);
}

export function getCountriesByRegion(region: string) {
  return axios.get(`https://restcountries.com/v3.1/region/${region}`);
}
