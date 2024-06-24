import { useQuery } from "@tanstack/react-query";
import { getAllCountries, getBorderCountriesByCca2 } from "../api";

export function useCountriesQuery() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const { data: countries } = await getAllCountries();

      return countries;
    },
  });
}

export function useBorderCountriesByCode(borders: string[], countryId: string) {
  return useQuery({
    enabled: !!borders.length && !!countryId,
    queryKey: ["bordersCountry", countryId],
    queryFn: async () => {
      const { data: countries } = await getBorderCountriesByCca2(borders);
      return countries;
    },
  });
}
