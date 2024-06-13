import { useQuery } from "@tanstack/react-query";
import { getAllCountries } from "../api";

export function useCountriesQuery() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const { data: countries } = await getAllCountries();

      return countries;
    },
  });
}
