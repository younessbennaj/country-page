import { useQuery } from "@tanstack/react-query";
import { getAllCountries } from "../api";
import { RestCountry } from "../types";

export function useCountriesQuery() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const { data } = await getAllCountries();
      const countries = data.map((item: RestCountry) => {
        return {
          area: item.area,
          flag: item.flags.png,
          independent: item.independent,
          name: item.name.common,
          population: item.population,
          region: item.region,
          unMember: item.unMember,
        };
      });
      return countries;
    },
  });
}
