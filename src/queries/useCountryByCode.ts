import { useQuery } from "@tanstack/react-query";
import { getCountryByCcn3 } from "../api";

export function useCountriesByCode(code: string) {
  return useQuery({
    queryKey: ["country", code],
    queryFn: async () => {
      const { data: countries } = await getCountryByCcn3(code);

      return countries;
    },
  });
}
