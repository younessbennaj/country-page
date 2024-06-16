import axios from "axios";

export function getAllCountries() {
  return axios.get(
    "https://restcountries.com/v3.1/all?fields=area,flags,population,region,name,independent,unMember,subregion,ccn3"
  );
}

export function getCountryByCcn3(ccn3: string) {
  return axios.get(`https://restcountries.com/v3.1/alpha/${ccn3}`);
}
